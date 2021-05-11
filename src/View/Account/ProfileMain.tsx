import React, { useState, useEffect } from 'react';

// components
import Link from 'Routing/Link';

// static
import gear from './static/gear.png';

// fake data
import fakeFace from './static/fakeFace.png';

// interfaces
import { IName } from './Models';

interface IProps {}

const Profile: React.FC<IProps> = () => {
  const [name, setName] = useState<IName>({
    name: 'Jhon',
    surname: 'Pedersen',
  });

  return (
    <div className={'profile__top'}>
      <div className={'profile__top-img-wrapper'}>
        <img src={fakeFace} className={'profile-img'} alt="img" />
      </div>
      <div className={'profile__top-name'}>
        <span className={'profile__top-f-name'}>{name.name}</span>
        <span className={'profile__top-l-name'}>{name.surname}</span>
      </div>
      <div className={'profile__top-options'}>
        <Link to={'settings'}>
          <img src={gear} className={'profile__top-options-img'} alt="img" />
        </Link>
      </div>
    </div>
  );
};

export default Profile;
