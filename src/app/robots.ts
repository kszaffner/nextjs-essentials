import type { MetadataRoute } from "next";
import { buildRobots } from "@/modules/sitemap-robots";
import { getSiteUrl } from "@/shared/site";

export default function robots(): MetadataRoute.Robots {
  return buildRobots(getSiteUrl());
}
