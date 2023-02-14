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
}

interface EditFileDto {
  title: string;
  subject: string;
  id: string;
  sortType: SortType;
}

interface DeleteFileDto {
  id: string;
  sortType: SortType;
}

interface GetFilesDto {
  type?: FileType;
  sortType: SortType;
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
      query: ({ type, sortType, subject, title, author, page, userPage }) => {
        const queryData = `${sortType ? `?sort=${sortType}` : "?sort=desc"}${
          type ? `&type=${type}` : ""
        }${subject ? `&subject=${subject}` : ""}${title ? `&q=${title}` : ""}${
          author ? `&authorName=${author}` : ""
        }${page ? `&page=${page}` : ""}&per_page=8`;
        // return userPage
        //   ? `users/files/${author}${queryData}`
        //   : `files${queryData}&type=${type}`;
        return `files${queryData}`;
      },
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
        { sortType }: CreateFileDto,
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data: addedFile } = await queryFulfilled;
          dispatch(
            filesApi.util.updateQueryData(
              "getFilesByType",
              { type: addedFile.type, sortType },
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
      async onQueryStarted({ sortType }, { dispatch, queryFulfilled }) {
        try {
          const { data: editedFile } = await queryFulfilled;
          dispatch(
            filesApi.util.updateQueryData(
              "getFilesByType",
              { type: editedFile.type, sortType },
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

      async onQueryStarted({ sortType }, { dispatch, queryFulfilled }) {
        try {
          const { data: deletedFile } = await queryFulfilled;
          dispatch(
            filesApi.util.updateQueryData(
              "getFilesByType",
              { type: deletedFile.type, sortType },
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
} = filesApi;
