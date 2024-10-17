import NavBar from "./components/NavBar";

function BookDetail() {
  return (
    <>
      <div>
        <NavBar />

        {/* Container */}
        <div className="Container flex mt-4 ml-8">
          <div className="nav-l ">
            <img
              src="https://mangadex.org/covers/517b19aa-0243-4c55-85dc-eafd6318bbc2/63af2309-b249-4c6a-9d01-e1f81f3b3630.jpg.512.jpg"
              alt=""
              className="w-52 h-80 object-cover"
            />
          </div>
          <div className="nav-r ml-5">
            <div className="space-y-1">
              <span className=" text-custom-xl font-bold block">
                Mayonaka no X Giten
              </span>
              <span className="text-xl block">
                Cross Method in the Dead of Night
              </span>
              <span style={{ marginTop: "56px" }} className="block">
                Yamaguchi Mikoto, Bareisho
              </span>
            </div>
            <div className="mt-11 flex gap-2">
              <div className="Add-Library">
                <button className="bg-custom-orange text-white rounded-md w-[220px] h-[48px] hover:bg-orange-600 focus:outline-none">
                  Add To Library
                </button>
              </div>
              <div className="flex gap-2">
                <button className=" flex items-center justify-center font-medium select-none w-12 h-12 bg-zinc-700 rounded-md ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="feather feather-book-open icon"
                    viewBox="0 0 24 24"
                    style={{ color: "currentColor" }}
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zm20 0h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </button>
                <button className=" flex items-center justify-center font-medium select-none w-12 h-12 bg-zinc-700 rounded-md ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="feather feather-book-open icon"
                    viewBox="0 0 24 24"
                    style={{ color: "currentColor" }}
                  >
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zm0 7v-7"></path>
                  </svg>
                </button>
                <button className=" flex items-center justify-center font-medium select-none w-12 h-12 bg-zinc-700 rounded-md ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="feather feather-book-open icon"
                    viewBox="0 0 24 24"
                    style={{ color: "currentColor" }}
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m14-7-5-5-5 5m5-5v12"></path>
                  </svg>
                </button>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center justify-center bg-custom-orange text-white rounded-md w-[120px] h-[48px] gap-2 hover:bg-orange-600 focus:outline-none">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 576 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z"></path>
                  </svg>
                  <span>Preview</span>
                </button>
                <button className="flex items-center justify-center bg-custom-orange text-white rounded-md w-[120px] h-[48px] gap-2 hover:bg-orange-600 focus:outline-none">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 288 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z"></path>
                  </svg>
                  <span>Preoder</span>
                </button>
                <button className="flex items-center justify-center bg-custom-orange text-white rounded-md w-[120px] h-[48px] gap-2 hover:bg-orange-600 focus:outline-none">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                  </svg>
                  <span>Subscribe</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* category */}
        <div className="category mt-3">
          <div className="flex ml-[260px] gap-1">
            <span className="px-2 h-[15px] bg-gray-900 rounded font-bold flex items-center justify-center">
              <a href="" className="text-xs">
                Suggestive
              </a>
            </span>
            <span className="px-2 h-[15px] bg-gray-900 rounded font-bold flex items-center justify-center">
              <a href="" className="text-xs">
                Genderswap
              </a>
            </span>
            <span className="px-2 h-[15px] bg-gray-900 rounded font-bold flex items-center justify-center">
              <a href="" className="text-xs">
                Psychological
              </a>
            </span>
            <span className="px-2 h-[15px] bg-gray-900 rounded font-bold flex items-center justify-center">
              <a href="" className="text-xs">
                Romance
              </a>
            </span>
            <span className="px-2 h-[15px] bg-gray-900 rounded font-bold flex items-center justify-center">
              <a href="" className="text-xs">
                Supernatural
              </a>
            </span>
            <span className="px-2 h-[15px] bg-gray-900 rounded font-bold flex items-center justify-center">
              <a href="" className="text-xs">
                Mystery
              </a>
            </span>
            <span className="px-2 h-[15px] bg-gray-900 rounded font-bold flex items-center justify-center">
              <a href="" className="text-xs">
                Tragedy
              </a>
            </span>
            <span className="w-[300px] h-[15px] rounded flex items-center">
              <svg
                data-v-9ba4cb7e
                data-v-6ebb56e1
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 6.35 6.35"
                className="icon text-blue-500"
              >
                <path
                  fill="currentColor"
                  d="M4.233 3.175a1.06 1.06 0 0 1-1.058 1.058 1.06 1.06 0 0 1-1.058-1.058 1.06 1.06 0 0 1 1.058-1.058 1.06 1.06 0 0 1 1.058 1.058"
                ></path>
              </svg>
              <span className=" text-sm font-bold">
                Publication: 2014, Completed
              </span>
            </span>
          </div>
        </div>

        {/* rating */}
        <div className="ml-[260px] mt-4 flex gap-3">
          <span className="flex">
            <svg
              data-v-9ba4cb7e=""
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="feather feather-star icon rel text-primary mr-1 mt-1 text-custom-orange"
              viewBox="0 0 24 24"
            >
              <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"></path>
            </svg>
            <span className=" text-custom-orange">7.67</span>
          </span>
          <span className="flex">
            <svg
              data-v-9ba4cb7e=""
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              className="icon rel mr-1 mt-1"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
              ></path>
            </svg>
            <span>3,374</span>
          </span>
          <span className="flex">
            <svg
              data-v-9ba4cb7e=""
              data-v-89359c03=""
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              className="icon small text-icon-contrast text-undefined mr-1 mt-1"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              ></path>
            </svg>
            <span>30</span>
          </span>
          <span className="flex text-gray-500 font-bold">
            <svg
              data-v-9ba4cb7e=""
              data-v-65e4b371=""
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="feather feather-eye icon rel mr-1 mt-1"
              viewBox="0 0 24 24"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span>N/A</span>
          </span>
        </div>

        {/* story */}
        <div className="story-container ml-8 mr-10 mt-8">
          <p className="story-description">
            Hiroki has a NEET Shut-in for an older sister, which leads him to
            always think "It's better to be a girl!" While taking care of his
            lazy self-centered sister Yui, he has finally had enough of her
            behaviour, and snaps at her. Griping about his sister, Hiroki
            mutters "I wish we weren't related", and accesses a mysterious
            website address. The website claims to allow you to enter the body
            of another person, as long as you are willing to make your own body
            available as well. Skeptical, Hiroki tries the service and winds up
            in the body of popular idol Mikuriya Mikuni. While spending time as
            Mikuni, Hiroki is involved in finding out a secret about her he'd
            rather not. At the same time, when seeking to go back to his own
            body, the person occupying it tells him something outrageous has
            just happened! What happened to Hiroki's body during the incident?
            And what is the idol Mikuni's big secret? Be witness to the suspense
            as these mysteries pile up!
          </p>
        </div>

        <div className="flex">
          {/* Chapters, Comments, Art */}
          <div className="mt-5 ml-8">
            <div className="inline-flex items-center bg-gray-800 py-[4px] px-[6px] gap-6 rounded-sm">
              <span className="font-bold bg-zinc-700 px-6 py-2 cursor-pointer rounded-sm">
                Chapters
              </span>
              <span className="font-bold cursor-pointer">Comments (30)</span>
              <span className="font-bold cursor-pointer">Art</span>
            </div>
            <div className="Author mt-4">
              <span className="font-bold mb-2 block">Author</span>
              <span className="bg-zinc-600 rounded-sm p-1">
                Yamaguchi Mikoto
              </span>
            </div>
          </div>

          {/* Parts */}
          <div className="Parts">
            <div className="ml-32 mt-6 flex gap-0.5">
              <span className="part flex bg-neutral-400 py-2 px-4 items-center gap-1">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 448 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className=""
                >
                  <path d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"></path>
                </svg>
                <span>Parts</span>
              </span>
              <span className="part flex bg-neutral-400 py-2 px-5 items-center ">
                <span>Pt.1</span>
              </span>
              <span className="part flex bg-neutral-400 py-2 px-5 items-center ">
                <span>Pt.2</span>
              </span>
              <span className="part flex bg-neutral-400 py-2 px-5 items-center ">
                <span>Pt.3</span>
              </span>
              <span className="part flex bg-neutral-400 py-2 px-5 items-center ">
                <span>Pt.4</span>
              </span>
              <span className="part flex bg-neutral-400 py-2 px-5 items-center ">
                <span>Pt.5</span>
              </span>
              <span className="part flex bg-neutral-400 py-2 px-5 items-center ">
                <span>Pt.6</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookDetail;
