'use client';
import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const Header = ({ logo }: { logo: string }) => {
	const params = useParams();
	const slug = params.slug;

	return (
		<div className='w-full'>
			<a href={`/${slug}`}>
				<Image
					src={logo}
					alt='logo'
					width={200}
					height={70}
					className='md:pt-[100px] mx-auto mt-10 cursor-pointer'
				/>
			</a>
		</div>
	);
};

export default Header;
