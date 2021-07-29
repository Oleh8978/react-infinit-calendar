import React, { useState, useEffect } from 'react';
import { data } from '@app/view/Schedule/fakeData/fakedata';

// interfaces
import { IContact } from './Models';
import { ExpertDTO } from '@ternala/frasier-types';

interface IProps {
  data: ExpertDTO;
}

const ContactList: React.FC<IProps> = ({ ...props }) => {
  const expertName = () => {
    if (props.data.name !== undefined) {
      return (
        <span className="expert-help-main-body-header-text__bottom">
          {props.data.name}
        </span>
      );
    }
    return <></>;
  };

  const image = (name: string, text?: string) => {
    if (name === 'email') {
      return (
        <svg
          width="16px"
          height="16px"
          viewBox="0 0 16 16"
          display="flex"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0)">
            <path
              d="M15.2423 2.42871H0.756592L7.99945 8.3946L15.3242 2.44543C15.2974 2.43759 15.27 2.43201 15.2423 2.42871Z"
              fill="white"
            />
            <path
              d="M8.35124 9.54674C8.14597 9.71483 7.85063 9.71483 7.64536 9.54674L0.199707 3.4126V13.0144C0.199707 13.3221 0.449148 13.5715 0.75686 13.5715H15.2426C15.5503 13.5715 15.7997 13.3221 15.7997 13.0144V3.49506L8.35124 9.54674Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect
                width="15.6"
                height="15.6"
                fill="white"
                transform="translate(0.199707 0.200195)"
              />
            </clipPath>
          </defs>
        </svg>
      );
    }

    if (name === 'phone') {
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0)">
            <path
              d="M13.6189 10.2746L11.6652 8.32084C10.9674 7.62308 9.7812 7.90221 9.50209 8.80928C9.29276 9.4373 8.595 9.78618 7.96701 9.6466C6.57148 9.29772 4.68752 7.48353 4.33863 6.01822C4.1293 5.39021 4.54796 4.69244 5.17595 4.48314C6.08305 4.20403 6.36215 3.01783 5.66439 2.32007L3.71064 0.366327C3.15243 -0.122109 2.31511 -0.122109 1.82668 0.366327L0.500926 1.69208C-0.824828 3.08761 0.640479 6.78576 3.91997 10.0653C7.19947 13.3448 10.8976 14.8799 12.2932 13.4843L13.6189 12.1586C14.1074 11.6003 14.1074 10.763 13.6189 10.2746Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="14" height="14" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    }

    if (name === 'name') {
      return (
        <span className={'expert-highlighted'}>{text[0].toUpperCase()}</span>
      );
    }
  };

  const data = (data: string) => {
    if (data === 'email') {
      return (
        <>
          {props.data.emails.map((item) => {
            return (
              <span className={'expert-help-contact-body-right-text'}>
                <span className={'expert-text'}>{item}</span>
              </span>
            );
          })}
        </>
      );
    }

    if (data === 'phone') {
      return (
        <>
          {props.data.phones.map((item) => {
            return (
              <span className={'expert-help-contact-body-right-text'}>
                <span className={'expert-text'}>{item.phone}</span>
              </span>
            );
          })}
        </>
      );
    }

    if (data === 'name') {
      return (
        <>
          {props.data.links.map((item) => {
            return (
              <span className={'expert-help-contact-body-right-text'}>
                <span className={'expert-text'}>{item.title}</span>
                <span className={'expert-link'}>
                  <span
                    className={'expert-link-text'}
                    onClick={() => {
                      window.open(item.link, '_blank');
                    }}>
                    Open
                  </span>
                </span>
              </span>
            );
          })}
        </>
      );
    }
  };

  const contact = (name: string) => {
    if (props.data.id !== undefined) {
      return (
        <div className={'expert-help-contact-body'}>
          <div className={'expert-help-contact-body-wrapper'}>
            <div className={'expert-help-contact-body-left'}>
              <div className={'expert-help-contact-body-left-img'}>
                <>{image(name)}</>
              </div>
            </div>
            <div className={'expert-help-contact-body-right'}>{data(name)}</div>
          </div>
        </div>
      );
    }
    return <></>;
  };

  const linksRender = () => {
    for (let i = 0; i < props.data.links.length; i++) {
      // return <>{props.data.links[i].title}</>
      return (
        <div className={'expert-help-contact-body'}>
          <div
            className={'expert-help-contact-body-wrapper'}
            style={{ borderBottom: 'none' }}>
            <div className={'expert-help-contact-body-left'}>
              <div className={'expert-help-contact-body-left-img'}>
                <>{image('name', props.data.links[i].title)}</>
              </div>
            </div>
            <div className={'expert-help-contact-body-right'}>
              {data('name')}
            </div>
          </div>
        </div>
      );
    }
  };

  console.log('props.data ', props.data);
  return (
    <>
      {props.data ? (
        <>
          <div className={'expert-help-main-body-wrapper'}>{expertName()}</div>
          {contact('email')}
          {contact('phone')}
          {linksRender()}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ContactList;
