import React, { useState } from 'react';
import NavigationBar from './NavigationBar';

interface IProps {
}

const Terms: React.FC<IProps> = ({ ...props }) => {

  const checkIFMyCompExists = () => !!document.querySelector('.main-layout');

  const [elementExists, setElementExist] = useState(!checkIFMyCompExists());

  return (
    <div className={'terms-page'}>
      <NavigationBar name={'Terms of Use'} rout={elementExists ? '/' : '/about'} />
      <div className='terms-body'>
        <h1>Privacy Policy</h1>
        <span className={'updated-time'}>Last updated [month day, year]</span>
        <h2>INTRODUCTION</h2>
        <p>This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our
          website [name of website.com] [and our mobile application], including any other media form, media channel,
          mobile website, or mobile application related or connected thereto (collectively, the “Site”).</p>
        <h2>COLLECTION OF YOUR INFORMATION</h2>
        <p>We may collect information about you in a variety of ways. The information we may collect on the Site
          includes:</p>
        <h3>Personal Data</h3>
        <p>Personally identifiable information, such as your name, shipping address, email address, and telephone
          number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily
          give to us .</p>
        <h3>Derivative Data</h3>
        <p>Information our servers automatically collect when you access the Site, such as your IP address, your browser
          type, your operating system, your access times, and the pages you have viewed directly before and after
          accessing the Site.</p>
        <ul>
          <li>
            <p>This list can even become the foundation of a budget if you don’t already have one.</p>
          </li>
          <li>
            <p>This list can even become the foundation of a budget if you don’t already have one.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Terms;
