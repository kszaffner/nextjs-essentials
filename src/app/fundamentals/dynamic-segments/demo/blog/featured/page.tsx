import { ParamsReport } from "@/modules/dynamic-segments";

export default function Page() {
  return (
    <ParamsReport
      routePattern="/blog/featured"
      params={{}}
      note="A static segment beats a dynamic sibling: this file handles /blog/featured, so [slug] never sees 'featured'."
    />
  );
}
