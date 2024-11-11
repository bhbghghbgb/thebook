import { useRef } from "react";
import useFitTextTuViet from "../../hooks/_Common/useFitTextTuViet.ts";
import { Book } from "../../models/Book.ts";

interface Props {
  book: Book;
}

const TitleContainer = ({ book }: Props) => {
  const flexRef = useRef<HTMLDivElement>(null);
  const ftRef = useFitTextTuViet({
    getHeightFn: () => {
      const flex = flexRef.current;
      if (!flex) return null;
      return $(flex).height() - $(flex).children().not(".title, .spacer").map();
    },
  });
  return (
    <>
      <div ref={flexRef} className="title flex flex-col h-60 w-full">
        <span
          ref={ftRef}
          // className="mb-1 block text-5xl font-bold sm:text-3xl md:text-4xl"
          className="mb-1 block text-5xl font-bold w-full"
          style={{
            textShadow: "rgba(0, 0, 0, 0.3) 1px 2px 4px",
          }}
        >
          {book.title}
        </span>
        <span className="text-3xl font-normal line-clamp-2 sm:text-xl md:text-2xl inline-block leading-5">
          Cross Method in the Dead of Night
        </span>
        <div className="spacer flex-grow hidden sm:block"></div>

        <span className="block font-normal text-2xl md:text-xl sm:text-base sm:truncate flex-shrink-0">
          {book.authors.map((author) => author.name).join(", ")}
        </span>
        <span className=" text-xl md:text-base sm:text-sm font-bold">
          Publication: {book.published_year}
        </span>
      </div>
    </>
  );
};

export default TitleContainer;
