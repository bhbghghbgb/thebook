import {
    Navbar,
    Typography,
    IconButton,
    Button,
    Input,
} from "@material-tailwind/react";
import { HiUser, HiMenu } from "react-icons/hi";
import {useState} from "react";
import {DrawerDefault} from "./DrawerDefault.tsx";


export default function SearchBar() {
    const [open, setOpen] = useState(false);

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    return (
        <>
            <Navbar
                variant="gradient"
                color="transparent"
                className="mx-auto max-w-screen-xl from-blue-gray-900 to-blue-gray-800 px-4 py-3"
            >
                <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
                    <div className="flex items-center">
                        <IconButton className="ml-2" onClick={openDrawer}>
                            <HiMenu className="w-6 h-6 text-white" />
                        </IconButton>
                        <Typography as="a" href="#" variant="h6" className="mr-4 ml-2 cursor-pointer py-1.5 text-black text-3xl">
                            TH Ebook
                        </Typography>
                    </div>
                    <div className="flex items-center">
                        <div className="relative flex w-full gap-2 md:w-max items-center">
                            <Input
                                type="search"
                                color="white"
                                label="Type here..."
                                className="pr-20 bg-black text-white"
                                containerProps={{ className: "min-w-[288px]" }}
                            />
                            <Button size="sm" color="white" className="!absolute right-1 top-1 rounded">
                                Search
                            </Button>
                        </div>
                        <IconButton className="ml-2">
                            <HiUser className="w-6 h-6 text-white" />
                        </IconButton>
                    </div>
                </div>
            </Navbar>

            <DrawerDefault open={open} onClose={closeDrawer} />
        </>
    );
}