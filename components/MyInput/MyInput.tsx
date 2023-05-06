import React from 'react';
import s from './MyInput.module.scss'

const MyInput = ({...props}) => {
	return (
		<input className={s.myinput}  {...props}/>
	);
};

export default MyInput;