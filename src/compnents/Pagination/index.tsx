import React, { FC } from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  onChangePage,
}) => {
  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(page) => onChangePage(page.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={3}
        forcePage={currentPage - 1}
      />
    </>
  );
};
