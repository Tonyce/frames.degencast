import { createFrames } from "frames.js/next";
import * as fs from "node:fs";
import * as path from "node:path";

export const frames = createFrames({
  basePath: "/tradetoken",
  baseUrl: process.env.FRAMES_BASE_URL,
  // middleware: [
  //   farcasterHubContext({
  //     hubHttpUrl: process.env.HUB_HTTP_URL,
  //     hubRequestOptions: {
  //       headers: {
  //         Authorization: `Bearer ${process.env.HUB_API_KEY}`,
  //       },
  //     },
  //   }),
  // ],
});

export const pixelFont = fs.readFileSync(
  path.join(process.cwd(), "public/fonts/pixel/Pixeled.ttf")
);
