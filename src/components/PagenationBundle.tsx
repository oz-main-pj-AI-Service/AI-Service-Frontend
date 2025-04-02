import { PAGE_SIZE } from '@/constants/common';
import {
  Pagination,
  PaginationEllipsis,
  PaginationLink,
  PaginationItem,
  PaginationContent,
  PaginationPrevious,
  PaginationNext,
} from './ui/pagination';

export default function PagenationBundle({
  currentPage,
  totalCount,
  url,
}: {
  currentPage: number;
  totalCount: number;
  url: string;
}) {
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {currentPage === 1 ? (
            <PaginationPrevious aria-disabled="true" className="pointer-events-none opacity-50" />
          ) : (
            <PaginationPrevious href={`${url}p=${currentPage - 1}`} />
          )}
        </PaginationItem>
        {currentPage >= 3 && (
          <PaginationItem>
            <PaginationLink href={`${url}p=1`}>1</PaginationLink>
          </PaginationItem>
        )}

        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink href={`${url}p=${currentPage - 1}`}>{currentPage - 1}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink href={`${url}p=${currentPage + 1}`}>{currentPage + 1}</PaginationLink>
          </PaginationItem>
        )}

        {currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage <= totalPages - 2 && (
          <PaginationItem>
            <PaginationLink href={`${url}p=${totalPages}`}>{totalPages}</PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          {currentPage === totalPages ? (
            <PaginationNext aria-disabled="true" className="pointer-events-none opacity-50" />
          ) : (
            <PaginationNext href={`${url}p=${currentPage + 1}`} />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
