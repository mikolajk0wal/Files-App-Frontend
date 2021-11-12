import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface SignInDto {
  login: string;
  password: string;
}

interface SignUpDto extends SignInDto {
  retypedPassword: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (body: SignInDto) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    signUp: builder.mutation({
      query: (body: SignUpDto) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
    checkMe: builder.query({
      query: (jwt: string | null) => {
        return {
          url: 'auth/me',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };
      },
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useCheckMeQuery } =
  authApi;
