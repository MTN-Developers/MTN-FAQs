import { CourseMetaData, GetFaqsResponse } from '../types';

export async function getCourseData(slug: string) {
	// Fetch the Course ID and FAQ data on the server side
	const courseMetaDataResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/course_meta_data/slug/${slug}`);

	if (!courseMetaDataResponse.ok) {
		throw new Error(`HTTP error fetching course ID! status: ${courseMetaDataResponse.status}`);
	}

	const courseMetaData: CourseMetaData = await courseMetaDataResponse.json();
	const courseMetaDataId = courseMetaData.id;

	const faqsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/course_faqs/${courseMetaDataId}?limit=10000`);

	if (!faqsResponse.ok) {
		throw new Error(`HTTP error fetching FAQs! status: ${faqsResponse.status}`);
	}

	const faqsData: GetFaqsResponse = await faqsResponse.json();
	return {
		course: courseMetaData,
		faqsData: faqsData,
	};
}
