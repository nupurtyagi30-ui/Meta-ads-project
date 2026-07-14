import path from "node:path";
import { fileURLToPath } from "node:url";
import { build as esbuild } from "esbuild";
import { rm, mkdir, writeFile } from "node:fs/promises";

const artifactDir = path.dirname(fileURLToPath(import.meta.url));

async function buildNetlify() {
  const outDir = path.resolve(artifactDir, "netlify-dist");
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  await esbuild({
    entryPoints: [path.resolve(artifactDir, "src/netlify-handler.ts")],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: path.join(outDir, "api.cjs"),
    logLevel: "info",
    // Hardcode production so pino's dev-only pino-pretty transport (which
    // needs worker-thread files) is dead-code-eliminated at build time.
    // Netlify Functions don't reliably set NODE_ENV at runtime, so we can't
    // rely on the runtime check alone.
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    external: [
      "*.node",
      "sharp",
      "better-sqlite3",
      "sqlite3",
      "canvas",
      "bcrypt",
      "argon2",
      "fsevents",
      "re2",
      "farmhash",
      "xxhash-addon",
      "bufferutil",
      "utf-8-validate",
      "ssh2",
      "cpu-features",
      "dtrace-provider",
      "isolated-vm",
      "lightningcss",
      "pg-native",
      "oracledb",
      "mongodb-client-encryption",
      "nodemailer",
      "handlebars",
      "knex",
      "typeorm",
      "protobufjs",
      "onnxruntime-node",
      "@tensorflow/*",
      "@prisma/client",
      "@mikro-orm/*",
      "@grpc/*",
      "@swc/*",
      "@aws-sdk/*",
      "@azure/*",
      "@opentelemetry/*",
      "@google-cloud/*",
      "@google/*",
      "googleapis",
      "firebase-admin",
      "@parcel/watcher",
      "@sentry/profiling-node",
      "@tree-sitter/*",
      "aws-sdk",
      "classic-level",
      "dd-trace",
      "ffi-napi",
      "grpc",
      "hiredis",
      "kerberos",
      "leveldown",
      "miniflare",
      "mysql2",
      "newrelic",
      "odbc",
      "piscina",
      "realm",
      "ref-napi",
      "rocksdb",
      "sass-embedded",
      "sequelize",
      "serialport",
      "snappy",
      "tinypool",
      "usb",
      "workerd",
      "wrangler",
      "zeromq",
      "zeromq-prebuilt",
      "playwright",
      "puppeteer",
      "puppeteer-core",
      "electron",
    ],
    sourcemap: false,
  });

  await writeFile(
    path.join(outDir, "package.json"),
    JSON.stringify({ type: "commonjs" }, null, 2) + "\n",
  );

  // No static frontend here, but keep a trivial publish directory around
  // in case Netlify's build step expects one to exist.
  const publicDir = path.resolve(artifactDir, "public");
  await mkdir(publicDir, { recursive: true });
  await writeFile(
    path.join(publicDir, "index.html"),
    "<!-- API-only project, see /api -->\n",
  );
}

buildNetlify().catch((err) => {
  console.error(err);
  process.exit(1);
});
