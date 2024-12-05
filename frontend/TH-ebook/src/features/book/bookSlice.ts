import { createSlice } from '@reduxjs/toolkit';

const createBookListSlice = (name: string) => {
    return createSlice({
        name,
        initialState: {
            data: [],
            loading: false,
            error: null
        },
        reducers: {
            [`fetch${name}Request`]: (state) => {
                state.loading = true;
                state.error = null;
            },
            [`fetch${name}Success`]: (state, action) => {
                state.data = action.payload;
                state.loading = false;
            },
            [`fetch${name}Failure`]: (state, action) => {
                state.error = action.payload;
                state.loading = false;
            }
        }
    });
};

// Tạo các slice cho các danh sách sách
const newBooksSlice = createBookListSlice('NewBooks');
const trendingBooksSlice = createBookListSlice('TrendingBooks');
const featuredBooksSlice = createBookListSlice('FeaturedBooks');
const bookSlice = createBookListSlice('Books');

// Export các actions của từng danh sách sách từ các slice tương ứng
export const {
    fetchNewBooksRequest,
    fetchNewBooksSuccess,
    fetchNewBooksFailure
} = newBooksSlice.actions;

export const {
    fetchTrendingBooksRequest,
    fetchTrendingBooksSuccess,
    fetchTrendingBooksFailure
} = trendingBooksSlice.actions;

export const {
    fetchFeaturedBooksRequest,
    fetchFeaturedBooksSuccess,
    fetchFeaturedBooksFailure
} = featuredBooksSlice.actions;

export const {
    fetchBooksRequest,
    fetchBooksSuccess,
    fetchBooksFailure
} = bookSlice.actions;

// Export các reducers của từng danh sách sách từ các slice
export default {
    newBooks: newBooksSlice.reducer,
    trendingBooks: trendingBooksSlice.reducer,
    featuredBooks: featuredBooksSlice.reducer,
    books: bookSlice.reducer
};