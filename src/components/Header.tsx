import { useAppContext } from "@/contexts/AppContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MobileMenu } from "./MobileMenu";
import { SignOutButton } from "./SignOutButton";
import { IoClose } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import useMediaQuery from "../hooks/useMediaQuery";

export const Header = () => {
  const { isLoggedIn } = useAppContext();
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");

  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
    document.body.style.overflow = open ? "auto" : "hidden";
  };

  return (
    <div className="bg-sky-600 py-6 px-3 relative">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Holidays.com</Link>
        </span>

        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              {isAboveMediumScreens ? (
                <>
                  <div className="flex">
                    <Link
                      className="flex items-center text-white px-3 font-bold hover:bg-sky-100 hover:text-sky-600"
                      to="/my-bookings"
                    >
                      My Bookings
                    </Link>
                    <Link
                      className="flex items-center text-white px-3 font-bold hover:bg-sky-100 hover:text-sky-600"
                      to="/my-hotels"
                    >
                      My Hotels
                    </Link>
                  </div>
                  <SignOutButton />
                </>
              ) : (
                <button
                  className="rounded-full bg-secondary-500 p-2"
                  onClick={toggleMenu}
                >
                  {open ? (
                    <IoClose color="white" />
                  ) : (
                    <IoMenu size="30px" color="white" />
                  )}
                </button>
              )}

              {!isAboveMediumScreens && open && (
                <MobileMenu toggleMenu={toggleMenu} />
              )}
            </>
          ) : (
            <>
              <Link
                to="/sign-in"
                className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100 md:px-6 md:py-3"
              >
                Sign In
              </Link>
            </>
          )}
        </span>
      </div>
    </div>
  );
};
