import * as yup from 'yup';


// Base schema with common fields
const baseUserSchema = yup.object({
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export const userSignupSchema = baseUserSchema.shape({
    name: yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
});

export const userLoginSchema = baseUserSchema;
