import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "productSlice/getallproduct",
  async () => {
    const res = await axios.get(`https://dummyjson.com/products`);
    return res.data;
  }
);
export const deleteProducts = createAsyncThunk(
  "productSlice/deleteProducts",
  async (data: any) => {
    const res = await axios.delete(
      `https://dummyjson.com/products/${data.deleteId}`
    );
    return res.data;
  }
);
interface product {
  category: string;
  productlist: any;
  isLoading: boolean;
}

const initialState: product = {
  category: "",
  productlist: [],
  isLoading: false,
};

const productSlice = createSlice({
  name: "productSlice",

  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        return {
          ...state,
          isLoading: false,
        };
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        return {
          ...state,
          productlist: action.payload.products,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          isLoading: true,
        };
      })
      .addCase(deleteProducts.pending, (state, action) => {
        return {
          ...state,
          isLoading: false,
        };
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        return {
          ...state,
          //   productlist: action.payload.products,
        };
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload,
          isLoading: true,
        };
      });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
