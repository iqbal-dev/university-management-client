import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //   getAllAcademicSemester: builder.query({
    //     query: (data) => {
    //       const params = new URLSearchParams();
    //       if (data?.length) {
    //         data.forEach((item: TParamsType) => {
    //           params.append(item.name, item.value);
    //         });
    //       }
    //       return {
    //         url: "/academic-semesters",
    //         method: "GET",
    //         params,
    //       };
    //     },
    //     transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
    //       return {
    //         data: response.data,
    //         meta: response.meta,
    //       };
    //     },
    //   }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddStudentMutation } = userManagementApi;
