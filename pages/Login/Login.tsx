import React from 'react';
import s from './Login.module.scss'
import MyInput from '@/components/MyInput/MyInput';

const Login = () => {
	return (
		<section className={s.login_section}>
			<div className={s.login_section__block}>
				<h1>Авторизация</h1>
				<div>
					<MyInput/>
				</div>
				<div>
					<MyInput/>
				</div>
			</div>
		</section>
	);
};

export default Login;