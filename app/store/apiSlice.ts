// src/store/apiSlice.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CourseMetaData, CourseFaq } from "../types";

export const apiSlice = createApi({
  reducerPath: "api", // Ensure consistency with the store
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.mis.mtninstitute.net/v1/",
  }),
  endpoints: (builder) => ({
    // Existing endpoints
    getCourseMetaDataBySlug: builder.query<CourseMetaData, string>({
      query: (slug) => `course_meta_data/slug/${slug}`,
    }),
    getCourseFaqs: builder.query<CourseFaq[], string>({
      query: (courseId) => `course_faqs/${courseId}`,
    }),
    // New search endpoint
    getSearchResult: builder.query<
      CourseFaq[],
      { courseId: string; keyword: string }
    >({
      query: ({ courseId, keyword }) =>
        `course_faqs/${courseId}/search?keyword=${encodeURIComponent(keyword)}`,
    }),
    getSearchResultByIndex: builder.query<
      CourseFaq[],
      { courseId: string; index: string }
    >({
      query: ({ courseId, index }) =>
        `course_faqs/${courseId}/search?index=${encodeURIComponent(index)}`,
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetCourseMetaDataBySlugQuery,
  useGetCourseFaqsQuery,
  useGetSearchResultQuery,
  useGetSearchResultByIndexQuery, // Exported hook for the search endpoint
} = apiSlice;
