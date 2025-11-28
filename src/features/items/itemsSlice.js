import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getProductById, getProductsByQuery} from "../../services/ItemsService";

export const fetchProductsByQuery = createAsyncThunk(
    'products/fetchProductsByQuery',
    async (query,thunkAPI) => {
        try {
            return await getProductsByQuery(query);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id, thunkAPI) => {
        try {
            return await getProductById(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);

const itemsSlice = createSlice({
    name: "products",
    initialState: {
        list: [],
        selectedItem: null,
        loadingList: false,
        loadingItem: false,
        errorList: null,
        errorItem: null,
        query: ""
    },
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsByQuery.fulfilled, (state, action) => {
                state.list = action.payload.products;
                state.loadingList = false;
                state.errorList = null;
            })
            .addCase(fetchProductsByQuery.pending, (state, action) => {
                state.loadingList = true;
                state.list = [];
                state.errorList = null;
            })
            .addCase(fetchProductsByQuery.rejected, (state, action) => {
                state.loadingList = false;
                state.list = [];
                state.errorList = action.payload;
            });

        builder
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.selectedItem = action.payload;
                state.loadingItem = false;
                state.errorItem = null;
            })
            .addCase(fetchProductById.pending, (state, action) => {
                state.selectedItem = null;
                state.loadingItem = true;
                state.errorItem = null;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loadingItem = false;
                state.selectedItem = null;
                state.errorItem = action.payload;
            })

    }
})

export const {setQuery} = itemsSlice.actions;
export default itemsSlice.reducer;