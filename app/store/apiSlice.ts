// src/store/apiSlice.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CourseMetaData, CourseFaq, GetFaqsResponse } from '../types';

export const apiSlice = createApi({
	reducerPath: 'api', // Ensure consistency with the store
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
	}),
	endpoints: (builder) => ({
		// Existing endpoints
		getCourseMetaDataBySlug: builder.query<CourseMetaData, string>({
			query: (slug) => `course_meta_data/slug/${slug}`,
		}),
		getCourseFaqs: builder.query({
			query: (courseId) => `course_faqs/${courseId}`,
			transformResponse: (response: GetFaqsResponse) => response.items,
		}),
		// New search endpoint
		getSearchResult: builder.query<CourseFaq[], { courseId: string; keyword: string }>({
			query: ({ courseId, keyword }) =>
				`course_faqs/${courseId}/search?keyword=${encodeURIComponent(keyword)}&limit=1000`,
		}),
		getSearchResultByIndex: builder.query<CourseFaq[], { courseId: string; index: string }>({
			query: ({ courseId, index }) => `course_faqs/${courseId}/search?index=${encodeURIComponent(index)}&limit=1000`,
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
