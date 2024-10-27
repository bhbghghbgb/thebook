import {
    Navbar,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { HiMenu, HiSearch, HiUser } from "react-icons/hi";
import { useState } from "react";
import { DrawerDefault } from "./DrawerDefault.tsx";
import SearchBar from "./SearchBar.tsx";
import { useMediaQuery } from "@mui/material";

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false); // State for toggling SearchBar
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    // Define the media query
    const isMobile = useMediaQuery("(max-width: 576px)");

    return (
        <>
            <Navbar
                variant="gradient"
                color="transparent"
                className="navbar mx-auto max-w-full w-full from-blue-gray-900 to-blue-gray-800 px-4 py-3"
            >
                <div className="icon-bar flex flex-wrap items-center justify-between gap-y-4 text-white">
                    <div className="flex items-center">
                        <IconButton className="ml-2" onClick={openDrawer}>
                            <HiMenu className="w-6 h-6 text-white" />
                        </IconButton>
                        <Typography as="a" href="#" variant="h6" className="mr-4 ml-2 cursor-pointer py-1.5 text-white text-3xl">
                            TH Ebook
                        </Typography>
                    </div>
                    <div className="flex items-center">
                        {isMobile ? (
                            <IconButton className="ml-2" onClick={() => setSearchOpen(true)}>
                                <HiSearch className="w-6 h-6 text-white" />
                            </IconButton>
                        ) : (
                            <SearchBar />
                        )}
                        <IconButton className="ml-2">
                            <HiUser className="w-6 h-6 text-white" />
                        </IconButton>
                    </div>
                </div>
            </Navbar>

            <DrawerDefault open={open} onClose={closeDrawer} />


{/* 
Conditional Rendering:

When the searchOpen state is true, 
a fixed div is rendered on top of all other content with a blurred background.

Trong React và TypeScript, toán tử && thường được sử dụng để thực hiện render có điều kiện. 
Điều này có nghĩa là một phần của giao diện người dùng sẽ chỉ được render nếu một điều kiện cụ thể là đúng.

Backdrop and Close Button:

The backdrop is created using a div with backdrop-blur-md class.
A close button (&times;) is added to close the SearchBar when clicked.



fixed: Positions the element relative to the browser window. It stays in place even when the page is scrolled.
relative: Positions the element relative to its normal position.
absolute: Positions the element relative to its nearest positioned ancestor (in this case, the outer div).
z-50: Sets the z-index to 50, ensuring it appears above most other elements.
justify-center: Đây là một lớp tiện ích của Tailwind CSS. Khi áp dụng lớp này vào một phần tử HTML, 
nó sẽ sử dụng thuộc tính justify-content của CSS để căn giữa các phần tử con theo chiều ngang.

*/}



            {searchOpen && (
                <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center bg-black bg-opacity-50">
                    <div className="absolute top-0 left-0 w-full h-full backdrop-blur-md"></div>
                    <div className="relative z-10 w-full p-4">
                        <SearchBar />
                        <button
                            onClick={() => setSearchOpen(false)}
                            className="absolute top-4 right-4 text-white text-2xl"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default NavBar;