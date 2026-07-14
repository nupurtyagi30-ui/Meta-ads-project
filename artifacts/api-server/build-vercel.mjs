import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build as esbuild } from "esbuild";
import esbuildPluginPino from "esbuild-plugin-pino";
import { rm, mkdir, rename, writeFile } from "node:fs/promises";

// Plugins (e.g. 'esbuild-plugin-pino') may use `require` to resolve dependencies
globalThis.require = createRequire(import.meta.url);

const artifactDir = path.dirname(fileURLToPath(import.meta.url));

async function buildVercel() {
  const apiDir = path.resolve(artifactDir, "api");
  // Vercel treats every file directly inside /api as its own function route,
  // EXCEPT files/folders prefixed with "_" — those are bundled as shared code
  // but not exposed as routes. Pino needs multiple worker chunk files, so we
  // put all of esbuild's raw output there and keep only a tiny static
  // wrapper at api/index.mjs as the single real route.
  const chunksDir = path.join(apiDir, "_chunks");

  // Remove any stray raw .ts entry so Vercel doesn't see two files for the same route
  await rm(path.join(apiDir, "index.ts"), { force: true });
  await rm(chunksDir, { recursive: true, force: true });
  await mkdir(chunksDir, { recursive: true });

  await esbuild({
    entryPoints: [path.resolve(artifactDir, "src/app.ts")],
    platform: "node",
    bundle: true,
    format: "esm",
    outdir: chunksDir,
    outExtension: { ".js": ".mjs" },
    logLevel: "info",
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
    plugins: [
      esbuildPluginPino({ transports: ["pino-pretty"] }),
    ],
    banner: {
      js: `import { createRequire as __bannerCrReq } from 'node:module';
import __bannerPath from 'node:path';
import __bannerUrl from 'node:url';

globalThis.require = __bannerCrReq(import.meta.url);
globalThis.__filename = __bannerUrl.fileURLToPath(import.meta.url);
globalThis.__dirname = __bannerPath.dirname(globalThis.__filename);
    `,
    },
  });

  await rename(
    path.join(chunksDir, "app.mjs"),
    path.join(chunksDir, "index.mjs"),
  );
  await rm(path.join(chunksDir, "app.mjs.map"), { force: true });

  await writeFile(
    path.join(apiDir, "index.mjs"),
    'export { default } from "./_chunks/index.mjs";\n',
  );

  // This project has no static frontend, but Vercel's "Other" framework
  // preset still expects an Output Directory to exist. Give it a trivial one.
  const publicDir = path.resolve(artifactDir, "public");
  await mkdir(publicDir, { recursive: true });
  await writeFile(
    path.join(publicDir, "index.html"),
    "<!-- API-only project, see /api -->\n",
  );
}

buildVercel().catch((err) => {
  console.error(err);
  process.exit(1);
});
