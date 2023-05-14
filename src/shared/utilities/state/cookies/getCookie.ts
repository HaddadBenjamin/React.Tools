const getCookie = (key : string) : string | undefined => {
  const cookieValue = document.cookie.split('; ').find((c) => c.startsWith(`${key}=`))?.split('=')[1];

  return cookieValue ? decodeURIComponent(cookieValue) : undefined;
};

export default getCookie;
