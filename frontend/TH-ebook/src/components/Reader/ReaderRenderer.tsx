import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import parse from "html-react-parser";
import $ from "jquery";
import DOMPurify from "dompurify";
const ReaderRenderer = () => {
  const { data, error, isLoading } = useQuery<string>({
    queryKey: ["reader"],
    queryFn: () =>
      axios
        .get("/content/1/2-bctcqcbc.htm", { responseType: "text" })
        .then((res) => res.data),
  });
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (error) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div id="reader" className="w-full">
      <Renderer data={data} />
    </div>
  );
};
const Renderer = ({ data }: { data: string | null | undefined }) => {
  if (!data) return <>Cannot load</>;
  // fix relative link to local files
  const dom = $(DOMPurify.sanitize(data));
  dom.find("[src]").attr("src", function () {
    const src = $(this).attr("src");
    if (!src?.startsWith("/content")) return `/content/1/${src}`;
  });
  return parse(dom.html());
};
export default ReaderRenderer;
