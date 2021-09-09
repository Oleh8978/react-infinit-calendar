import React, { useEffect, useState } from 'react';
import ReactGoogleLogin from 'react-google-login';

// Components
import GoogleIcon from '@app/component/icon/GoogleIcon';

// Interfaces
import { ISignedData } from '@app/controller/auth/model';

// Config
import { googleClientId } from '@app/config';

type Props = {
  signIn: (state: ISignedData, type: string) => void;
};

// const GoogleLoginComponent: React.FC<Props> = ({ signIn }) => {
//   const onResponse = (response: any) => {
//     console.log('response: ', response);
//     let signedData: ISignedData = { type: 'google' };
//     if (!response.error) {
//       if (response.profileObj) {
//         const { email, familyName, givenName, imageUrl, googleId } =
//           response.profileObj;
//         signedData = {
//           id: googleId,
//           firstName: givenName,
//           lastName: familyName,
//           image: imageUrl,
//           email: email,
//           type: signedData.type,
//           accessToken: response.accessToken,
//         };
//       }
//       signIn(signedData, 'google');
//     }
//   };

//   return (
//     <ReactGoogleLogin
//       clientId={googleClientId}
//       render={(renderProps) => (
//         <button
//           className="auth__google-button"
//           disabled={renderProps.disabled}
//           onClick={renderProps.onClick}>
//           <GoogleIcon />
//           <span className={'auth__google-button-txt'}>
//             Continue with Google
//           </span>
//         </button>
//       )}
//       buttonText="Login"
//       onSuccess={onResponse}
//       onFailure={onResponse}
//       cookiePolicy={'single_host_origin'}
//     />
//   );
// };

// export default GoogleLoginComponent;

const GoogleLoginComponent: React.FC<Props> = ({ signIn }) => {
  const [signedInData, setSignedInData] = useState({});
  const [firstName, setFirstName] = useState<string>('');

  useEffect(() => {
    const windowData: any = window;

    if (windowData && windowData.gapi) {
      let data;
      windowData.gapi.load('auth2', () => {
        // console.log('init start ')
        /* eslint-disable */
        //@ts-ignore
        const auth2 = gapi.auth2.init({
          client_id:googleClientId,
          // none
          cookiepolicy: 'single_host_origin',
        });
        data = auth2

        if (auth2.currentUser.get().ya !== null) {
          setFirstName(auth2.currentUser.get().ya)
        }

        function attachSignin(element) {
          //@ts-ignore
          if (element !== null ) {
            auth2.attachClickHandler(element, {}, onSuccess, onFailure);
          }
        }
        attachSignin(document.getElementById('loginButton'));
        console.log(auth2.isSignedIn)
        auth2.then(() => {
          // console.log('then @@@', (auth2.currentUser.get()))
          if (Object.keys(auth2.currentUser.get().length !== 0) && auth2.currentUser.get().ya !== null) {
            console.log(auth2.currentUser.get())
            setSignedInData({
              id: auth2.currentUser.get().ya,
              firstName: auth2.currentUser.get().Rs.mU,
              lastName: auth2.currentUser.get().Rs.mS,
              image: auth2.currentUser.get().Rs.$I,
              email: auth2.currentUser.get().Rs.Ct,
              type: auth2.currentUser.get().Zb.idpId,
              accessToken: auth2.currentUser.get().Zb.access_token,
            })
    
            signIn({
                id: auth2.currentUser.get().ya,
                firstName: auth2.currentUser.get().Rs.mU,
                lastName: auth2.currentUser.get().Rs.mS,
                image: auth2.currentUser.get().Rs.$I,
                email: auth2.currentUser.get().Rs.Ct,
                type: auth2.currentUser.get().Zb.idpId,
                accessToken: auth2.currentUser.get().Zb.access_token,
              }, 'google')
          }
        });
      });
  
    }

  }, [firstName]);

  const onSuccess = (user) => {
    // console.log('success', user);
    signIn({
      id: user.getBasicProfile().$I,
      firstName: user.getBasicProfile().mU,
      lastName: user.getBasicProfile().mS,
      image: user.getBasicProfile().$I,
      email: user.getBasicProfile().Ct,
      type: 'google',
      accessToken: user.ya,
    }, 'google')
  };

  const onFailure = (err) => {
    console.log('failed', err);
  };

  return (
    <>
      <div
        className="auth__google-button"
        id={'loginButton'}>
        <GoogleIcon />
        <span className={'auth__google-button-txt'}>Continue with Google</span>
      </div>
    </>
  );
};
export default GoogleLoginComponent;
