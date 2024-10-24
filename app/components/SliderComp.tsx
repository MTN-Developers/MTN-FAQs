'use client';

import React, { useState, useEffect } from 'react';
import { CourseFaq } from '../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import { HiOutlineArrowRightCircle, HiOutlineArrowLeftCircle } from 'react-icons/hi2';
import { useGetSearchResultQuery } from '../store/apiSlice';
import { useAppDispatch } from '../store';
import { setSelectedLetter } from '../store/slices/alphabetSlice';
import Loader from './ui/Loader';

interface SliderCompProps {
	globalFaqs: CourseFaq[];
	onSelectOrgan: (organ: string) => void;
	courseId: string;
	selectedOrganFromSlider: string;
	setFaqsData: React.Dispatch<React.SetStateAction<CourseFaq[]>>;
}

const SliderComp: React.FC<SliderCompProps> = ({
	globalFaqs,
	onSelectOrgan,
	setFaqsData,
	courseId,
	selectedOrganFromSlider,
}) => {
	const [selectedOrgan, setSelectedOrgan] = useState<string>('');
	const prevRef = React.useRef<HTMLButtonElement | null>(null);
	const nextRef = React.useRef<HTMLButtonElement | null>(null);

	const dispatch = useAppDispatch();

	// Extract unique organ names from globalFaqs
	const organs = Array.from(new Set(globalFaqs?.map((faq) => faq.title) || []));

	const {
		data: searchResults,
		isLoading,
		isFetching,
	} = useGetSearchResultQuery(
		{
			courseId,
			keyword: selectedOrgan,
		},
		{
			skip: !selectedOrgan,
		}
	);

	useEffect(() => {
		if (searchResults) {
			setFaqsData(searchResults);
		}
	}, [searchResults, setFaqsData]);

	const handleClick = (organ: string) => {
		dispatch(setSelectedLetter(''));
		setSelectedOrgan(organ);
		onSelectOrgan(organ);
	};

	return (
		<>
			{(isFetching || isLoading) && <Loader />}
			<div
				dir='rtl'
				className='relative flex items-center mt-[45px] md:mt-[48px] w-[310px] md:w-[650px] lg:w-[1180px]'
			>
				{/* Left Arrow */}
				<div className='hidden md:block md:absolute -left-14 z-10'>
					<button
						ref={nextRef}
						className='p-2'
					>
						<HiOutlineArrowLeftCircle size={24} />
					</button>
				</div>

				{/* Swiper */}
				<Swiper
					modules={[Navigation]}
					navigation={{
						prevEl: prevRef.current,
						nextEl: nextRef.current,
					}}
					onBeforeInit={(swiper) => {
						if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
							swiper.params.navigation.prevEl = prevRef.current;
							swiper.params.navigation.nextEl = nextRef.current;
						}
					}}
					spaceBetween={5}
					slidesPerView='auto'
					className='flex items-center'
				>
					{/* Dynamically generate SwiperSlides from organs array */}
					{organs.map((organ, index) => (
						<SwiperSlide
							key={index}
							className='!w-auto'
						>
							<div
								onClick={() => handleClick(organ)}
								className={`hover:bg-[#00204c] hover:text-white mx-[8px] cursor-pointer transition duration-300 flex flex-col justify-center items-center border border-gray-400 bg-white shadow-md px-12 py-4 rounded-[14px] ${
									selectedOrgan === organ && selectedOrganFromSlider === organ
										? '!bg-[#00203c] !text-white'
										: 'text-gray-500'
								}`}
							>
								{organ}
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				{/* Right Arrow */}
				<div className='hidden md:block md:absolute -right-14 z-10'>
					<button
						ref={prevRef}
						className='p-2'
					>
						<HiOutlineArrowRightCircle size={24} />
					</button>
				</div>
			</div>
		</>
	);
};

export default SliderComp;
