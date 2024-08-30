import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { logout, setUsers } from "../features/auth/authSlice";
import { RootState } from "../store";

// Define the response structure for the refresh token endpoint
type RefreshTokenResponse = {
  data: {
    accessToken: string;
  };
};

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 404) {
    const errorMessage = (result.error.data as { message: string })?.message;
    toast.error(errorMessage);
  }

  if (result?.error?.status === 401) {
    // Make a request to refresh the token using baseQuery
    const refreshResult = (await baseQuery(
      {
        url: "auth/refresh-token",
        method: "POST",
      },
      api,
      extraOptions
    )) as { data?: RefreshTokenResponse };

    const accessToken = refreshResult.data?.data.accessToken;
    if (accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUsers({
          user,
          token: accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "academic-semesters",
    "academic-departments",
    "academic-faculties",
  ],
  endpoints: () => ({}),
});
