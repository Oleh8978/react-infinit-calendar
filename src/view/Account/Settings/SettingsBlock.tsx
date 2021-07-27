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
import { IAuthState } from '@app/controller/auth/model';
import { ISetting } from './Models';

interface IProps {
  data: ISetting;
  isAboutPage?: boolean;
  version?: string;
  name?: string;
  isCanSendEmail: boolean;
  isCanSendSMS: boolean;
  user: IAuthState;
}

const SettingsBlock: React.FC<IProps> = ({ ...props }) => {
  const [mail, setMail] = useState<boolean>(props.isCanSendEmail);
  const [sms, setSms] = useState<boolean>(props.isCanSendSMS);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (
  //     props.isCanSendEmail !== undefined &&
  //     props.isCanSendSMS !== undefined
  //   ) {
  //     setMail(props.isCanSendEmail);
  //     setSms(props.isCanSendSMS);
  //   }
  // }, []);

  const authStateUpdater = (auThMail?: boolean, auThSms?: boolean) => {
    dispatch(
      signIn.success({
        error: props.user.error,
        accessToken: props.user.accessToken,
        refreshToken: props.user.accessToken,
        user: {
          createdAt: props.user.user.createdAt,
          id: props.user.user.id,
          isCanSendEmail: auThMail !== undefined ? auThMail : mail,
          isCanSendSMS: auThSms !== undefined ? auThSms : sms,
          isNeedSecondStep: props.user.user.isNeedSecondStep,
          userData: props.user.user.userData,
          userAuthorizations: props.user.user.userAuthorizations,
        },
        isAuthenticated: props.user.isAuthenticated,
        state: props.user.state,
        deviceCredentials: props.user.deviceCredentials,
      }),
    );
  };

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
      authStateUpdater(undefined, !sms);
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
      authStateUpdater(!mail, undefined);
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
