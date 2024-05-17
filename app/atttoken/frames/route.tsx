/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, pixelFont } from "./frames";

// console.log(path.join(process.cwd(), "public/fonts/pixel/Pixeled.ttf"));

const handleRequest = frames(async (ctx) => {
  return {
    image: <span>Degencast Share</span>,
    imageOptions: {
      fonts: [
        {
          data: pixelFont,
          name: "upheaval",
        },
      ],
    },
    buttons: [
      <Button action="post" target={"/frames/buy"}>
        Buy
      </Button>,
      <Button action="post" target={"/frames/sell"}>
        Sell
      </Button>,
      <Button
        action="tx"
        target={"/tx-data/approve"}
        post_url={"/frames/route1"}
      >
        approve
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
