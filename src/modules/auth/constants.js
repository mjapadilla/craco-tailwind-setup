import * as yup from "yup";

const rootConst = "AUTH";

export const AUTHENTICATION = `${rootConst}/AUTHENTICATION`;
export const LOGIN = `${rootConst}/LOGIN`;

export const schema = yup.object({
  mobile_number: yup.string().required("Mobile number is required."),
  password: yup.string().required("Password is required."),
});
