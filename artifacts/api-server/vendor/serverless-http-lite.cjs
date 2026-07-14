'use strict';

// Consolidated, AWS-Lambda-only build of the 'serverless-http' npm package
// (https://github.com/dougmoscrop/serverless-http, MIT licensed), merged
// into a single file so it's easy to add to the repo by hand. Only the
// pieces needed to wrap an Express app for a classic Netlify Function are
// included; the Azure provider and other framework adapters were dropped.

const http = require("http");
const { PassThrough } = require("stream");
const URL = require("url");

// ---------------------------------------------------------------------
// Request / Response shims
// ---------------------------------------------------------------------

class ServerlessRequest extends http.IncomingMessage {
  constructor({ method, url, headers, body, remoteAddress }) {
    const socket = new PassThrough();
    socket.encrypted = true;
    socket.remoteAddress = remoteAddress;
    socket.address = () => ({ port: 443 });

    super(socket);

    if (typeof headers["content-length"] === "undefined") {
      headers["content-length"] = Buffer.byteLength(body);
    }

    Object.assign(this, {
      ip: remoteAddress,
      complete: true,
      httpVersion: "1.1",
      httpVersionMajor: "1",
      httpVersionMinor: "1",
      method,
      headers,
      body,
      url,
    });

    this._read = () => {
      if (typeof body !== "undefined" && body !== null) {
        this.push(body);
      }
      this.push(null);
    };

    if (!body || Buffer.byteLength(body) === 0) {
      setImmediate(() => this.emit("end"));
    }
  }
}

const headerEnd = "\r\n\r\n";
const BODY = Symbol();
const HEADERS = Symbol();

function getString(data) {
  if (Buffer.isBuffer(data)) return data.toString("utf8");
  if (typeof data === "string") return data;
  throw new Error(`response.write() of unexpected type: ${typeof data}`);
}

function addData(stream, data) {
  if (
    Buffer.isBuffer(data) ||
    typeof data === "string" ||
    data instanceof Uint8Array
  ) {
    stream[BODY].push(Buffer.from(data));
  } else {
    throw new Error(`response.write() of unexpected type: ${typeof data}`);
  }
}

class ServerlessResponse extends http.ServerResponse {
  static from(res) {
    const response = new ServerlessResponse(res);
    response.statusCode = res.statusCode;
    response[HEADERS] = res.headers;
    response[BODY] = [Buffer.from(res.body)];
    response.end();
    return response;
  }

  static body(res) {
    return Buffer.concat(res[BODY]);
  }

  static headers(res) {
    const headers =
      typeof res.getHeaders === "function" ? res.getHeaders() : res._headers;
    return Object.assign(headers, res[HEADERS]);
  }

  get headers() {
    return this[HEADERS];
  }

  setHeader(key, value) {
    if (this._wroteHeader) {
      this[HEADERS][key] = value;
    } else {
      super.setHeader(key, value);
    }
  }

  writeHead(statusCode, reason, obj) {
    const headers = typeof reason === "string" ? obj : reason;

    for (const name in headers) {
      this.setHeader(name, headers[name]);
      if (!this._wroteHeader) break;
    }

    super.writeHead(statusCode, reason, obj);
  }

  constructor({ method }) {
    super({ method });

    this[BODY] = [];
    this[HEADERS] = {};

    this.useChunkedEncodingByDefault = false;
    this.chunkedEncoding = false;
    this._header = "";

    this.assignSocket({
      _writableState: {},
      writable: true,
      on: Function.prototype,
      removeListener: Function.prototype,
      destroy: Function.prototype,
      cork: Function.prototype,
      uncork: Function.prototype,
      write: (data, encoding, cb) => {
        if (typeof encoding === "function") {
          cb = encoding;
          encoding = null;
        }

        if (this._header === "" || this._wroteHeader) {
          addData(this, data);
        } else {
          const string = getString(data);
          const index = string.indexOf(headerEnd);

          if (index !== -1) {
            const remainder = string.slice(index + headerEnd.length);
            if (remainder) addData(this, remainder);
            this._wroteHeader = true;
          }
        }

        if (typeof cb === "function") cb();
        return true;
      },
    });
  }
}

// ---------------------------------------------------------------------
// finish() - waits for a stream to end/finish/error, then applies an
// optional transform
// ---------------------------------------------------------------------

async function finish(item, transform, ...details) {
  await new Promise((resolve, reject) => {
    if (item.finished || item.complete) {
      resolve();
      return;
    }

    let finished = false;
    function done(err) {
      if (finished) return;
      finished = true;
      item.removeListener("error", done);
      item.removeListener("end", done);
      item.removeListener("finish", done);
      if (err) reject(err);
      else resolve();
    }

    item.once("error", done);
    item.once("end", done);
    item.once("finish", done);
  });

  if (typeof transform === "function") {
    await transform(item, ...details);
  } else if (typeof transform === "object" && transform !== null) {
    Object.assign(item, transform);
  }

  return item;
}

// ---------------------------------------------------------------------
// getFramework() - adapts an Express (or similar) app into a
// request -> response function
// ---------------------------------------------------------------------

