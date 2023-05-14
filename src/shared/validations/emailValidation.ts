import * as yup from 'yup';

const emailValidation = yup
  .string()
  .email('Veuillez saisir une adresse e-mail valide.')
  .required(' ');

export default emailValidation;
