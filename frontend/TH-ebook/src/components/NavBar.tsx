// src/components/NavBar.tsx
import React from 'react';
import SearchBox from './SearchBox';

const NavBar: React.FC = () => {
  return (
    <>
      <div>
        {/* Phan Navbar */}
        <div className="navbar flex mt-5 justify-between">
          <div className="navbar-l flex pl-5 gap-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>
            <div className="flex gap-1">
              <img
                src="https://mangadex.org/img/brand/mangadex-logo.svg"
                alt=""
                className="h-6"
              />
              <h1 className="text-white font-bold">TH Ebook</h1>
            </div>
          </div>
          <div className="navbar-r flex pr-5 gap-5">
            <SearchBox />
            <div className="user">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10 hover:cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14.25c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5zm0 1.5c-3.315 0-6 2.685-6 6h12c0-3.315-2.685-6-6-6z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
