import parse from "html-react-parser";
import $ from "jquery";
import DOMPurify from "dompurify";
import useFetchData from "../../hooks/useFetchData";

export type ReaderProps = {
  bookId: number;
  volumeNth: number;
  pagePage: number;
};

const ReaderRenderer = ({
  bookId: id,
  volumeNth: vl,
  pagePage: pg,
}: ReaderProps) => {
  const { data, isLoading, error } = useFetchData<string>(
    `books/${id}/${vl}/${pg}`
  );
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
