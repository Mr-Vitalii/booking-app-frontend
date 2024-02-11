import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { SignOutButton } from "./SignOutButton";
import { navLinks } from "@/config/nav-links";

type Props = {
  toggleMenu: () => void;
};

export const MobileMenu = ({ toggleMenu }: Props) => {
  return (
    <div className="fixed bottom-0 right-0 z-40 h-full w-full bg-sky-600 text-center drop-shadow-xl sm:w-[300px] sm:text-start">
      <div className="flex justify-end py-6 px-3">
        <button
          className="rounded-full bg-secondary-500 p-2"
          onClick={toggleMenu}
        >
          <IoClose size="30px" color="white" />
        </button>
      </div>
      <ul className="flex flex-col gap-3 text-2xl items-center md:ml-[10%] md:items-start ">
        {navLinks.map((link) => (
          <li key={link.label} className="my-7 text-2xl">
            <Link
              className=" text-white font-bold "
              to={link.path}
              onClick={toggleMenu}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-[25px] md:ml-[10%]">
        <SignOutButton fontSize={"xl"} toggleMenu={toggleMenu} />
      </div>
    </div>
  );
};
