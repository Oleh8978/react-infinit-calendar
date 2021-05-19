import React, { useState, useEffect } from 'react';

// components
import Mail from './Icons/Mail';
import Phone from './Icons/Phone';

// hardcoded
import { data } from 'View/Schedule/fakeData/fakedata';

// interfaces
import { IContact } from './Models';

interface IProps {
  data: IContact;
}

const ContactListItem: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className={'expert-help-main-body-wrapper-item'}>
      <div className="expert-help-main-body-wrapper-item-img">img</div>
      <div className="expert-help-main-body-wrapper-item-txtwrapper">
        {props.data.elements.map((item) => {
          return (
            <span
              className="expert-help-main-body-wrapper-item-txtwrapper-text"
              key={item.id}>
              {item.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default ContactListItem;
