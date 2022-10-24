import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SortType } from "../types/SortType";
import { UserInterface } from "../types/User";

interface UpdateUserDto {
  id: string;
  login?: string;
  password?: string;
  newPassword?: string;
  retypedNewPassword?: string;
}

interface ChangeUsersPermissionsDto {
  id: string;
  newRole: "normal" | "moderator";
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:8000/api"
        : "/api",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserByLogin: builder.query<UserInterface, string>({
      query: (name: string) => `users/login/${name}`,
      providesTags: ["User"],
    }),
    getUsers: builder.query<UserInterface[], SortType>({
      query: (sortType: SortType) =>
        `users${sortType ? `?sort=${sortType}` : ""} `,
      providesTags: ["User"],
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
      query: (updateUserDto: UpdateUserDto) => {
        const jwt = localStorage.getItem("jwt");
        const { id, ...propsToUpdate } = updateUserDto;
        return {
          url: `/users/${id}`,
          method: "PATCH",
          body: {
            ...propsToUpdate,
          },
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };
      },
      invalidatesTags: ["User"],
      async onQueryStarted(
        { id, login },
        { dispatch, queryFulfilled, getCacheEntry, getState }
      ) {
        try {
          const { data: updatedUser } = await queryFulfilled;
          dispatch(
            usersApi.util.updateQueryData(
              "getUserByLogin",
              updatedUser.login,
              (draft) => {
                draft = updatedUser;
              }
            )
          );
        } catch {}
      },
    }),

    changeUsersPermissions: builder.mutation({
      query: ({ id, newRole }: ChangeUsersPermissionsDto) => {
        const jwt = localStorage.getItem("jwt");
        return {
          url: `/users/changePerms/${id}`,
          method: "PATCH",
          body: {
            newRole,
          },
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };
      },
      async onQueryStarted({ id, newRole }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedUser } = await queryFulfilled;

          dispatch(
            usersApi.util.updateQueryData(
              "getUserByLogin",
              updatedUser.login,
              (draft) => {
                draft.type = updatedUser.type;
              }
            )
          );
        } catch {}
      },
    }),
  }),
});

export const {
  useGetUserByLoginQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useChangeUsersPermissionsMutation,
  useUpdateUserMutation,
} = usersApi;