function getFramework(app) {
  function common(cb) {
    return (request) => {
      const response = new ServerlessResponse(request);
      cb(request, response);
      return response;
    };
  }

  if (app instanceof http.Server) {
    return (request) => {
      const response = new ServerlessResponse(request);
      app.emit("request", request, response);
      return response;
    };
  }

  if (typeof app.callback === "function") {
    return common(app.callback());
  }

  if (typeof app.handle === "function") {
    return common((request, response) => {
      app.handle(request, response);
    });
  }

  if (typeof app === "function") {
    return common(app);
  }

  throw new Error("Unsupported framework");
}

// ---------------------------------------------------------------------
// AWS Lambda provider (also what Netlify's classic Functions format uses)
// ---------------------------------------------------------------------

const LAMBDA_EVENT_TYPES = {
  HTTP_API_V1: "HTTP_API_V1",
  HTTP_API_V2: "HTTP_API_V2",
  ALB: "ALB",
};

function getEventType(event) {
  if (event.requestContext && event.requestContext.elb) {
    return LAMBDA_EVENT_TYPES.ALB;
  } else if (event.version === "2.0") {
    return LAMBDA_EVENT_TYPES.HTTP_API_V2;
  }
  return LAMBDA_EVENT_TYPES.HTTP_API_V1;
}

const BINARY_ENCODINGS = ["gzip", "deflate", "br"];
const BINARY_CONTENT_TYPES = (process.env.BINARY_CONTENT_TYPES || "").split(
  ",",
);

function isBinaryEncoding(headers) {
  const contentEncoding = headers["content-encoding"];
  if (typeof contentEncoding === "string") {
    return contentEncoding
      .split(",")
      .some((value) =>
        BINARY_ENCODINGS.some((enc) => value.indexOf(enc) !== -1),
      );
  }
}

function isBinaryContent(headers, options) {
  const contentTypes = []
    .concat(options.binary ? options.binary : BINARY_CONTENT_TYPES)
    .map((candidate) => new RegExp(`^${candidate.replace(/\*/g, ".*")}$`));

  const contentType = (headers["content-type"] || "").split(";")[0];
  return (
    !!contentType && contentTypes.some((candidate) => candidate.test(contentType))
  );
}

function isBinary(headers, options) {
  if (options.binary === false) return false;
  if (options.binary === true) return true;
  if (typeof options.binary === "function") return options.binary(headers);
  return isBinaryEncoding(headers) || isBinaryContent(headers, options);
}

function sanitizeHeaders(headers) {
  return Object.keys(headers).reduce(
    (memo, key) => {
      const value = headers[key];
      if (Array.isArray(value)) {
        memo.multiValueHeaders[key] = value;
        if (key.toLowerCase() !== "set-cookie") {
          memo.headers[key] = value.join(", ");
        }
      } else {
        memo.headers[key] = value == null ? "" : value.toString();
      }
      return memo;
    },
    { headers: {}, multiValueHeaders: {} },
  );
}

function isString(value) {
  return typeof value === "string" || value instanceof String;
}

function specialDecodeURIComponent(value) {
  if (!isString(value)) return value;
  try {
    return decodeURIComponent(value.replace(/[+]/g, "%20"));
  } catch (err) {
    return value.replace(/[+]/g, "%20");
  }
}

function recursiveURLDecode(value) {
  if (isString(value)) return specialDecodeURIComponent(value);
  if (Array.isArray(value)) return value.map(recursiveURLDecode);
  if (value instanceof Object) {
    const decoded = {};
    for (const key of Object.keys(value)) {
      decoded[specialDecodeURIComponent(key)] = recursiveURLDecode(value[key]);
    }
    return decoded;
  }
  return value;
}

function removeBasePath(path = "/", basePath) {
  if (basePath) {
    const idx = path.indexOf(basePath);
    if (idx > -1) return path.substr(idx + basePath.length) || "/";
  }
  return path;
}

function cleanupEvent(evt, options) {
  const event = evt || {};
  event.requestContext = event.requestContext || {};
  event.body = event.body || "";
  event.headers = event.headers || {};

  if ("elb" in event.requestContext) {
    if (event.multiValueQueryStringParameters) {
      event.multiValueQueryStringParameters = recursiveURLDecode(
        event.multiValueQueryStringParameters,
      );
    }
    if (event.queryStringParameters) {
      event.queryStringParameters = recursiveURLDecode(
        event.queryStringParameters,
      );
    }
  }

  if (event.version === "2.0") {
    event.requestContext.authorizer = event.requestContext.authorizer || {};
    event.requestContext.http.method = event.requestContext.http.method || "GET";
    event.rawPath = removeBasePath(
      event.requestPath || event.rawPath,
      options.basePath,
    );
  } else {
    event.requestContext.identity = event.requestContext.identity || {};
    event.httpMethod = event.httpMethod || "GET";
    event.path = removeBasePath(event.requestPath || event.path, options.basePath);
  }

  return event;
}

function requestMethod(event) {
  if (event.version === "2.0") return event.requestContext.http.method;
  return event.httpMethod;
}

