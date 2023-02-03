import React from 'react';
import { Pagination } from 'react-bootstrap';

export const PageSelector: React.FC<{
    pageCount: number;
    currentPage: number;
    onPageChange: (selectedPage: number) => void;
  }> = ({ pageCount, currentPage, onPageChange }) => {
    const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1);
  
    return (
      <div>
        <Pagination className="justify-content-center">
          {pageNumbers.map(number => (
            <Pagination.Item key={number} active={number === currentPage} onClick={() => onPageChange(number)}>
              {number}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    );
  };
  
