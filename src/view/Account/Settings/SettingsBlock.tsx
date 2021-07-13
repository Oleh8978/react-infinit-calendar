import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

// components
import Arrow from './ButtonTypes/Arrow';
import Toogle from './ButtonTypes/Toogle';
import Link from '@app/routing/Link';

// actions
import { patchNotificationAction } from '@app/controller/notifications/actions';
import { loginByTokenAction, signIn } from '@app/controller/auth/actions';

// utils functions
import { getSavedAccess } from '@app/utils/manageAccess';

// interfaces
import { IStore } from '@app/controller/model';
import { ISetting } from './Models';

interface IProps {
  data: ISetting;
  isAboutPage?: boolean;
  version?: string;
  name?: string;
  isCanSendEmail: boolean;
  isCanSendSMS: boolean;
}

const SettingsBlock: React.FC<any> = ({ ...props }) => {
  const [mail, setMail] = useState<boolean>(false);
  const [sms, setSms] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.isCanSendEmail === undefined) {
      dispatch(loginByTokenAction(getSavedAccess()));
    }

    if (
      props.isCanSendEmail !== undefined &&
      props.isCanSendSMS !== undefined
    ) {
      setMail(props.isCanSendEmail);
      setSms(props.isCanSendSMS);
    }
  }, []);

  const functionality = (name: string) => {
    if (name === 'sms') {
      dispatch(
        patchNotificationAction.request({
          notifications: {
            isCanSendEmail: mail,
            isCanSendSMS: !sms,
          },
          accessToken: getSavedAccess().accessToken,
        }),
      );
      setSms(!sms);
    } else {
      dispatch(
        patchNotificationAction.request({
          notifications: {
            isCanSendEmail: !mail,
            isCanSendSMS: sms,
          },
          accessToken: getSavedAccess().accessToken,
        }),
      );
      setMail(!mail);
    }
  };

  const typeOfButton = (item: string, subname?: string) => {
    let elem = <> </>;
    if (
      item === 'toogle' &&
      props.isCanSendEmail !== undefined &&
      props.isCanSendSMS !== undefined
    ) {
      elem = (
        <Toogle
          subname={subname}
          functionality={functionality}
          isWorking={
            subname === 'sms' ? props.isCanSendSMS : props.isCanSendEmail
          }
        />
      );
    } else if (item === 'next') {
      elem = <Arrow />;
    } else {
      elem = <> </>;
    }
    return elem;
  };
  return (
    <div className={'block'}>
      <>
        {props.isAboutPage ? (
          <> </>
        ) : (
          <div className={'block-header'}>
            <img
              src={props.data.icon}
              className={'block-header-img'}
              alt="img"
            />
            <span className={'block-header-text'}>{props.data.name}</span>
          </div>
        )}
      </>
      <div className={'block-body'}>
        <>
          {props.isAboutPage ? (
            <div className={'block-body-item-wrapper'}>
              <span className={'block-body-item-wrapper-text about-text'}>
                {props.name}
              </span>
              <span className={'block-body-item-wrapper-text rightaligner'}>
                {props.version}
              </span>
            </div>
          ) : (
            <> </>
          )}
        </>
        {props.data.items.map((item) => {
          return (
            <>
              {item.link ? (
                <Link className={'block-body-item-wrapper'} to={item.link}>
                  <span
                    className={'block-body-item-wrapper-text'}
                    style={{ color: item.button ? '#373737' : '#8179DC' }}>
                    {item.name}
                  </span>
                  {typeOfButton(item.button)}
                </Link>
              ) : (
                <div className={'block-body-item-wrapper'}>
                  <span
                    className={'block-body-item-wrapper-text'}
                    style={{ color: item.button ? '#373737' : '#8179DC' }}>
                    {item.name}
                  </span>
                  {typeOfButton(item.button, item.subname)}
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

// export default SettingsBlock;

export default connect(
  (state: IStore) => ({
    isCanSendEmail: state.authState.user.isCanSendEmail,
    isCanSendSMS: state.authState.user.isCanSendSMS,
    user: state.authState,
  }),
  { patchNotificationAction, loginByTokenAction, signIn },
)(SettingsBlock);
