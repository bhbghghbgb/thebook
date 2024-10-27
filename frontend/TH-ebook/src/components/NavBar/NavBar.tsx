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


export default function NavBar() {
    const [open, setOpen] = useState(false);

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    return (
        <>
            <Navbar
                variant="gradient"
                color="transparent"
                className="navbar mx-auto max-w-full w-full from-blue-gray-900 to-blue-gray-800 px-4 py-3"
                >
                <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
                    <div className="flex items-center">
                        <IconButton className="ml-2" onClick={openDrawer}>
                            <HiMenu className="w-6 h-6 text-white" />
                        </IconButton>
                        <Typography as="a" href="#" variant="h6" className="mr-4 ml-2 cursor-pointer py-1.5 text-whitek text-3xl">
                            TH Ebook
                        </Typography>
                    </div>
                    <div className="flex items-center">
                        <div className="relative flex w-full gap-2 md:w-max items-center">
                            <Input
                                type="search"
                                color="black"
                                label="Type here..."
                                className="pr-20 bg-white text-white"
                                containerProps={{ className: "min-w-[288px]" }}
                            />
                            <Button size="sm" color="black" className="!absolute right-1 top-1 rounded">
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


/* 



type="search":

Thuộc tính này xác định loại của input. Trong trường hợp này, nó là một input tìm kiếm, cho phép người dùng nhập từ khóa để tìm kiếm.
color="black":

Thuộc tính này có thể là một thuộc tính tùy chỉnh của component mà bạn đang sử dụng. Nó có thể được sử dụng để đặt màu sắc cho một phần tử nào đó trong component.
label="Type here...":

Thuộc tính này cung cấp một nhãn cho input. Nó thường được hiển thị dưới dạng placeholder hoặc label bên cạnh input, giúp người dùng biết họ nên nhập gì.
className="pr-20 bg-black text-black":

Thuộc tính này áp dụng các lớp CSS cho phần tử.
pr-20: Padding-right là 20 đơn vị (có thể là pixel hoặc một đơn vị khác tùy thuộc vào framework CSS bạn đang sử dụng).
bg-black: Nền màu đen.
text-black: Màu chữ đen.

containerProps={{ className: "min-w-[288px]" }}:

Thuộc tính này truyền các thuộc tính bổ sung cho container của component.
Ở đây, nó đặt className cho container với giá trị min-w-[288px], nghĩa là chiều rộng tối thiểu của container là 288 pixel.



*/