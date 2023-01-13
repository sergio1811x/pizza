import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPizzasArgs, Pizza } from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<Pizza[], fetchPizzasArgs>(
  "pizzas/fetchPizzasStatus",
  async (params) => {
    const { order, currentPage, categoryId, sortBy } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://62f64e81612c13062b4b535b.mockapi.io/pizza?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sortBy}&order=${order ? "desc" : "asc"}`
    );
    return data;
  }
);
