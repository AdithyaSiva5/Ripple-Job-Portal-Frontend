import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
  _id: string;
  userId: string;
  imageUrl: string;
  title: string;
  description: string;
  date: string;
  likes: { _id: string; username: string; profileImageUrl: string }[];
  isHidden: boolean;
  isBlocked: boolean;
  hideComment: boolean;
  hideLikes: boolean;
  isDeleted: boolean;
}

interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<any[]>) => {
      state.posts = action.payload.filter(post => post !== undefined);
    },
    addNewPost: (state, action: PayloadAction<any>) => {
      state.posts.unshift(action.payload);
    },
  },
});

export const { setPosts, addNewPost } = postSlice.actions;
export default postSlice.reducer;
