'use client';
import React from 'react';
import notFoundBanner from '@/app/assets/images/notFound.svg';
import starsOverlay from '@/app/assets/images/stars.svg';
import Image from 'next/image';

const Page = () => {
	return (
		<div className='w-full h-screen overflow-hidden flex flex-col items-center justify-end'>
			<Image
				src={notFoundBanner}
				alt='Not Found'
				fill
				style={{ objectFit: 'contain', zIndex: 0 }}
			/>
			<Image
				src={starsOverlay}
				alt='Stars Overlay'
				fill
				style={{ objectFit: 'cover', zIndex: 1 }}
			/>
			<div className='flex flex-col items-center gap-y-2 text-white mb-20 font-light font-pnu'>
				<p className='text-4xl'>OOPS!</p>
				<p className='text-3xl uppercase -mt-8'>Page not found</p>
			</div>
		</div>
	);
};

export default Page;
