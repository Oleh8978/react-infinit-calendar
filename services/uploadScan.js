import getAccessToken from './cognito/getAccessToken';
import { SERVER_URL } from '../constants/constants';

export default async (uploadedDocuments, type, content) => {
  try {
    const body = new FormData();
    body.append('front_file', uploadedDocuments.front);
    if (Object.prototype.hasOwnProperty.call(uploadedDocuments, 'back')) {
      body.append('back_file', uploadedDocuments.back);
    }
    if (type === 'other') {
      body.append('other-type', uploadedDocuments['other-type']);
      Object.keys(content).forEach((value) => {
        body.append(value, content[value]);
      });
    }
    body.append('document-country', 'US');

    const res = await fetch(
      `https://${SERVER_URL}/api?command=uploadScan&type=${type}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
          'Content-Type': 'multipart/form-data;',
        },
        body,
      },
    );
    console.log('uploadScan');
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  } catch (e) {
    throw new Error(e);
  }
};
