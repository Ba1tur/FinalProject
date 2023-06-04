import React, { InputHTMLAttributes, forwardRef } from 'react';
import PropTypes from 'prop-types';
import s from './MyInput.module.scss';

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const MyInput = forwardRef<HTMLInputElement, MyInputProps>(({ className, ...props }, ref) => {
  return <input className={`${s.myinput} ${className}`} ref={ref} {...props} />;
});

MyInput.propTypes = {
  className: PropTypes.string,
};

export default MyInput;
