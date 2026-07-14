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
    return this
