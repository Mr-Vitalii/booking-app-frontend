import { PaginationProps } from "@/common/types/search";

export const Pagination = ({ page, pages, onPageChange }: PaginationProps) => {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center">
      <ul className="flex border border-sky-500">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`px-2 py-1 ${
              page === number ? "bg-sky-600 text-white" : ""
            }`}
          >
            <button onClick={() => onPageChange(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
