import { ImageTopic } from "@/modules/image";
import { getTopicMetadata } from "@/modules/topic-catalog";

export const metadata = getTopicMetadata("/optimization/image");

export default function Page() {
  return <ImageTopic />;
}
