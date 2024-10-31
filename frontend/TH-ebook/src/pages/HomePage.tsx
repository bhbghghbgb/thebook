import BookContainer from "../components/HomePage/BookContainer";
import useFetchBooks from "../hooks/useFetchBook";
import { Category } from "../models/Category";
import { Book } from "../models/Book";
import BannerSlider from "../components/HomePage/BannerSlider";

interface Props {
  isMobile: boolean;
}


const HomePage = ({isMobile}:Props) => {
  // const { data: books, error, isLoading } = useFetchBooks();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  // if (!books) {
  //   return <div>No books available</div>;
  // }

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

  const books: Book[] = [
    {
      id: "123456789",
      title: "Fuck Microsoft",
      description:
        'Mia is a half-succubus, but she bitterly hates the devil part of her genetics. "I\'m not lewd!", she said. "All men are monkey", she said. Yet, karma often comes sooner than expected.',
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
    },
    {
      id: "123456781",
      title: "Fuck Apple",
      description:
        'Mia is a half-succubus, but she bitterly hates the devil part of her genetics. "I\'m not lewd!", she said. "All men are monkey", she said. Yet, karma often comes sooner than expected.',
      cover_image: "https://img.perlego.com/book-covers/3427220/9788858436059_300_450.webp",
      file_path: "dede",
      published_year: 2023,
      language: "vi",
      created_at: "2024-10-10T08:31:36.732Z",
      updated_at: "2024-10-10T08:31:36.732Z",
      authors: [{ name: "Nguyen Thanh Hung" }, { name: "Huynh Gia Bao" }],
      coins: 50,
      category: categories,
    },
    {
      id: "123456782",
      title: "Fuck Facebook",
      description:
        'Mia is a half-succubus, but she bitterly hates the devil part of her genetics. "I\'m not lewd!", she said. "All men are monkey", she said. Yet, karma often comes sooner than expected.',
      cover_image:
        "https://img.perlego.com/book-covers/4168677/thumbnail_9780313351280.jpg",
      file_path: "dede",
      published_year: 2023,
      language: "vi",
      created_at: "2024-10-10T08:31:36.732Z",
      updated_at: "2024-10-10T08:31:36.732Z",
      authors: [{ name: "Nguyen Thanh Hung" }, { name: "Huynh Gia Bao" }],
      coins: 50,
      category: categories,
    },
    {
      id: "123456785",
      title: "Fuck Google",
      description:
        'Mia is a half-succubus, but she bitterly hates the devil part of her genetics. "I\'m not lewd!", she said. "All men are monkey", she said. Yet, karma often comes sooner than expected.',
      cover_image:
        "https://img.perlego.com/book-covers/2193445/9781351768290_300_450.webp",
      file_path: "dede",
      published_year: 2023,
      language: "vi",
      created_at: "2024-10-10T08:31:36.732Z",
      updated_at: "2024-10-10T08:31:36.732Z",
      authors: [{ name: "Nguyen Thanh Hung" }, { name: "Huynh Gia Bao" }],
      coins: 50,
      category: categories,
    },
  ];

  return (
    <div
      className="home-page gap-y-10"
    >
      <BannerSlider books={books} isMobile={isMobile} />
      <BookContainer text="Trending" books={books} />
      <div className="flex-grow hidden sm:block" />
      <BookContainer text="New" books={books} />
      <div className="flex-grow hidden sm:block" />
      <BookContainer text="Features" books={books} />
    </div>
  );
};

export default HomePage;

/* 



m-0: Thiết lập margin (khoảng cách ngoài) của phần tử là 0.
flex: Thiết lập phần tử thành một container flexbox, cho phép bạn sử dụng các thuộc tính flexbox để sắp xếp các phần tử con.
place-items-center: Căn giữa các phần tử con theo cả trục ngang và trục dọc trong container flexbox.
min-w-[320px]: Thiết lập chiều rộng tối thiểu của phần tử là 320 pixel.
min-h-screen: Thiết lập chiều cao tối thiểu của phần tử bằng chiều cao của màn hình.
font-pop: Áp dụng font chữ "Pop" cho phần tử. Đây có thể là một lớp tùy chỉnh trong cấu hình Tailwind CSS của bạn.
w-full: Thiết lập chiều rộng của phần tử là 100% chiều rộng của phần tử cha.
h-full: Thiết lập chiều cao của phần tử là 100% chiều cao của phần tử cha.
bg-black: Thiết lập màu nền của phần tử là màu đen.




*/

/* 



"container flexbox" là một cách để sử dụng CSS Flexbox trong một container để sắp xếp các phần tử con bên trong nó. Flexbox là một mô hình bố cục một chiều giúp dễ dàng thiết kế các bố cục phức tạp và đáp ứng.




*/
