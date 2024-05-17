/* eslint-disable react/jsx-key */
import { frames } from "../frames";
import { Button } from "frames.js/next";

const handleRequest = frames(async (ctx) => {
  const { message } = ctx;
  const txId = message?.transactionId;

  return {
    image: <div tw="flex">{txId}</div>, // foo: bar
    buttons: [
      <Button action="post" target="/">
        Home
      </Button>,
      <Button
        action="link"
        target={`https://www.onceupon.xyz/${txId}?delay=1000`}
      >
        View Tx
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
