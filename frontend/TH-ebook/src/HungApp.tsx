import { Book } from "./models/Book";
import {Category} from "./models/Category.ts";
import BookDetail from "./components/BookDetail.tsx";


const categories: Category[] = [{ name: "Action" }, { name: "Adventure" }];

const test_data: Book =
    {
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
      category: categories
    };

const App = () => {

  return (
    <div
      id="page"
      className="m-0 flex  min-w-[320px] min-h-screen font-pop"
    >
      <BookDetail book={test_data} onAddToLibrary={() => {}} onPreoder={() => {}} onPreview={() => {}} onSub={() => {}} />
    </div>
  );
};

export default App;
