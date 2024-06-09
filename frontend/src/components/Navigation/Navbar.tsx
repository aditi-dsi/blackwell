import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ClaimReward from "../ClaimReward";
import Account from "./Account";
import Network from "./Network";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <nav className="bg-black fixed top-0 w-full left-0">
      <div className="mx-auto max-w-9xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              onClick={toggleMenu}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              {!menuOpen ? (
                <>
                  {/* <!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          --> */}
                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </>
              ) : (
                <>
                  {/* <!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          --> */}
                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* DESKTOP NAVIGATION START */}

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block justify-between items-center">
              <div className="flex space-x-7">
                <Link
                  to="/"
                  className="text-white rounded-md px-3 py-2 text-xl font-extrabold"
                  aria-current="page"
                >
                  BlackWell
                </Link>
                <NavLink
                  to="/home"
                  className="text-gray-300 hover:text-white rounded-md px-3 py-2 text-base font-medium "
                >
                  Home
                </NavLink>
                <NavLink
                  to="/stake"
                  className="text-gray-300 hover:text-white rounded-md px-3 py-2 text-base font-medium "
                >
                  Stake
                </NavLink>
                <NavLink
                  to="/credit-score"
                  className="text-gray-300 hover:text-white rounded-md px-3 py-2 text-base font-medium "
                >
                  Credit Score
                </NavLink>
                <NavLink
                  to="https://x.com/halfacupoftea_"
                  target="_blank"
                  className="text-gray-300 hover:text-white rounded-md px-3 py-2 text-base font-medium "
                >
                  Contact
                </NavLink>
              </div>
              <div className="absolute right-0 top-0 mt-2.5 flex flex-row justify-around space-x-6">
                <Account/>
                <Network/>
                <ClaimReward />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP NAVIGATION END */}



      {/* MOBILE NAVIGATION START */}

      <div className={`sm:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96' : 'max-h-0'}`} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link
            to="/"
            className="text-white block rounded-md px-3 py-2 text-base font-extrabold"
            aria-current="page"
          >
            BlackWell
          </Link>
          <NavLink
            to="/home"
            className= "text-gray-300 hover:text-white hover:bg-[rgba(168, 168, 168, 0.347)] block rounded-md px-3 py-2 text-base font-medium"
          >
            Home
          </NavLink>
          <NavLink
            to="/stake"
            className="text-gray-300 hover:bg-[rgba(168, 168, 168, 0.347)] hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Stake
          </NavLink>
      <NavLink
            to="/credit-score"
            className="text-gray-300 hover:bg-[rgba(168, 168, 168, 0.347)] hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Credit Score
          </NavLink>
          <NavLink
            to="https://x.com/halfacupoftea_"
            target="_blank"
            className="text-gray-300 hover:bg-[rgba(168, 168, 168, 0.347)] hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Contact
          </NavLink>
          <Account/>
          <Network/>
          <ClaimReward />
        </div>
      </div>

      {/* MOBILE NAVIGATION END */}
    </nav>
  );
};

export default Navbar;
