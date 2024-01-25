import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),
    signup: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/signup`,
        method: 'POST',
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
      }),
      keepUnusedDataFor: 5,
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    updateProfile: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/profile`,
        method: 'PATCH',
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ['Users'],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserProfileQuery,
  useLogoutMutation,
  useSignupMutation,
  useUpdateProfileMutation,
  useGetUsersQuery,
} = usersApiSlice;