function requestRemoteAddress(event) {
  if (event.version === "2.0") return event.requestContext.http.sourceIp;
  return event.requestContext.identity.sourceIp;
}

function requestHeaders(event) {
  const initialHeader =
    event.version === "2.0" && Array.isArray(event.cookies)
      ? { cookie: event.cookies.join("; ") }
      : {};

  if (event.multiValueHeaders) {
    Object.keys(event.multiValueHeaders).reduce((headers, key) => {
      headers[key.toLowerCase()] = event.multiValueHeaders[key].join(", ");
      return headers;
    }, initialHeader);
  }

  return Object.keys(event.headers).reduce((headers, key) => {
    headers[key.toLowerCase()] = event.headers[key];
    return headers;
  }, initialHeader);
}

function requestBody(event) {
  const type = typeof event.body;
  if (Buffer.isBuffer(event.body)) return event.body;
  if (type === "string") {
    return Buffer.from(event.body, event.isBase64Encoded ? "base64" : "utf8");
  }
  if (type === "object") return Buffer.from(JSON.stringify(event.body));
  throw new Error(`Unexpected event.body type: ${typeof event.body}`);
}

function requestUrl(event) {
  if (event.version === "2.0") {
    return URL.format({ pathname: event.rawPath, search: event.rawQueryString });
  }
  const query = event.multiValueQueryStringParameters || {};
  if (event.queryStringParameters) {
    Object.keys(event.queryStringParameters).forEach((key) => {
      if (Array.isArray(query[key])) {
        if (!query[key].includes(event.queryStringParameters[key])) {
          query[key].push(event.queryStringParameters[key]);
        }
      } else {
        query[key] = [event.queryStringParameters[key]];
      }
    });
  }
  return URL.format({ pathname: event.path, query });
}

function createRequest(event, context, options) {
  const method = requestMethod(event);
  const remoteAddress = requestRemoteAddress(event);
  const headers = requestHeaders(event);
  const body = requestBody(event);
  const url = requestUrl(event);

  if (typeof options.requestId === "string" && options.requestId.length > 0) {
    const header = options.requestId.toLowerCase();
    const requestId = headers[header] || event.requestContext.requestId;
    if (requestId) headers[header] = requestId;
  }

  const req = new ServerlessRequest({ method, headers, body, remoteAddress, url });
  req.requestContext = event.requestContext;
  req.apiGateway = { event, context };
  return req;
}

function combineHeaders(headers, multiValueHeaders) {
  return Object.entries(headers).reduce((memo, [key, value]) => {
    if (multiValueHeaders[key]) {
      memo[key].push(value);
    } else {
      memo[key] = [value];
    }
    return memo;
  }, multiValueHeaders);
}

function formatResponse(event, response, options) {
  const eventType = getEventType(event);
  const { statusCode } = response;
  const { headers, multiValueHeaders } = sanitizeHeaders(
    ServerlessResponse.headers(response),
  );

  let cookies = [];
  if (multiValueHeaders["set-cookie"]) {
    cookies = multiValueHeaders["set-cookie"];
  }

  const isBase64Encoded = isBinary(headers, options);
  const encoding = isBase64Encoded ? "base64" : "utf8";
  let body = ServerlessResponse.body(response).toString(encoding);

  if (headers["transfer-encoding"] === "chunked" || response.chunkedEncoding) {
    const raw = ServerlessResponse.body(response).toString().split("\r\n");
    const parsed = [];
    for (let i = 0; i < raw.length; i += 2) {
      const size = parseInt(raw[i], 16);
      const value = raw[i + 1];
      if (value) parsed.push(value.substring(0, size));
    }
    body = parsed.join("");
  }

  if (eventType === LAMBDA_EVENT_TYPES.ALB) {
    const albResponse = { statusCode, isBase64Encoded, body };
    if (event.multiValueHeaders) {
      albResponse.multiValueHeaders = combineHeaders(headers, multiValueHeaders);
    } else {
      albResponse.headers = headers;
    }
    return albResponse;
  }

  if (eventType === LAMBDA_EVENT_TYPES.HTTP_API_V2) {
    return { statusCode, isBase64Encoded, body, headers, cookies };
  }

  return { statusCode, isBase64Encoded, body, headers, multiValueHeaders };
}

function awsProvider(options) {
  return (getResponse) => async (event_, context = {}) => {
    const event = cleanupEvent(event_, options);
    const request = createRequest(event, context, options);
    const response = await getResponse(request, event, context);
    return formatResponse(event, response, options);
  };
}

// ---------------------------------------------------------------------
// Public API - matches serverless-http's default export
// ---------------------------------------------------------------------

const defaultOptions = { requestId: "x-request-id" };

module.exports = function serverless(app, opts) {
  const options = Object.assign({}, defaultOptions, opts);
  const framework = getFramework(app);
  const provider = awsProvider(options);

  return provider(async (request, ...context) => {
    await finish(request, options.request, ...context);
    const response = await framework(request);
    await finish(response, options.response, ...context);
    response.emit("close");
    return response;
  });
};
