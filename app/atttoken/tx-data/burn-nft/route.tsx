import { TransactionTargetResponse } from "frames.js";
import { getFrameMessage } from "frames.js/next/server";
import { NextRequest, NextResponse } from "next/server";
import {
  Abi,
  createPublicClient,
  encodeFunctionData,
  getContract,
  http,
} from "viem";
import { baseSepolia } from "viem/chains";
import { AttToken } from "../../../../lib/contract/att-token";

export async function POST(
  req: NextRequest
): Promise<NextResponse<TransactionTargetResponse>> {
  const json = await req.json();

  const frameMessage = await getFrameMessage(json);

  if (!frameMessage) {
    throw new Error("No frame message");
  }
  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });

  const calldata = encodeFunctionData({
    abi: AttToken.abi,
    functionName: "burnNFT",
    args: [1],
  });

  return NextResponse.json({
    chainId: `eip155:${baseSepolia.id}`, // OP Mainnet 10
    method: "eth_sendTransaction",
    params: {
      abi: AttToken.abi as Abi,
      to: AttToken.address as `0x${string}`,
      data: calldata,
    },
  });
}
