/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "../../../frames";
import { NextRequest } from "next/server";

const FRAME_BASE_URL = process.env.FRAMES_BASE_URL;

console.log("FRAME_BASE_URL", FRAME_BASE_URL);

const handleRequest = async (
  req: NextRequest,
  { params }: { params: { token: string } }
) => {
  const token = params.token;

  return await frames(async (ctx) => {
    const { message } = ctx;
    const txId = message?.transactionId;
    const input = message?.inputText;
    const inviteFid = ctx.searchParams.inviteFid || "";

    console.log("approve", { txId, input });

    return {
      image: `${FRAME_BASE_URL}/images/success-approve.png`,
      buttons: [
        <Button
          action="tx"
          target={{
            pathname: `/tx-data/sell/${token}`,
            query: { inviteFid, amount: input },
          }}
          post_url={{
            pathname: `/frames/success`,
            query: { inviteFid },
          }}
        >
          Next
        </Button>,
      ],
    };
  })(req);
};

export const GET = handleRequest;
export const POST = handleRequest;
