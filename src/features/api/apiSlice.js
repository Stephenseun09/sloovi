import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const companyId = import.meta.env.VITE_COMPANY_ID;
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://stage.api.sloovi.com/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${accessToken}`);
      return headers;
    },
  }),
  tagTypes: ["Task", 'User'],

  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `team?product=outreach&company_id=${companyId}`,
        method: "GET",
      }),
      providesTags: ['User']
    }),
    getAllTasks: builder.query({
      query: () =>
        `task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${companyId}`,
      method: "GET",
      providesTags: (result,error,arg)=>result? [...result.results.map(({id})=>({type: 'Task', id})), 'Task']: ['Task'],
      providesTags: ['Task']
    }),
    getSingleTask: builder.query({
      query: (id) =>
        `task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_id=${companyId}`,
      method: "GET",
    }),
    addTask: builder.mutation({
      query: (task) => ({
        url: `task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${companyId}`,
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation({
      query: (data) => ({
        url: `task/lead_465c14d0e99e4972b6b21ffecf3dd691/${data.taskId}?company_id=${companyId}`,
        method: "PUT",
        body: data.task,
      }),
      invalidatesTags: (result,error,arg)=>[{type: 'Task', id:arg.id}],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_id=${companyId}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAllTasksQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useLazyGetSingleTaskQuery,
  useUpdateTaskMutation,
} = apiSlice;
