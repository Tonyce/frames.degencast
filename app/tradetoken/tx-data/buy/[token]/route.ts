import { API_KEY_0X_API_KEY } from "@/lib/env";
import { TransactionTargetResponse } from "frames.js";
import { getFrameMessage } from "frames.js/next/server";
import { NextRequest, NextResponse } from "next/server";
import {
  Abi,
  createPublicClient,
  encodeFunctionData,
  getContract,
  http,
  parseEther,
} from "viem";
import { base, optimism } from "viem/chains";

export async function POST(
  req: NextRequest,
  { params }: { params: { token: string } }
): Promise<NextResponse<TransactionTargetResponse>> {
  // const { token } = params;
  console.log("by token", params.token);
  // TODO
  const token = "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed";
  const json = await req.json();
  const frameMessage = await getFrameMessage(json);

  if (!frameMessage) {
    throw new Error("No frame message");
  }

  let amount = frameMessage.inputText || "0.001";

  console.log({ amount });
  const baseUrl = `https://base.api.0x.org/swap/v1/quote?`;
  const eth = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

  const querys = new URLSearchParams({
    buyToken: token, // address
    sellToken: eth,
    sellAmount: parseEther(amount).toString(),
  }).toString();

  const res = await fetch(baseUrl + querys, {
    headers: { "0x-api-key": API_KEY_0X_API_KEY! },
  });

  const order = await res.json();

  return NextResponse.json({
    chainId: `eip155:${base.id}`, // OP Mainnet 10
    method: "eth_sendTransaction",
    params: {
      abi: [],
      to: order.to,
      data: order.data,
      value: order.value,
    },
  });
}
