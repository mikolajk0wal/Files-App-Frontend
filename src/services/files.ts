import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { FileInterface } from "../types/File";
import { FileType } from "../types/FileType";
import { SortType } from "../types/SortType";

export const isFetchBaseQueryErrorType = (
  error: any
): error is FetchBaseQueryError => "status" in error;

export interface FindFilesResponse {
  files: FileInterface[];
  count: number;
  requiredPages: number;
  page: number;
}

interface CreateFileDto {
  title: string;
  subject: string;
  file: File;
  sortType: SortType;
  sortBy: "createdAt" | "fileSize";
}

interface EditFileDto {
  title: string;
  subject: string;
  id: string;
  sortType: SortType;
  sortBy: "createdAt" | "fileSize";
}

interface DeleteFileDto {
  id: string;
  sortType: SortType;
  sortBy: "createdAt" | "fileSize";
}

interface GetFilesDto {
  type?: FileType;
  sortType: SortType;
  sortBy: "createdAt" | "fileSize";
  author?: string;
  subject?: string;
  title?: string;
  page?: number;
  userPage?: boolean;
}

export const filesApi = createApi({
  reducerPath: "filesApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:8000/api"
        : "/api",
  }),
  tagTypes: ["File"],
  endpoints: (builder) => ({
    getFilesByType: builder.query<FindFilesResponse, GetFilesDto>({
      query: ({ type, sortType, subject, title, author, page, sortBy }) => {
        const url = new URL(window.location.href);
        url.searchParams.set("sort", sortType ? sortType : "desc");
        type && url.searchParams.set("type", type);
        sortBy && url.searchParams.set("sort_by", sortBy);
        subject && url.searchParams.set("subject", subject);
        title && url.searchParams.set("q", title);
        author && url.searchParams.set("authorName", author);
        page && url.searchParams.set("page", page.toString());
        url.searchParams.set("per_page", "8");

        return `files${url.search}`;
      },
      providesTags: ["File"],
    }),
    getFileBySlug: builder.query<FileInterface, string>({
      query: (slug) => `files/slug/${slug}`,
      providesTags: ["File"],
    }),
    addFile: builder.mutation({
      query: ({ title, subject, file }: CreateFileDto) => {
        const jwt = localStorage.getItem("jwt");
        const formData = new FormData();
        formData.append("title", title);
        formData.append("subject", subject);
        formData.append("file", file);
        return {
          url: "/files",
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };
      },
      invalidatesTags: ["File"],
      async onQueryStarted(
        { sortType, sortBy }: CreateFileDto,
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data: addedFile } = await queryFulfilled;
          dispatch(
            filesApi.util.updateQueryData(
              "getFilesByType",
              { type: addedFile.type, sortType, sortBy },
              (draft) => {
                if (sortType === "desc") {
                  draft.files.unshift(addedFile);
                } else {
                  draft.files.push(addedFile);
                }
              }
            )
          );
        } catch {}
      },
    }),
    editFile: builder.mutation({
      query: ({ subject, title, id }: EditFileDto) => {
        const jwt = localStorage.getItem("jwt");
        return {
          url: `files/${id}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          body: { subject, title },
        };
      },
      invalidatesTags: ["File"],
      async onQueryStarted({ sortType, sortBy }, { dispatch, queryFulfilled }) {
        try {
          const { data: editedFile } = await queryFulfilled;
          dispatch(
            filesApi.util.updateQueryData(
              "getFilesByType",
              { type: editedFile.type, sortType, sortBy },
              (draft) => {
                const idS = draft.files.map((file) => file._id);
                const index = idS.indexOf(editedFile._id);
                draft.files[index] = editedFile;
              }
            )
          );
        } catch {}
      },
    }),
    deleteFile: builder.mutation({
      query: ({ id, sortType }: DeleteFileDto) => {
        const jwt = localStorage.getItem("jwt");
        return {
          url: `/files/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };
      },
      invalidatesTags: ["File"],

      async onQueryStarted({ sortType, sortBy }, { dispatch, queryFulfilled }) {
        try {
          const { data: deletedFile } = await queryFulfilled;
          dispatch(
            filesApi.util.updateQueryData(
              "getFilesByType",
              { type: deletedFile.type, sortType, sortBy },
              (draft) => {
                const idS = draft.files.map((file) => file._id);
                const index = idS.indexOf(deletedFile._id);
                draft.files.splice(index, 1);
              }
            )
          );
        } catch {}
      },
    }),
  }),
});

export const {
  useGetFilesByTypeQuery,
  useAddFileMutation,
  useDeleteFileMutation,
  useEditFileMutation,
  useGetFileBySlugQuery,
} = filesApi;
