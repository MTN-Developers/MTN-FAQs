import React from 'react';

const Loader: React.FC = () => (
	<div className='w-screen flex items-center justify-center h-screen fixed top-0 left-0 z-50 bg-black bg-opacity-60'>
		<span className='loader'></span>
	</div>
);

export default Loader;
