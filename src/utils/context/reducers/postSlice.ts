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
    addaPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    updatePost: (
      state,
      action: PayloadAction<{ postId: string; updatedPost: Post }>
    ) => {
      const { postId, updatedPost } = action.payload;
      const index = state.posts.findIndex((post) => post._id === postId);
      if (index !== -1) {
        state.posts[index] = updatedPost;
      }
    },
    deleteaPost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    updatePosts: (
      state,
      action: PayloadAction<{ posts: Post[]; append?: boolean }>
    ) => {
      const { posts, append = false } = action.payload;
      if (append) {
        state.posts = [...state.posts, ...posts];
      } else {
        state.posts = posts;
      }
    },
  },
});

export const { addaPost, updatePost, deleteaPost,updatePosts } = postSlice.actions;
export default postSlice.reducer;