import React, {
  FC,
  useEffect,
} from 'react';

interface Props
{
  anchor : string,
  text : string,
  offsetY? : number,
  className? : string,
  scrollOnMount?: boolean
}

// Redirige vers une ancre de façon fluide.
const AnchorLink : FC<Props> = ({
  anchor,
  text,
  offsetY = 0,
  className,
  scrollOnMount,
}) => {
  const getTargetPositionY = () : number | null => {
    if (!document || !window) return null;

    const targetHtmlElement = document.getElementById(anchor);

    if (!targetHtmlElement) return null;

    return targetHtmlElement.getBoundingClientRect().top + window.pageYOffset + offsetY;
  };

  const onClick = (event? : React.MouseEvent<HTMLAnchorElement>) : void => {
    event?.preventDefault();

    const newTargetPositionY = getTargetPositionY();

    if (!newTargetPositionY) return;

    window.scrollTo({ top: newTargetPositionY, behavior: 'smooth' });
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (scrollOnMount) {
      const timeOutId = setTimeout(() => onClick(), 3000); // 3 secondes correspond au temps théorique pour que la page se charge

      return () => clearTimeout(timeOutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollOnMount]);

  return (
    <a
      href={`#${anchor}`}
      className={className}
      onClick={onClick}
    >
      {text}
    </a>
  );
};

export default AnchorLink;
