"use client";
import {
  Link,
  Pagination as MUIPagination,
  PaginationItem,
} from "@mui/material";

export default function Pagination({
  totalPages,
  currentPage,
  currentQueries = {},
}: {
  totalPages: number;
  currentPage: number;
  currentQueries?: { [key: string]: string };
}) {
  return (
    <MUIPagination
      sx={{ mt: 2 }}
      count={totalPages}
      page={currentPage}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          href={`?page=${item.page}${currentQueries && `&${new URLSearchParams(currentQueries).toString()}`}`}
          {...item}
        />
      )}
    />
  );
}
