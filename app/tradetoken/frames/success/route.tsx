/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "../frames";

const FRAME_BASE_URL = process.env.FRAMES_BASE_URL;

console.log("FRAME_BASE_URL", FRAME_BASE_URL);

const handleRequest = frames(async (ctx) => {
  const { message } = ctx;
  const txId = message?.transactionId;
  const requesterFid = message?.requesterFid!;
  const inviteFid = ctx.searchParams?.inviteFid || "";
  if (inviteFid) {
    console.log({ inviteFid, requesterFid, txId });
  }
  return {
    image: `${FRAME_BASE_URL}/images/success.png`,
    buttons: [
      <Button action="post" target={{ pathname: "/frames" }}>
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
      <Button
        action="post"
        target={{ pathname: "/frames/share", query: { inviteFid } }}
      >
        Share & Earn
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
