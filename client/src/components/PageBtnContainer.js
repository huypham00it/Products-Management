import React from "react";

import { useStateValue } from "../context/StateContext";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

const pageBtnContainer = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { numOfPages, page, changePage } = useStateValue();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const prevPage = () => {
    let newPage = page - 1;
    if(newPage < 1){
        newPage = numOfPages;
    }

    changePage(newPage);
  };

  const nextPage = () => {
    let newPage = page + 1;
    if(newPage > numOfPages){
        newPage = 1;
    }

    changePage(newPage);
  };

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <BsChevronDoubleLeft />
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              key={pageNumber}
              className={pageNumber === page ? "pageBtn active" : "pageBtn"}
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        <BsChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default pageBtnContainer;
