import React from 'react';
import s from './Main.module.scss'
import Image from 'next/image';
import mainImg from '../../public/Hero.png'

const Main = () => {
	return (
		<main className={s.main_section}>
			<div className={s.main_section__block}>
				<div className={s.main_section__block__about}>
					{/* <Image src={mainImg} alt='mainPng_img'/> */}
				</div>
			</div>
		</main>
	);
};

export default Main;