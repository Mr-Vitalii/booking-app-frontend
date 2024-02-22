import { IoClose } from "react-icons/io5";
import { modalProps } from "@/common/types/modal";

export const Modal = ({ open, onClose, children }: modalProps) => {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors z-[999]
        ${open ? "visible bg-black/20" : "invisible"}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-sky-400 rounded-xl shadow p-1 transition-all md:p-3
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-full text-gray-400 bg-white hover:bg-sky-600 hover:text-white"
        >
          <IoClose />
        </button>
        {children}
      </div>
    </div>
  );
};
