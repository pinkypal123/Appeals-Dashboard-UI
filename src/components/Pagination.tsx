import React from "react";
import ReactPaginate from "react-paginate";
interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  totalItems: number;
  itemsPerPage: number;
}
const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  currentPage,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  const startItem = currentPage * itemsPerPage + 1;
  const endItem = Math.min((currentPage + 1) * itemsPerPage, totalItems);
  return (
    <div className="pagination-container d-flex flex-xl-nowrap flex-wrap justify-content-between align-items-center rounded-3 gap-md-0 gap-2">
      <div className="my-0 py-0">{`${startItem}-${endItem} of ${totalItems}`}</div>
      <ReactPaginate
        previousLabel={
          <span>
            &larr; <span className="d-none d-md-inline">Previous</span>
          </span>
        }
        nextLabel={
          <span>
            <span className="d-none d-md-inline">Next</span> &rarr;
          </span>
        }
        breakLabel="..."
        breakClassName="break-me"
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={onPageChange}
        containerClassName="pagination"
        activeClassName="active"
        forcePage={currentPage}
      />
      <div className="goto-page my-0 py-0 d-flex align-items-center gap-1">
        <span>Go to</span>
        <input
          type="number"
          min={1}
          max={pageCount}
          defaultValue={currentPage + 1}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const val = Number((e.target as HTMLInputElement).value);
              if (val >= 1 && val <= pageCount) {
                onPageChange({ selected: val - 1 });
              }
            }
          }}
          className="form-control form-control-sm"
          style={{ width: "70px" }}
        />
      </div>
    </div>
  );
};

export default Pagination;
