import React from 'react';
import Footer from '../components/Footer';
import { getCourseData } from '../utils/getCourseData';
import { Metadata } from 'next';

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

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			{children}
			<Footer />
		</>
	);
};

export default layout;
