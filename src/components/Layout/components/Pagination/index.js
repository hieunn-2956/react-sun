import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ProductContext } from "../../../../Provider/products.provider";

export default function PaginationControlled() {
  const { page, totalProduct, limit, setPage } = useContext(ProductContext);
  const totalPage = Math.ceil(totalProduct / limit);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={totalPage} page={page} onChange={handleChange} />
    </Stack>
  );
}
