import React, { CSSProperties } from 'react';
import { Link, generatePath } from 'react-router-dom';

import schema, { Pages } from './schema';

interface ILinkProps {
  to: Pages;
  params?: {
    id?: string;
    orderNumber?: string;
    slug?: string;
  };
  className?: string;
  onClick?: () => void;
  query?: string;
  children?: any;
  style?: CSSProperties;
}

export const InternalLink: React.FC<ILinkProps> = ({
  to,
  params,
  children,
  className,
  onClick,
  query,
  style,
}) => {
  let id, slug, orderNumber;

  if(params){
    id = params.id
    slug = params.slug
    orderNumber = params.orderNumber
  }

  let link: string =
    id || orderNumber || slug
      ? generatePath(schema.getLink(to), {
          id,
          orderNumber,
          slug,
        })
      : schema.getLink(to) || '/error';

  if (query) {
    link = link + '?' + query;
  }

  const onClickFunction: () => void = () => {
    if (typeof onClick === 'function') {
      onClick();
    }
  };

  return (
    <Link
      to={link}
      className={className || ''}
      onClick={onClickFunction}
      style={style}>
      {children}
    </Link>
  );
};
export default InternalLink;
