import Typography from "@material-tailwind/react/components/Typography";
import { Book } from "../../models/Book";
import TagComponent from "../BookDetail/TagComponent";
import RatingsContainer from "../BookDetail/RatingsContainer";
import classNames from "classnames";
import { useState } from "react";

export default function BookListComponent({ book }: { book: Book }) {
  const [viewMode, setViewMode] = useState("dense");
  const isDense = viewMode === "dense";
  const isSparse = !isDense;
  console.log(viewMode);
  return (
    <div
      key={book.id}
      className={`grid gap-4 ${classNames({
        "grid-areas-product-list-comp-dense": isDense,
        "grid-cols-[84px_auto_1fr_auto_auto]": isDense,
        "grid-rows-[auto_auto_1fr]": isDense,
        "grid-areas-product-list-comp-sparse": isSparse,
        "grid-cols-[min(25%,150px)_1fr_auto]": isSparse,
        "grid-rows-[auto_auto_auto_1fr]": isSparse,
      })}`}
    >
      <img
        className="cover grid-in-cover w-full"
        src={book.cover_image}
        alt={book.title}
        onClick={() => setViewMode(viewMode === "dense" ? "sparse" : "dense")}
      />
      <Typography
        className="font-bold title grid-in-title whitespace-nowrap"
        variant="h2"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {book.title}
      </Typography>
      <div className={`author ${classNames({ hidden: isSparse })}`}>
        <TagComponent
          content={book.authors.map((author) => author.name)}
          onContainerClick={(authorName) =>
            console.log(`Author clicked: ${authorName}`)
          }
        />
      </div>
      <div className="rating grid-in-stats">
        <RatingsContainer />
      </div>
      <div className="tags grid-in-tags">
        <TagComponent
          content={book.category.map((category) => category.name)}
          onContainerClick={(categoryName) =>
            console.log(`Category clicked: ${categoryName}`)
          }
        />
      </div>
      <Typography
        className="description py-2 grid-in-description"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {book.description}
      </Typography>
    </div>
  );
}
