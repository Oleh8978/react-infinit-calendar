import * as yup from 'yup';
import { MINIMUM_WITHDRAW_CREDIT } from '../../constants/constants';

export const nameValidator = yup
  .string()
  .min(1, ({ min }) => `Name must be at least ${min} characters`)
  .matches(/^[^@$%+^?{}*<>\d[\]]+$/g, 'Contains an invalid character')
  .required('Name is required');

export const familyNameValidator = yup
  .string()
  .min(1, ({ min }) => `Last name must be at least ${min} characters`)
  .matches(/^[^@$%+^?{}*<>\d[\]]+$/g, 'Contains an invalid character')
  .required('Last Name is required');

export const phoneNumberValidator = yup
  .string()
  .matches(/^\+?\d+$/g, 'Contains an invalid character')
  .min(8, ({ min }) => `Phone number must be at least ${min} characters`)
  .required('Phone Number is required');

export const streetValidator = yup
  .string()
  .matches(/^[^@$%+^?{}*<>[\]]+$/g, 'Contains an invalid character')
  .min(1, ({ min }) => `Street Address must be at least ${min} characters`)
  .required('Street Address is required'); // Check if string contains invalid characters like @,$,% ...

export const cityValidator = yup
  .string()
  .min(1, ({ min }) => `City must be at least ${min} characters`)
  .matches(/^[^@$%+^?{}*<>\d[\]]+$/g, 'Contains an invalid character')
  .required('City is required'); // Check if string contains invalid characters like @,$,% ...

export const postalCodeValidator = yup
  .string()
  .min(5, ({ min }) => `Postal code must be at least ${min} characters`)
  .max(5, ({ max }) => `Postal code must be at not more ${max} characters`)
  .required('Postal Code is required');

export const taxNumberValidator = yup
  .string()
  .min(9, ({ min }) => `Tax ID Number must be ${min} characters`)
  .max(9, ({ max }) => `Tax ID Number must be ${max} characters`)
  .required('Tax ID Number is required');

export const emailValidator = yup
  .string()
  .matches(/^[^.].*@.+\..+$/, 'Invalid email address')
  .required('Email Address is Required');

export const passwordValidator = yup
  .string()
  .min(8, ({ min }) => `Password must be at least ${min} characters`)
  .matches(
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/g,
    'Must include: a number, a small letter, a capital letter',
  )
  .required('Password is required'); // one number, one small letter, one capital letter, 8 symbols

export const verificationCode = yup
  .string()
  .min(3, ({ min }) => `Verification Code must be at least ${min} characters`)
  .required('Verification Code is required');

export const withdrawCreditAmountValidator = yup
  .number()
  .positive()
  .min(MINIMUM_WITHDRAW_CREDIT, ({ min }) => `Amount must be at least ${min}`)
  .required('Amount is required');

export const amountValidator = yup
  .number()
  .positive()
  .required('Amount is required!');
