import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { UserType } from "../enums/UserType";

export interface Comment {
  _id: string;
  message: string;
  authorId: string;
  authorName: string;
  authorRole: UserType;
  createdAt: string;
  fileId: string;
  parentId?: string;
}

interface GetCommentsDto {
  fileId: string;
  comments: Comment[];
}

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:8000/api"
        : "/api",
  }),
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    getComments: builder.query<GetCommentsDto, string>({
      query: (fileId) => `comments/${fileId}`,
      providesTags: ["Comment"],
    }),
    removeComment: builder.mutation({
      query: (id: string) => {
        const jwt = localStorage.getItem("jwt");
        return {
          url: `/comments/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };
      },
      invalidatesTags: ["Comment"],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data: deletedComment } = await queryFulfilled;
          dispatch(
            commentsApi.util.updateQueryData("getComments", id, (draft) => {
              const idS = draft.comments.map((comment) => comment._id);
              const index = idS.indexOf(deletedComment._id);
              draft.comments.splice(index, 1);
            })
          );
        } catch {}
      },
    }),
  }),
});

export const { useGetCommentsQuery, useRemoveCommentMutation } = commentsApi;
