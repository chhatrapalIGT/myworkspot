import React from 'react';
import PropTypes from 'prop-types';

import { usePagination, DOTS } from './usePagination';
const Pagination = props => {
  const {
    onPageChange,
    totalCount = 0,
    siblingCount = 1,
    currentPage,
    pageSize,
    totalPages,
    spaceTotalPages,
    assignTotalPages,
  } = props;
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
    totalPages,
    spaceTotalPages,
    assignTotalPages,
  });

  const onNext = () => {
    if (
      currentPage < spaceTotalPages ||
      currentPage < totalPages ||
      currentPage < assignTotalPages
    ) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  // const lastPage =
  //   paginationRange[paginationRange && paginationRange.length - 1];
  return (
    <div className="blue_pagination">
      <span className="arrow" aria-hidden="true" onClick={onPrevious}>
        &lsaquo;
      </span>{' '}
      {paginationRange &&
        paginationRange.map(pageNumber => {
          if (pageNumber === DOTS) {
            return <span className="pageno pagination-item dots">&#8230;</span>;
          }

          return (
            <span
              aria-hidden="true"
              className={`pageno ${
                props.currentPage === pageNumber ? 'active' : ''
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </span>
          );
        })}
      <span className="arrow" disab aria-hidden="true" onClick={onNext}>
        &rsaquo;
      </span>
    </div>
  );
};

Pagination.propTypes = {
  onPageChange: PropTypes.func,
  totalCount: PropTypes.number,
  siblingCount: PropTypes.number,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  totalPages: PropTypes.number,
  spaceTotalPages: PropTypes.number,
  assignTotalPages: PropTypes.number,
};
export default Pagination;
