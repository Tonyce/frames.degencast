/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import {
  Abi,
  createPublicClient,
  encodeFunctionData,
  formatEther,
  getContract,
  http,
} from "viem";
import { baseSepolia } from "viem/chains";
import { AttToken } from "@/lib/contract/att-token";
import { PayToken } from "@/lib/contract/paytoken";

import { getUserDataWithFid, getAddressFromFid } from "@/lib/hub";

import { frames } from "../frames";

const handleRequest = frames(async (ctx) => {
  const requesterFid = ctx.message?.requesterFid;
  const connectedAddress = ctx.message?.connectedAddress;
  if (!requesterFid) {
    throw new Error("No requesterFid");
  }
  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });
  // publicClient.readContract(AttToken.address as `0x${string}`)
  const payToken = getContract({
    address: PayToken.address as `0x${string}`,
    abi: PayToken.abi,
    client: publicClient,
  });
  const attToken = getContract({
    address: AttToken.address as `0x${string}`,
    abi: AttToken.abi,
    client: publicClient,
  });
  const user = await getUserDataWithFid(requesterFid);
  const { ethAddress } = await getAddressFromFid(requesterFid);
  const addr = connectedAddress || ethAddress;

  const attTokenPrice = (await attToken.read.getMintNFTPrice([1])) as bigint;
  const payTokenBalance = (await payToken.read.balanceOf([addr])) as bigint;
  const remainedAllowance = (await payToken.read.allowance([
    addr,
    attToken.address,
  ])) as bigint;

  if (remainedAllowance < attTokenPrice) {
    return {
      image: (
        <div tw="flex flex-col">
          <div tw="flex">{"addr: " + addr}</div>
          <div tw="flex">{"PayToken:" + formatEther(payTokenBalance)}</div>
          <div tw="flex">{"ATTToken Price: " + formatEther(attTokenPrice)}</div>
          <div tw="flex">
            {"Approved Allowance: " + formatEther(remainedAllowance)}
          </div>
          <div tw="flex">Approve first</div>
        </div>
      ),
      textInput: `${formatEther(payTokenBalance)}`,
      buttons: [
        <Button
          action="tx"
          target={"/tx-data/approve"}
          post_url={"/frames/buy"}
        >
          approve
        </Button>,
      ],
    };
  }

  return {
    image: (
      <div tw="flex flex-col">
        <div tw="flex">{addr}</div>
        <div tw="flex">{formatEther(payTokenBalance)}</div>
        <div tw="flex">{formatEther(attTokenPrice)}</div>
        <div tw="flex">{formatEther(remainedAllowance)}</div>

        <div tw="flex">
          {ctx.pressedButton
            ? `I clicked ${ctx.searchParams.value}`
            : `Click some button`}
        </div>
      </div>
    ),
    textInput: "",
    buttons: [
      <Button
        action="tx"
        target={"/tx-data/mint-nft"}
        post_url={"/frames/success"}
      >
        Buy
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
