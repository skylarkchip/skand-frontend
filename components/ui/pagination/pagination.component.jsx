import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Pagination = ({
  currentPage,
  totalPage,
  onPageChange,
  onPrevPageChange,
  onNextPageChange,
}) => {
  let pageArray = [];

  const range = Math.min(5, totalPage);
  let startPage = Math.max(1, currentPage - Math.floor(range / 2));
  startPage = Math.min(startPage, totalPage - range + 1);

  for (let i = startPage; i < startPage + range; i++) {
    pageArray.push(i);
  }

  return (
    <div className="flex w-full justify-center gap-4 mt-4">
      <button
        className={`group ${currentPage === 1 ? "hidden" : "block"}`}
        onClick={onPrevPageChange}
      >
        <BsChevronLeft className="text-custom-gray group-hover:text-custom-pink" />
      </button>
      {pageArray.map((page) => (
        <button
          className={`${
            currentPage === page
              ? "text-custom-pink"
              : "text-custom-gray hover:text-custom-pink"
          }`}
          key={page}
          onClick={() => onPageChange(page)}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}
      <button
        className={`group ${currentPage === totalPage ? "hidden" : "block"}`}
        onClick={onNextPageChange}
      >
        <BsChevronRight className="text-custom-gray hover:text-custom-pink" />
      </button>
    </div>
  );
};

export default Pagination;
