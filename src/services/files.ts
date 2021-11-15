import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { FileInterface } from '../types/File';
import { FileType } from '../types/FileType';
import { SortType } from '../types/SortType';

export const isFetchBaseQueryErrorType = (
  error: any
): error is FetchBaseQueryError => 'status' in error;

interface CreateFileDto {
  title: string;
  subject: string;
  type: FileType;
  file: File;
  sortType: SortType;
}

interface DeleteFileDto {
  id: string;
  sortType: SortType;
}

interface GetFilesData {
  type: FileType;
  sortType: SortType;
}

export const filesApi = createApi({
  reducerPath: 'filesApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000/api'
        : '/api',
  }),
  tagTypes: ['File'],
  endpoints: (builder) => ({
    getFilesByType: builder.query<FileInterface[], GetFilesData>({
      query: ({ type, sortType }) =>
        `files/type/${type}${sortType ? `?sort=${sortType}` : ''} `,
      providesTags: ['File'],
    }),
    addFile: builder.mutation({
      query: ({ title, subject, type, file }: CreateFileDto) => {
        const jwt = localStorage.getItem('jwt');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('subject', subject);
        formData.append('type', type);
        formData.append('file', file);
        return {
          url: '/files',
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };
      },
      async onQueryStarted(
        { type, sortType },
        { dispatch, queryFulfilled, getCacheEntry, getState }
      ) {
        try {
          const { data: addedFile } = await queryFulfilled;
          dispatch(
            filesApi.util.updateQueryData(
              'getFilesByType',
              { type, sortType },
              (draft) => {
                draft.push(addedFile);
              }
            )
          );
        } catch {}
      },
    }),
    deleteFile: builder.mutation({
      query: ({ id, sortType }: DeleteFileDto) => {
        const jwt = localStorage.getItem('jwt');
        return {
          url: `/files/${id}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };
      },
      // eslint-disable-next-line
      async onQueryStarted({ sortType }, { dispatch, queryFulfilled }) {
        try {
          const { data: deletedFile } = await queryFulfilled;
          dispatch(
            filesApi.util.updateQueryData(
              'getFilesByType',
              { type: deletedFile.type, sortType },
              (draft) => {
                const idS = draft.map((file) => file._id);
                const index = idS.indexOf(deletedFile._id);
                draft.splice(index, 1);
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
} = filesApi;
