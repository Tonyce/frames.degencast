/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import { FRAME_BASE_URL } from "@/lib/env";
import { frames, pixelFont } from "../../frames";
import { Button } from "frames.js/next";
import { NextRequest } from "next/server";
import SelectDialogItem from "../../components/select-dialog-item";
import Title from "../../components/title";

const handleRequest = async (
  req: NextRequest,
  { params }: { params: { token: string } }
) => {
  const token = params.token;

  return await frames(async (ctx) => {
    const { message } = ctx;
    const page = ctx.searchParams.page;

    return {
      image: (
        <div
          tw="text-white w-full h-full flex flex-col items-center justify-center"
          style={{
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url('${FRAME_BASE_URL}/images/bg.png')`,
          }}
        >
          <Title text={`Swap ${token}`.toUpperCase()} />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "30px",
              padding: "40px 80px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={`https://ipfs.decentralized-content.com/ipfs/bafkreieudzvadtjy36j7x2i73isqw2jmgbwtum3p3eaahn4mnztuzl7y7e`}
              alt=""
              tw="w-40 h-40 object-cover rounded-full mr-6 mt-3"
              className="w-40"
            />
            <div
              style={{
                display: "flex",
                backgroundImage: `url(${FRAME_BASE_URL}/images/swap-dialog.png)`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "690px",
                flexDirection: "column",
                height: "220px",
                padding: "15px 30px",
              }}
            >
              <SelectDialogItem title="Token" value={"DEGEN"} />
              <SelectDialogItem title="Market cap" value="$2229.3M" />
              <SelectDialogItem title="Price" value="$0.028282" />
              <SelectDialogItem title="Buy/Sell(24H)" value="13.1313" />
            </div>
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
      textInput: `Input the token quantity here...`,
      buttons: [
        <Button action="post" target={`/frames/select/${page}`}>
          Back
        </Button>,
        <Button
          action="tx"
          target={`/tx-data/buy/${token}`}
          post_url={"/frames/success"}
        >
          Buy
        </Button>,
        <Button action="tx" target={`/tx-data/sell/${token}`}>
          Sell
        </Button>,
        <Button action="link" target={`/frames/swap/higher`}>
          View More
        </Button>,
      ],
    };
  })(req);
};

export const GET = handleRequest;
export const POST = handleRequest;
