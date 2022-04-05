import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { setPageRequest } from "../../../actions";

export default function ProductPagination() {
  const dispatch = useDispatch();
  const { page, limit, totalProduct } = useSelector((state) => state.product);
  const totalPage = Math.ceil(totalProduct / limit);

  const handleChange = (event, value) => {
    dispatch(setPageRequest(value));
  };

  return (
    <Stack spacing={2}>
      <Pagination count={totalPage} page={page} onChange={handleChange} />
    </Stack>
  );
}
