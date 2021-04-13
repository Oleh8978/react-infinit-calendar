import React, { CSSProperties } from 'react';
import { Link, generatePath } from 'react-router-dom';

import schema, { Pages } from './schema';

interface ILinkProps {
  to: Pages,
  id?: string,
  orderNumber?: string,
  className?: string,
  slug?: string,
  onClick?: () => void,
  backFlag?: boolean,
  query?: string,
  additionalParameter?: string,
  children?: any,
  style?: CSSProperties
}

export const InternalLink: React.FC<ILinkProps> = ({ to, id, slug, orderNumber, children, className, onClick, query, style}) => {

  let link: string = id || orderNumber || slug ? generatePath(schema.getLink(to), {
    id,
    orderNumber,
    slug,
  }) : schema.getLink(to) || '/error';

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
      style={style}
    >
      {children}
    </Link>
  );
};
export default InternalLink;