import { TAcademicFaculty, TAcademicSemester } from "../../../types";
import { TParamsType, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemester: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data?.length) {
          data.forEach((item: TParamsType) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/academic-semesters",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),

    getAllAcademicFaculty: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data?.length) {
          data.forEach((item: TParamsType) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/academic-faculties",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getAllAcademicFacultyDropDown: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data?.length) {
          data.forEach((item: TParamsType) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/academic-faculties",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return response.data.map(({ _id, name }) => ({
          value: _id,
          label: name,
        }));
      },
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllSemesterQuery,
  useAddAcademicSemesterMutation,
  useGetAllAcademicFacultyQuery,
  useAddAcademicFacultyMutation,
  useGetAllAcademicFacultyDropDownQuery,
  useAddAcademicDepartmentMutation,
} = academicSemesterApi;
