import FaqPageClient from '../components/FaqPageClient';
import { Suspense } from 'react';
import Loader from '../components/ui/Loader';
import { notFound } from 'next/navigation';
import Header from '../components/Header';
import { getCourseData } from '../utils/getCourseData';

export async function generateStaticParams() {
	// Fetch all slugs at build time
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/course_meta_data`);
	const slugsData = await res.json();
	const slugs = slugsData.map((slugObj: { slug: string }) => ({ slug: slugObj.slug }));

	return slugs;
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
