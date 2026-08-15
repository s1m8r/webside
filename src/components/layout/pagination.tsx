import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Paginations({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  page,
  setPage,
}: Props) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setPage((prev) => prev - 1)}
            className={
              !hasPreviousPage
                ? "pointer-events-none opacity-40"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {!hasNextPage && totalPages > 2 && (
          <PaginationItem>
            <PaginationLink onClick={() => setPage(page - 2)}>
              {currentPage - 2}
            </PaginationLink>
          </PaginationItem>
        )}

        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => setPage(page - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>

        {hasNextPage && (
          <PaginationItem>
            <PaginationLink onClick={() => setPage(page + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {!hasPreviousPage && totalPages > 2 && (
          <PaginationItem>
            <PaginationLink onClick={() => setPage(page + 2)}>
              {currentPage + 2}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => setPage((prev) => prev + 1)}
            className={
              !hasNextPage ? "pointer-events-none opacity-40" : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
