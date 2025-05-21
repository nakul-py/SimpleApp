import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  uploadedFiles: [],
  loading: false,
  error: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    uploadFiles: (state, action) => {
      state.uploadedFiles = action.payload;
    },
    deleteFiles: (state, action) => {
        state.uploadedFiles = state.uploadedFiles.filter((file) => file.$id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {addPost, deletePost, setPosts, setLoading, setError, uploadFiles, deleteFiles} = postSlice.actions;
export default postSlice.reducer;
