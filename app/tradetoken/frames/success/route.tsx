/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "../frames";

const FRAME_BASE_URL = process.env.FRAMES_BASE_URL;

console.log("FRAME_BASE_URL", FRAME_BASE_URL);

const handleRequest = frames(async (ctx) => {
  const { message } = ctx;
  const txId = message?.transactionId;
  return {
    image: `${FRAME_BASE_URL}/images/success.png`,
    buttons: [
      <Button action="post" target={{ pathname: "/frames/select/1" }}>
        Go Swap
      </Button>,
      <Button
        action="link"
        target={`https://www.onceupon.xyz/${txId}?delay=1000`}
      >
        View Tx
      </Button>,
      <Button action="link" target={"https://dev.degencast.xyz"}>
        Leaderboard
      </Button>,
      <Button action="post" target={"/tx-data/approve"}>
        Share & Earn
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
