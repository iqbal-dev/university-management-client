import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "../../../types";
import { TParamsType, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemester: builder.query({
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
      providesTags: ["academic-semesters"],
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
      invalidatesTags: ["academic-semesters"],
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

    getAllAcademicDepartment: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data?.length) {
          data.forEach((item: TParamsType) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/academic-departments",
          method: "GET",
          params,
        };
      },
      providesTags: ["academic-departments"],
      transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getAcademicDepartmentById: builder.query({
      query: (data) => {
        return {
          url: `/academic-departments/${data.academicDepartmentId}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicDepartment>) => {
        return {
          data: response.data,
        };
      },
    }),
    createAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academic-departments"],
    }),
    updateAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: `/academic-departments/${data.academicDepartmentId}`,
        method: "PATCH",
        body: data.academicDepartment,
      }),
      invalidatesTags: ["academic-departments"],
    }),
  }),
});

export const {
  useGetAllAcademicSemesterQuery,
  useAddAcademicSemesterMutation,
  useGetAllAcademicFacultyQuery,
  useAddAcademicFacultyMutation,
  useGetAllAcademicFacultyDropDownQuery,
  useCreateAcademicDepartmentMutation,
  useUpdateAcademicDepartmentMutation,
  useGetAcademicDepartmentByIdQuery,
  useGetAllAcademicDepartmentQuery,
} = academicSemesterApi;
