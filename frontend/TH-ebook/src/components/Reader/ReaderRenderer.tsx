import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import parse from "html-react-parser";
const ReaderRenderer = () => {
  const { data, error, isLoading } = useQuery<string>({
    queryKey: ["reader"],
    queryFn: () =>
      axios.get("/iawwl.htm", { responseType: "text" }).then((res) => res.data),
  });
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (error) {
    return <span>Error: {error.message}</span>;
  }
  return <div id="reader" className="w-full">{parse(data)}</div>;
};

export default ReaderRenderer;
