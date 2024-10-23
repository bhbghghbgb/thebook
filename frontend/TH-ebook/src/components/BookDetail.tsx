import {Book} from "../models/Book.ts";
import Category from "./Category.tsx";
import Ratings from "./Ratings.tsx";
import {Button, IconButton} from "@material-tailwind/react";
import {HiBookOpen, HiFlag, HiArrowUp} from "react-icons/hi";
import React from "react";


interface BookDetailProps {
    book: Book;
    onAddToLibrary: () => void;
    onPreview: () => void;
    onPreoder: () => void;
    onSub: () => void;
    onCategoryClick: (categoryName: string) => void;
}

const BookDetail: React.FC<BookDetailProps> = ({
                                                   book,
                                                   onAddToLibrary,
                                                   onPreview,
                                                   onPreoder,
                                                   onSub,
                                                   onCategoryClick
                                               }) => {
    return (
        <>
            <div>
                {/* Container */}
                <div className="Container flex mt-4 ml-8">
                    <div className="nav-l ">
                        <img
                            src={book.cover_image}
                            alt=""
                            className="w-52 h-80 object-cover"
                        />
                    </div>
                    <div className="nav-r ml-5">
                        {/*Tile*/}
                        <div className="space-y-1">
              <span className=" text-custom-xl font-bold block">
                {book.title}
              </span>
                            <span className="text-xl block">
                Cross Method in the Dead of Night
              </span>
                            <span style={{marginTop: "56px"}} className="block">
                {book.authors.map(author => author.name).join(", ")}
              </span>
                        </div>
                        {/*Button*/}
                        <div className="button mt-11 flex gap-2">
                            <div className="Add-Library">
                                <Button variant="filled" onClick={onAddToLibrary} size="lg" color="deep-orange">Add To
                                    Library</Button>
                            </div>
                            <div className="flex gap-2">
                                <IconButton color="lightBlue" size="lg">
                                    <HiBookOpen/>
                                </IconButton>
                                <IconButton color="lightBlue" size="lg">
                                    <HiFlag/>
                                </IconButton>
                                <IconButton color={"lightBlue"} size="lg">
                                    <HiArrowUp/>
                                </IconButton>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="filled" onClick={onPreview} size="lg"
                                        color="deep-orange">Preview</Button>
                                <Button variant="filled" onClick={onPreoder} size="lg"
                                        color="deep-orange">Preorder</Button>
                                <Button variant="filled" onClick={onSub} size="lg" color="deep-orange">Sub</Button>
                            </div>
                        </div>
                        {/*Extra Infor*/}
                        <div className="extra mt-1 flex flex-col">
                            {/* category */}
                            <Category book={book} onCategoryClick={onCategoryClick}/>

                            <span className="rounded flex">
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
            Publication: {book.published_year}
          </span>
        </span>

                        </div>
                    </div>
                </div>


                {/* rating */}
                <Ratings/>

                {/* story */}
                <div className="story-container ml-8 mr-10 mt-8">
                    <p className="story-description">
                        {book.description}
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
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                    className=""
                >
                  <path
                      d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"></path>
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
