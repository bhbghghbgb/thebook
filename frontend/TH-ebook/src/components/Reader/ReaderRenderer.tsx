import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import parse from "html-react-parser";
import { useEffect, useRef } from "react";
import Frame from "react-frame-component";
const ReaderRenderer = () => {
  const iframeRef = useRef<HTMLIFrameElement>();
  const { data, error, isLoading } = useQuery<string>({
    queryKey: ["reader"],
    queryFn: () =>
      axios.get("/iawwl.htm", { responseType: "text" }).then((res) => res.data),
  });
  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      iframe.style.height =
        iframe.contentWindow.document.body.scrollHeight + 20 + "px";
    }
  }, [data]);
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (error) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <Frame className="w-full" ref={iframeRef}>
      {parse(data)}
    </Frame>
  );
};

export default ReaderRenderer;
