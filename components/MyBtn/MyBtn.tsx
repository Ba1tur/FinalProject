import React from 'react';
import s from './MyBtn.module.scss'


type Props = {
	children: React.ReactNode;
 };


const MyBtn = ({children, ...props} : Props) => {
	return (
		<button {...props} className={s.mybtn}>
			{children}
		</button>
	);
};

export default MyBtn;