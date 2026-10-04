import type { MetadataRoute } from "next";
import { buildSitemap } from "@/modules/sitemap-robots";
import { listTopicHrefs } from "@/modules/topic-catalog";
import { getSiteUrl } from "@/shared/site";

// Composed here, in the route, so the two modules stay independent peers.
export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap(getSiteUrl(), listTopicHrefs());
}
