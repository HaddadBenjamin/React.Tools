// Content-Type : 'multipart/form-data'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const multipartFormData = (object : any) : FormData => {
  const formData = new FormData();

  Object.keys(object).forEach((key) => formData.append(key, object[key]));

  return formData;
};

export default multipartFormData;
