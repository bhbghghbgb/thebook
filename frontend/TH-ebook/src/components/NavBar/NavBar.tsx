import {
  Navbar,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { HiMenu, HiSearch, HiUser } from "react-icons/hi";
import { useCallback, useState } from "react";
import { DrawerDefault } from "./DrawerDefault.tsx";
import SearchBar from "./SearchBar.tsx";
import OverlayComponent from "../Share/OverlayComponent.tsx";
import CardPricing from "../Card/CardPricing.tsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../store/rootReducer.ts";
import { logoutSlice }  from "../../features/user/userSlice.ts" ;
import MenuDefault from "../Share/MenuDefault.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import UserProfile from "../User/UserProfile.tsx";
import {User} from "../../models/User.ts";

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
  const userSelector = useSelector((state: StateType) => state.user);
  const userLocalStorage = localStorage.getItem("user");
  console.log("User Redux State:", userSelector);
  console.log("User Local Storage:", userLocalStorage);
  const handleOnSignIn = () => {
    navigate("/auth/signin");
  };
  const handleOnSignUp = () => {
    navigate("/auth/signup");
  };
  const {logout} = useAuth();
  const dispatch = useDispatch();
  const handleOnLogout = useCallback(() => {
    dispatch(logoutSlice());
    logout();
  }, [dispatch, logout]);

  const menuItems = [
    {
      node: (
        <Button
          variant="filled"
          onClick={handleOnSignUp}
          size="lg"
          color="deep-orange"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Sign Up
        </Button>
      ),
      onclick: () => handleOnSignUp(),
    },
    {
      node: (
        <Button
          variant="filled"
          onClick={handleOnSignIn}
          size="lg"
          color="deep-orange"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Sign In
        </Button>
      ),
      onclick: () => handleOnSignIn(),
    },
  ];

  console.log("Is Login State: ", userSelector.isLogin);
  return (
    <>
      <Navbar
        color="transparent"
        className="navbar mx-auto max-w-full w-full px-4 py-3"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="icon-bar flex flex-wrap items-center justify-between gap-y-4 text-white">
          <div className="flex items-center">
            <IconButton
              className="ml-2"
              onClick={openDrawer}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <HiMenu className="w-6 h-6 text-white" />
            </IconButton>
            <Typography
              as="a"
              href="/"
              variant="h6"
              className="mr-4 ml-2 cursor-pointer py-1.5 text-white text-3xl"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
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
              onPointerLeaveCapture={undefined}
            >
              <a href="#" className="flex items-center">
                Pricing
              </a>
            </Typography>
          </div>
          <div className="flex items-center">
            {isMobile ? (
              <IconButton
                className="ml-2"
                onClick={() => setSearchOpen(true)}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <HiSearch className="w-6 h-6 text-white" />
              </IconButton>
            ) : (
              <SearchBar />
            )}

            <div>
              {userLocalStorage ? (
                <MenuDefault
                  handlerButton={
                    <img
                      src={
                        userLocalStorage
                          ? JSON.parse(userLocalStorage).avatar
                          : userSelector.data?.avatar
                      }
                      alt="User Avatar"
                      className=" user-avatar w-10 h-10 ml-2 rounded-full object-cover object-center "
                    />
                  }
                  menuItems={[
                    {
                      node: (
                        <div className="w-96">
                          <UserProfile user={JSON.parse(userLocalStorage) as User} onLogout={handleOnLogout} />
                        </div>
                      ),
                      onClick: () => {},
                    },
                  ]}
                ></MenuDefault>
              ) : (
                <MenuDefault
                  handlerButton={
                    <IconButton
                      className="ml-2"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <HiUser className="user-icon w-6 h-6 text-white" />
                    </IconButton>
                  }
                  menuItems={menuItems}
                />
              )}
            </div>
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
