/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "../frames";

const FRAME_BASE_URL = process.env.FRAMES_BASE_URL;

console.log("FRAME_BASE_URL", FRAME_BASE_URL);

const handleRequest = frames(async (ctx) => {
  const { message } = ctx;
  const requesterFid = message?.requesterFid!;
  return {
    image: `${FRAME_BASE_URL}/images/success.png`,
    buttons: [
      <Button
        action="link"
        target={`https://warpcast.com/~/compose?text=${encodeURIComponent(
          `buy shares in`
        )}&embeds[]=${FRAME_BASE_URL}/tradetoken/frames?inviteFid=${requesterFid}`}
      >
        Share Frame & Earn Points
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
