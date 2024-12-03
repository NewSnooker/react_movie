import React from "react";

interface PaginationProps {
  totalPages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  onPagesChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  onPagesChange,
  page,
  setPage,
}) => {
  const nextPage = (page: number) => {
    if (page === totalPages) {
      return;
    }
    setPage(page + 1);
  };
  const previousPage = (page: number) => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };
  return (
    <nav className="mt-10 mx-2 flex justify-center gap-4">
      <button
        onClick={() => previousPage(page)}
        className="btn btn-sm btn-outline"
      >
        «
      </button>
      <div className="join flex ">
        {[...Array(totalPages).keys()].map((index) => (
          <button
            onClick={() => onPagesChange(index + 1)}
            key={index}
            className={`join-item btn btn-sm btn-outline ${
              page === index + 1 ? "btn-active" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button onClick={() => nextPage(page)} className="btn btn-sm btn-outline">
        »
      </button>
    </nav>
  );
};

export default Pagination;
