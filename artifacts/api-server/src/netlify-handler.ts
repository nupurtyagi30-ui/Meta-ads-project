import serverless from "../vendor/serverless-http-lite.cjs";
import app from "./app";

export const handler = serverless(app);
