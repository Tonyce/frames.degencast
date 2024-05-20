import { fetchMetadata } from "frames.js/next";

export async function generateMetadata() {
  return {
    title: "ATT token",
    // provide a full URL to your /frames endpoint
    other: await fetchMetadata(
      new URL(
        "/tradetoken/frames",
        process.env.FRAMES_BASE_URL
          ? `${process.env.FRAMES_BASE_URL}`
          : "http://localhost:3000"
      )
    ),
  };
}

export default function Page() {
  return <span>atttoken page</span>;
}
