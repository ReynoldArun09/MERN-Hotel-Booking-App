import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

export type PaginationType = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

export default function PaginationComponent({
  page,
  pages,
  onPageChange,
}: PaginationType) {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  return (
    <Pagination>
      <PaginationContent>
        {pageNumbers.map((number) => (
          <PaginationItem key={number}>
            <PaginationLink
              onClick={() => onPageChange(number)}
              className="cursor-pointer"
              isActive={page === number}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
}
