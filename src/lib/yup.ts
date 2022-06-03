import { number, object, string } from 'yup';
export const yupSchema = object({
	name: string().required(),
	email: string().required(),
	phone: number(),
	address: string().required(),
	typesOfWaste: string(),
});
