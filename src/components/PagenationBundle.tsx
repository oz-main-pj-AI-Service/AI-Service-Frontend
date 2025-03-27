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
  totalPages,
  url,
}: {
  currentPage: number;
  totalPages: number;
  url: string;
}) {
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
        {currentPage > 2 && (
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
        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
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
