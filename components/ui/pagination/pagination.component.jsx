import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Pagination = ({
  currentPage,
  totalPage,
  onPageChange,
  onPrevPageChange,
  onNextPageChange,
}) => {
  const pageArray = Array.from({ length: totalPage }, (_, index) => index + 1);
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
