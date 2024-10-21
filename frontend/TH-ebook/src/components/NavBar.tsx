function NavBar() {
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
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6 "
              id="menu-icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>
            <div className="flex gap-1">
              <img
                src="https://mangadex.org/img/brand/mangadex-logo.svg"
                alt=""
                className="h-6"
              />
              <h1>MangaDex</h1>
            </div>
          </div>
          <div className="navbar-r flex pr-5 gap-5">
            <div className="relative flex items-center ">
              <input
                type="text"
                className="bg-white/20 text-white rounded-md p-1.5 w-80 h-8 outline-none border-none pr-10 font-bold" // Thêm padding bên phải để tạo không gian cho biểu tượng
                placeholder="Search..."
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="absolute right-2 w-5 h-5 text-white hover:cursor-pointer" // Định vị biểu tượng
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
