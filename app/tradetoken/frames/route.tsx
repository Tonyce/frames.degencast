/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames, pixelFont } from "./frames";
import { StarItem } from "./components/start-item";

const FRAME_BASE_URL = process.env.FRAMES_BASE_URL;

console.log("FRAME_BASE_URL", FRAME_BASE_URL);

const handleRequest = frames(async (ctx) => {
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
          {"TOP 3 TOKENS"}
        </div>
        <div
          tw="flex flex-col w-full mt-[25px]"
          style={{
            gap: "25px",
          }}
        >
          <StarItem title="degen" value={1} />
          <StarItem title="degen" value={1} />
          <StarItem title="degen" value={1} />
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
      // 1146 × 600
      //   width: 800,
      //   height: 480,
    },
    buttons: [
      <Button action="post" target={{ pathname: "/frames/select/1" }}>
        Go Swap
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
