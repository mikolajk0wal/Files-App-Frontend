import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { UserType } from "../enums/UserType";

interface Comment {
  _id: string;
  message: string;
  authorId: string;
  authorName: string;
  authorRole: UserType;
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
  }),
});

export const { useGetCommentsQuery } = commentsApi;
