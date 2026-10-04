import { Lora } from "next/font/google";

// Loaded only by the font demo page, so only that page preloads it. The font
// files are downloaded at build time and served from this site: the browser
// never contacts Google.
export const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});
