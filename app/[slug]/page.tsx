import { Metadata } from 'next';
import FaqPageClient from '../components/FaqPageClient';
import { CourseMetaData, GetFaqsResponse } from '../types';
import { Suspense } from 'react';
import Loader from '../components/ui/Loader';
import { notFound } from 'next/navigation';
import Header from '../components/Header';

export async function generateStaticParams() {
	// Fetch all slugs at build time
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/course_meta_data`);
	const slugsData = await res.json();
	const slugs = slugsData.map((slugObj: { slug: string }) => ({ slug: slugObj.slug }));

	return slugs;
}

async function getCourseData(slug: string) {
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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
	// Fetch course data based on slug
	try {
		const { course, faqsData } = await getCourseData(params.slug);

		return {
			title: `${course.course_name_ar} | ${course.course_name_en}`,
			description: course.course_name_ar,
			keywords: faqsData.items.map((faq) => faq.title).join(', '),
			robots: 'index, follow',
			openGraph: {
				title: `${course.course_name_ar} | ${course.course_name_en}`,
				description: course.course_name_ar,
				images: [
					{
						url: course.course_logo,
						width: 800,
						height: 600,
						alt: course.course_name_ar,
					},
				],
			},
		};
	} catch (error) {
		console.error('Error fetching course data:', error);
		return {
			title: '404 | Not Found',
			description: 'This course does not exist',
			keywords: 'This course does not exist',
		};
	}
}

const Page = async ({ params }: { params: { slug: string } }) => {
	const { slug } = params;

	// Fetch course data on the server
	try {
		const { course, faqsData } = await getCourseData(slug);

		return (
			<Suspense fallback={<Loader />}>
				<Header logo={course.course_logo} />
				<FaqPageClient
					slug={slug}
					courseId={course.id}
					faqsData={faqsData.items}
				/>
			</Suspense>
		);
	} catch (error) {
		console.error(error);
		notFound();
	}
};

export default Page;
