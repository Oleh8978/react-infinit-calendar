import React, { useEffect, useState } from 'react';

// components
import { Link } from 'react-router-dom';

// interfaces
import { IListItem, IItem } from './Models';

interface IProps {
  data: IListItem;
}

const isLessThanten = (date: number): string => {
  if (date < 10) {
    return '0' + date;
  } else {
    return date + '';
  }
};

const dateConvertor = (date: string) => {
  return (
    isLessThanten(new Date(date).getMonth() + 1) +
    '/' +
    isLessThanten(new Date(date).getDate()) +
    '/' +
    new Date(date).getFullYear()
  );
};

const NotesListItem: React.FC<IProps> = ({ ...props }) => {
  const listFunc = (list: IItem[]) => {
    return (
      <ul className="notes-list-wrapper">
        {list.map((item) => {
          return <li className="notes-list-wrapper-item">{item.text}</li>;
        })}
      </ul>
    );
  };

  return (
    <Link
      className={'notes-list-item'}
      to={(location) => ({
        ...location,
        pathname: `/note-details/${props.data.id}`,
      })}>
      <div className={'notes-list-item__left'}>
        <span className={'notes-list-item__left-headtop'}>
          {props.data.title}
        </span>
        <span className={'notes-list-item__left-subhead'}>
          {props.data.subtitle}
        </span>
        <div className={'notes-list-item__left-body'}>
          {props.data.list ? (
            listFunc(props.data.list)
          ) : (
            <span className="notes-list-item__left-body-text">
              {props.data.text}
            </span>
          )}
        </div>
      </div>
      <div className={'notes-list-item__right'}>
        <span className={'notes-list-item__right-text'}>
          {dateConvertor(props.data.data)}
        </span>
      </div>
    </Link>
  );
};

export default NotesListItem;
