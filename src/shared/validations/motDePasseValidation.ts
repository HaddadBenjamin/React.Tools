import * as yup from 'yup';

const motDePasseValidation = yup
  .string()
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    'Le format du mot de passe ne correspond pas aux critères attendus',
  )
  .required(' ');

export default motDePasseValidation;
