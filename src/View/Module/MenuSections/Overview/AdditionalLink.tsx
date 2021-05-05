import React, { useState } from 'react';

interface IProps {
  img: string;
  isCodeExist: boolean;
  campCode?: string;
  header: string;
  textDiscount?: string;
  text?: string;
}

const AdditionalLink: React.FC<IProps> = ({ ...props }) => {
  return (
    <>
      <div className="overview-additional-link">
        <div className="overview-additional-link__regular">
          <img src={props.img} className="overview-body-img__code" alt="img" />
          <div className="overview-additional-link__regular-textwrapper">
            <span className="overview-additional-link__regular-header">
              {props.header}
            </span>
            {props.isCodeExist ? (
              <span className="overview-additional-link__regular-text">
                Discount code:{' '}
                <strong style={{ textTransform: 'uppercase' }}>
                  {props.campCode}
                </strong>{' '}
                {props.textDiscount}
              </span>
            ) : (
              <span className="overview-additional-link__regular-text">
                {props.text}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalLink;
