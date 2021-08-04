import React, { CSSProperties } from 'react';
import { connect } from "react-redux";
import { Link, generatePath } from 'react-router-dom';

import schema, { Pages } from './schema';

//actions
import { IHistoryState, IHistoryStep } from "@app/controller/historyReducer/models";
import { pushHistoryState, popHistoryState, setHistoryState } from "@app/controller/historyReducer/actions";

//interfaces
import { IStore } from '@app/controller/model';

interface ILinkProps {
  to: Pages;
  params?: {
    id?: string;
    orderNumber?: string;
    tabName?: string;
    slug?: string;
  };
  className?: string;
  onClick?: () => void;
  query?: string;
  children?: any;
  style?: CSSProperties;
  backFlag?: boolean,
  popHistory: () => void,
  historyState: IHistoryState,
  additionalParameter?: string,
  pushHistory: (historyStep: IHistoryStep) => void,
  setHistory: (historyStep: IHistoryStep) => void,
}

export const InternalLink: React.FC<ILinkProps> = ({
  to,
  params,
  children,
  className,
  onClick,
  query,
  style,
  popHistory, 
  pushHistory, 
  setHistory, 
  historyState,
  additionalParameter,
  backFlag
}) => {
  let id, slug, orderNumber, tabName;

  if (params) {
    id = params.id;
    slug = params.slug;
    orderNumber = params.orderNumber;
    tabName = params.tabName;
  }

  let link: string =
    id || orderNumber || slug
      ? generatePath(schema.getLink(to), {
          id,
          orderNumber,
          slug,
          tabName,
        })
      : schema.getLink(to) || '/error';

      if (backFlag) {
        if (historyState.length) {
          const prev: IHistoryStep = historyState[historyState.length - 2];
          if (prev) {
            link = prev.link;
          }
        }
      }
  if (query) {
    link = link + '?' + query;
  }

  const onClickFunction: () => void = () => {
    if (typeof onClick === 'function') {
      onClick();
    }
    if (backFlag) {
      popHistory()
    } else {
      pushHistory({
        link,
        name: to,
        additionalParameter
      })
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
// export default InternalLink;

export default connect(
  (state: IStore) =>
    ({
      historyState: state.historyState
    }),
  {
    pushHistory: pushHistoryState,
    popHistory: popHistoryState,
    setHistory: setHistoryState,
  }
)(InternalLink)
