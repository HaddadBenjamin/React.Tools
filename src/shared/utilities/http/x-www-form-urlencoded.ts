// Content-Type : 'application/x-www-form-urlencoded'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const XWwwFormUrlencoded = (object : any) : URLSearchParams => {
  const urlSearchParams = new URLSearchParams();

  Object.keys(object).forEach((key) => urlSearchParams.append(key, object[key]));

  return urlSearchParams;
};

export default XWwwFormUrlencoded;
