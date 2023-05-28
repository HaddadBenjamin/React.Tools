import React, { FC } from 'react';

interface Props
{
  link: string
  className?: string
}

const ExternalLink : FC<Props> = ({ link, className, children }) => (
  <a href={link} style={{ cursor: 'pointer' }} className={className} rel='noreferrer' target='_blank'>
    {children}
  </a>
);

export default ExternalLink;
