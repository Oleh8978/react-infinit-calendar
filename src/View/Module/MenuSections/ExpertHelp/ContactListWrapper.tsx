import React, { useState, useEffect } from 'react';
import { data } from 'View/Schedule/fakeData/fakedata';

// components
import ContactListItem from "./ContactListItem";

// interfaces
import { IContact } from './Models';

interface IProps {
  data: IContact[];
}

const ContactList: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className={'expert-help-main-body-wrapper'}>
      {props.data.map((item) => {
        return <ContactListItem data={item} key={item.id}/>
      })}
    </div>
  );
};

export default ContactList;