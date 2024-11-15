import { Navbar, Typography, IconButton } from "@material-tailwind/react";
import { HiMenu, HiSearch, HiUser } from "react-icons/hi";
import { useState } from "react";
import { DrawerDefault } from "./DrawerDefault.tsx";
import SearchBar from "./SearchBar.tsx";
import OverlayComponent from "../Share/OverlayComponent.tsx";
import CardPricing from "../Card/CardPricing.tsx";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import {StateType} from "../../store/rootReducer.ts";

interface NavBarProps {
  isMobile: boolean;
}

const NavBar = ({ isMobile }: NavBarProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false); // State for toggling SearchBar
  const [openPricing, setOpenPricing] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const user = useSelector((state: StateType) => state.user);
  const onUserIconClick = () => {
    
  }
  return (
    <>
      <Navbar
          color="transparent"
          className="navbar mx-auto max-w-full w-full px-4 py-3"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}      >
        <div className="icon-bar flex flex-wrap items-center justify-between gap-y-4 text-white">
          <div className="flex items-center">
            <IconButton className="ml-2" onClick={openDrawer}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}>
              <HiMenu className="w-6 h-6 text-white" />
            </IconButton>
            <Typography
                as="a"
                href="/"
                variant="h6"
                className="mr-4 ml-2 cursor-pointer py-1.5 text-white text-3xl"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}            >
              TH Ebook
            </Typography>
            <Typography
                as="li"
                variant="lead"
                color="white"
                className="p-1 font-normal"
                onClick={() => {
                  setOpenPricing(true);
                }}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}            >
              <a href="#" className="flex items-center">
                Pricing
              </a>
            </Typography>
          </div>
          <div className="flex items-center">
            {isMobile ? (
              <IconButton className="ml-2" onClick={() => setSearchOpen(true)}
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}>
                <HiSearch className="w-6 h-6 text-white" />
              </IconButton>
            ) : (
              <SearchBar />
            )}
            <IconButton className="ml-2"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}>
              {user.isLogin ? (
                  <img
                      src={user.data?.avatar}
                      alt="User Avatar"
                      className="w-6 h-6 rounded-full object-cover object-center"
                      onClick={() => navigate("/profile")}
                  />
              ) : (
                  <HiUser
                      className="w-6 h-6 text-white"
                      onClick={() => navigate("/auth/signin")}
                  />
              )}
            </IconButton>
          </div>
        </div>
      </Navbar>

      <DrawerDefault open={open} onClose={closeDrawer} />

      {searchOpen && (
        <OverlayComponent
          onClose={() => setSearchOpen(false)}
          BarComponent={<SearchBar />}
        />
      )}

      {openPricing && (
        <OverlayComponent
          onClose={() => setOpenPricing(false)}
          BarComponent={<CardPricing />}
        />
      )}
    </>
  );
};

export default NavBar;
