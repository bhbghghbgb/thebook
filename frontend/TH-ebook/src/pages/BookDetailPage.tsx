import { Book } from "../models/Book.ts";
import { Category } from "../models/Category.ts";
import BookDetail from "../components/BookDetail.tsx";

const categories: Category[] = [
    { name: "Action" },
  { name: "Adventure" },
  { name: "Comedy" },
  { name: "Drama" },
  { name: "Fantasy" },
  { name: "Horror" },
  { name: "Mystery" },
  { name: "Romance" },
  { name: "Sci-Fi" },
  { name: "Thriller" },
  { name: "Western" },
  { name: "Biography" },
  { name: "Cookbook" },
];

const test_data: Book = {
  id: "123456789",
  title: "Fuck Microsoft",
  description: "Microsoft is the bull shit company",
  cover_image:
    "https://img.perlego.com/book-covers/778577/9781451648553_300_450.webp",
  file_path: "dede",
  published_year: 2023,
  language: "vi",
  created_at: "2024-10-10T08:31:36.732Z",
  updated_at: "2024-10-10T08:31:36.732Z",
  authors: [{ name: "Nguyen Thanh Hung" }, { name: "Huynh Gia Bao" }],
  coins: 50,
  category: categories,
};
const handleCategoryClick = (categoryName: string) => {
  console.log(`Category clicked: ${categoryName}`);
};

const BookDetailPage = () => {
  return (
    <div
      id="BookDetailPage"
      className="max-w-[1280px] mx-auto p-8 text-center "
    >
      <div className="card p-8">
        <BookDetail
          book={test_data}
          onAddToLibrary={() => {}}
          onPreoder={() => {}}
          onPreview={() => {}}
          onSub={() => {}}
          onCategoryClick={handleCategoryClick}
        />
      </div>
    </div>
  );
};

export default BookDetailPage;
