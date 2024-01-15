import React from "react";
import { usePagination, DOTS } from "./usePagination";
import "./pagination.css";
import styled, { css } from "styled-components";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    style,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <UlContainer style={style}>
      {/* Left navigation arrow */}
      <LiNavigate onClick={onPrevious} disabled={currentPage === 1}>
        <div className="arrow left" />
      </LiNavigate>
      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li key={pageNumber.toString()} className="pagination-item dots">
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <LiRenderPills
            key={pageNumber.toString()}
            onClick={() => onPageChange(pageNumber)}
            selected={pageNumber === currentPage}
          >
            {pageNumber}
          </LiRenderPills>
        );
      })}
      {/*  Right Navigation arrow */}
      <LiNavigate disabled={currentPage === lastPage} onClick={onNext}>
        <div className="arrow right" />
      </LiNavigate>
    </UlContainer>
  );
};

export default Pagination;

export const LiNavigate = styled.li`
  display: flex;
  padding: 0 12px;
  height: 32px;
  text-align: center;
  justify-content: center;
  margin: auto 4px;
  color: rgba(0, 0, 0, 0.87);
  box-sizing: border-box;
  align-items: center;
  letter-spacing: 0.01071em;
  border-radius: 16px;
  line-height: 1.43;
  font-size: 13px;
  min-width: 32px;
  :hover {
    background-color: rgba(0, 0, 0, 0.04);
    cursor: pointer;
  }
  ${({ disabled }) => {
    if (disabled) {
      return css`
        pointer-events: none;
        :hover {
          background-color: transparent;
          cursor: default;
        }
      `;
    }
  }}
`;

export const LiRenderPills = styled.li`
  display: flex;
  padding: 0 12px;
  height: 32px;
  text-align: center;
  justify-content: center;
  margin: auto 4px;
  color: rgba(0, 0, 0, 0.87);
  box-sizing: border-box;
  align-items: center;
  letter-spacing: 0.01071em;
  border-radius: 16px;
  line-height: 1.43;
  font-size: 13px;
  min-width: 32px;
  :hover {
    background-color: rgba(0, 0, 0, 0.04);
    cursor: pointer;
  }
  ${({ selected }) => {
    if (selected) {
      return css`
        background-color: rgba(0, 0, 0, 0.08);
      `;
    }
  }}
`;

export const UlContainer = styled.ul`
  display: flex;
  list-style-type: none;
  justify-content: center;
  margin-top: 10px;
`;
