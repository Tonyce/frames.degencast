/* eslint-disable react/jsx-key */
import { FRAME_BASE_URL } from "@/lib/env";
import { frames, pixelFont } from "../../frames";
import { Button } from "frames.js/next";
import { NextRequest } from "next/server";
import SwapItem from "../../components/swap-item";

const handleRequest = async (
  req: NextRequest,
  { params }: { params: { page: string } }
) => {
  const page = Number(params.page);
  if (isNaN(page)) {
    throw new Error("Invalid page number");
  }

  return await frames(async (ctx) => {
    const { message } = ctx;

    return {
      image: (
        <div
          tw="text-white w-full h-full flex flex-col"
          style={{
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url('${FRAME_BASE_URL}/images/bg.png')`,
          }}
        >
          <div
            tw="w-full justify-center items-center flex flex-col "
            style={{
              textShadow: "4px 4px 0px #4C2896, 4px 4px 0px #4C2896",
              fontSize: "45px",
              fontStyle: "normal",
              fontWeight: "700",
              textTransform: "uppercase",
            }}
          >
            {"Swap tokens".toUpperCase()}
          </div>
          <div
            tw="flex flex-rol w-full justify-center items-center mt-[20px]"
            style={{
              gap: "20px",
            }}
          >
            <SwapItem title="degen" value={1} />
            <SwapItem title="degen" value={1} />
          </div>
        </div>
      ),
      imageOptions: {
        fonts: [
          {
            data: pixelFont,
            name: "upheaval",
          },
        ],
      },
      buttons: [
        (page > 1 && (
          <Button
            action="post"
            target={{
              pathname: `/frames/select/${page - 1}`,
            }}
          >
            Back
          </Button>
        )) || (
          <Button action="post" target={`/frames`}>
            Back
          </Button>
        ),
        <Button
          action="post"
          target={{ pathname: `/frames/swap/degen`, query: { page } }}
        >
          Degen
        </Button>,
        <Button
          action="post"
          target={{ pathname: `/frames/swap/higher`, query: { page } }}
        >
          Higher
        </Button>,
        <Button
          action="post"
          target={{
            pathname: `/frames/select/${page + 1}`,
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
