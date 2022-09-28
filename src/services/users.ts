import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserType } from "../enums/UserType";
import { SortType } from "../types/SortType";
import { UserInterface } from "../types/User";
import { FindFilesResponse } from "./files";

interface UpdateUserDto {
  newRole: UserType;
  id: string;
}

export type FindUserWithFiles = {
  filesData: FindFilesResponse;
  user: UserInterface;
};

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:8000/api"
        : "/api",
  }),
  endpoints: (builder) => ({
    getUserByLogin: builder.query<FindUserWithFiles, string>({
      query: (name: string) => `users/files/${name}`,
    }),
    getUsers: builder.query<UserInterface[], SortType>({
      query: (sortType: SortType) =>
        `users${sortType ? `?sort=${sortType}` : ""} `,
      transformResponse: (data: any) => data.users,
    }),
    deleteUser: builder.mutation({
      query: (id: string) => {
        const jwt = localStorage.getItem("jwt");
        return {
          url: `/users/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };
      },
    }),
    updateUser: builder.mutation({
      query: ({ id, newRole }: UpdateUserDto) => {
        const jwt = localStorage.getItem("jwt");
        return {
          url: `/users/${id}`,
          method: "PATCH",
          body: {
            type: newRole,
          },
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };
      },
      // async onQueryStarted(
      //   { id, newRole },
      //   { dispatch, queryFulfilled, getCacheEntry, getState }
      // ) {
      //   try {
      //     const { data: updatedUser } = await queryFulfilled;

      //     dispatch(
      //       usersApi.util.updateQueryData('getUsers', 'desc', (draft) => {
      //         const _id = updatedUser?._id;
      //         const userToUpdate = draft.find((user) => user._id === _id);
      //       })
      //     );
      //   } catch {}
      // },
    }),
  }),
});

export const {
  useGetUserByLoginQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersApi;
