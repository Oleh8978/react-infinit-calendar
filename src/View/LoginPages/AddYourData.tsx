import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

// components
import BodyEdditProfile from '../Account/EditProfile/BodyEdditProfile';
import NavigationBarFirstPage from 'Component/NavBarFirstPage';

interface IProps {}

const AddYourData: React.FC<IProps> = ({ ...props }) => {
  return (
    <>
      <div className={'main-layout'}>
        <div className="wrap-main">
          <Scrollbars
            style={{
              width: '100%',
              minWidth: '100%',
              maxWidth: 639,
              height: '100%',
              maxHeight: '100%',
              display: 'flex',
            }}
            renderView={(props) => (
              <div {...props} className={'main-wrapper'}></div>
            )}>
            <NavigationBarFirstPage />
            <div className="add-yuor-data-imgwrapper">
                <img className="add-yuor-data-imgwrapper-img" alt="img" src={''} />
            </div>
            <BodyEdditProfile isFirstpage={true} />
          </Scrollbars>
        </div>
      </div>
    </>
  );
};

export default AddYourData;
