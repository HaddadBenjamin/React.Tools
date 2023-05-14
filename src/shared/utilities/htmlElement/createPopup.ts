/* eslint-disable no-tabs,no-mixed-spaces-and-tabs */
import { MutableRefObject, useEffect, useRef } from 'react';

interface ICreatePopup {
	url: string,
	popup : {
		title?: string,
		width?: number,
		height?: number,
		centered?: boolean
	}
}

const createPopup = (
  {
    url,
    popup: {
      title = 'OAuth Popup',
      width = 600,
      height = 600,
      centered = true,
    },
  } : ICreatePopup) : Window | null => {
  const top = !centered ? 0 : window.outerHeight / 2 + window.screenY - height / 2;
  const left = !centered ? 0 : window.outerWidth / 2 + window.screenX - width / 2;

  return window.open(url, title, `height=${height},width=${width},top=${top},left=${left}`);
};

export default createPopup;

interface IListenPopupUrl {
	popup: Window | null,
	onPopupUrlChange : (url: string, intervalRef: MutableRefObject<number | undefined>) => void
}

export const useListenPopupUrl = ({ onPopupUrlChange, popup } : IListenPopupUrl) : void => {
  const intervalRef = useRef<number>();

  useEffect(() => {
    if (popup) {
      intervalRef.current = window.setInterval(() => {
        // eslint-disable-next-line no-empty
        try { onPopupUrlChange(popup.location.href, intervalRef); } catch (e) { }
      }, 700);
    }
  }, [popup]);
};

// Cross window communication :
// // Main application - http://blabla:8080 :
// const popupUrl = 'http://blabla:5443?blabla=2';
// const popupOrigin = (new URL(popupUrl)).origin;
// const popup = window.open(popupUrl);
// popup?.opener.addEventListener('message', ({ origin, data: message }) => {
// 	if (origin === popupOrigin && message === 'INSCRIPTION_REDIRECT') {
// 		popup.close();
// 		navigate(URL_INSCRIPTION);
// 	}
// });

// // Popup application - http://blabla:5443 :
// onClick = () => {
// 	const mainApplicationOrigin = 'http://blabla:8080'; // vous pouvez récupérer l'origine en l'envoyant en query parameter.
// 	window.opener.postMessage('INSCRIPTION_REDIRECT', mainApplicationOrigin);
// };
// Main application - http://blabla:8080 :
