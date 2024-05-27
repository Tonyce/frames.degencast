import { API_KEY_0X_API_KEY } from "@/lib/env";
import { TransactionTargetResponse } from "frames.js";
import { getFrameMessage } from "frames.js/next/server";
import { NextRequest, NextResponse } from "next/server";
import { parseEther, erc20Abi, encodeFunctionData } from "viem";
import { base } from "viem/chains";

const ZERO_EX_ADDRESS = "0xdef1c0ded9bec7f1a1670819833240f027b25eff";

export async function POST(
  req: NextRequest,
  { params }: { params: { token: string } }
): Promise<NextResponse<TransactionTargetResponse>> {
  // const { token } = params;
  console.log("approve token", params.token);
  // TODO
  const token = "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed";
  const json = await req.json();
  const frameMessage = await getFrameMessage(json);

  if (!frameMessage) {
    throw new Error("No frame message");
  }

  let amount = frameMessage.inputText || "1000";

  const baseUrl = `https://base.api.0x.org/swap/v1/quote?`;
  const eth = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

  const querys = new URLSearchParams({
    buyToken: eth, // address
    sellToken: token,
    sellAmount: parseEther(amount).toString(),
  }).toString();

  const res = await fetch(baseUrl + querys, {
    headers: { "0x-api-key": API_KEY_0X_API_KEY! },
  });

  const order = await res.json();

  const calldata = encodeFunctionData({
    abi: erc20Abi,
    functionName: "approve",
    // args: [order.to, parseEther(amount)],
    args: [ZERO_EX_ADDRESS, parseEther(amount)],
  });

  console.log("calldata", calldata);

  return NextResponse.json({
    chainId: `eip155:${base.id}`, // OP Mainnet 10
    method: "eth_sendTransaction",
    params: {
      abi: erc20Abi,
      to: token,
      data: calldata,
    },
  });
}
