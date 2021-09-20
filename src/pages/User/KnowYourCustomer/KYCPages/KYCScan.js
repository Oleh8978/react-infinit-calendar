import React, {
  useState, useEffect, useReducer,
} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableWithoutFeedback,
  Alert,
  Linking,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { observer } from 'mobx-react-lite';

import Store from '../../../../store';
import uploadScan from '../../../../../services/uploadScan';
import primeTrustErrorFormatter from '../../../../../utilities/formatters/primeTrustErrorFormatter';

import { DEVICE_WIDTH, ID_DOCUMENTS_LIST } from '../../../../../constants/constants';
import { UPLOADED_DOCUMENT_TYPE, ID_OTHER_UPLOADED } from '../../../../../constants/storageKeys';

import DefaultButton from '../../../../components/DefaultButton/DefaultButton';
import Indent from '../../../../components/Indent/Indent';
import Picker from '../../../../components/Picker/Picker';
import Modal from '../../../../components/Modal/Modal';
import FormInput from '../../../../components/FormInput/FormInput';
import Score from '../../../../components/Score/Score';

import KYCUploadImage from '../../../../../assets/svgs/KYCUpload';
import CloseImage from '../../../../../assets/svgs/CloseBlue';

import { view } from '../../../../../styles/mixins';
import styles from '../KnowYourCustomer.styles';

function KYCScan({ jumpToNextPage, showLoader, setShowLoader, setFormErrors }) {
  const [documents, setDocuments] = useState([]);
  const [documentsQuantity, setDocumentsQuantity] = useState(1); // max 2
  const [needUploadTwoPhoto, setNeedUploadTwoPhoto] = useState(false);
  const [documentType, setDocumentType] = useState(ID_DOCUMENTS_LIST[0].value);
  const [documentTypeName, setDocumentTypeName] = useState(ID_DOCUMENTS_LIST[0].name);
  const [documentSize, setDocumentSize] = useState([[324, 213], [324, 213]]); // size for styles
  const [otherDocumentName, setOtherDocumentName] = useState(''); // only for Other document type
  const [otherDocumentContent, dispatchOtherDocumentContent] = useReducer((state, action) => {
    switch (action.type) {
      case 'identity':
        return { ...state, identity: !state.identity };
      case 'identity-photo':
        return { ...state, 'identity-photo': !state['identity-photo'] };
      case 'proof-of-address':
        return { ...state, 'proof-of-address': !state['proof-of-address'] };
      case 'eject':
        return {
          identity: false,
          'identity-photo': false,
          'proof-of-address': false,
        };
      default: return state;
    }
  }, {
    identity: false,
    'identity-photo': false,
    'proof-of-address': false,
  });

  const [showDocumentTypePicker, setShowDocumentTypePicker] = useState(false);
  const [showUploadWayPicker, setShowUploadWayPicker] = useState(false);
  const [showOtherDocumentNameInput, setShowOtherDocumentNameInput] = useState(false);
  const [showOtherDocumentContentPicker, setShowOtherDocumentContentPicker] = useState(false);

  const [openCameraLoader, setOpenCameraLoader] = useState(false);
  const [openGalleryLoader, setOpenGalleryLoader] = useState(false);

  useEffect(() => {
    const severalPhoto = documentType === 'drivers_license' || documentType === 'government_id';
    const newDocumentsQuantity = (1 + +severalPhoto) - documents.length;

    setNeedUploadTwoPhoto(severalPhoto);
    setDocumentsQuantity(newDocumentsQuantity);
    if (documents.length === 1 && severalPhoto) {
      setShowUploadWayPicker(true);
    }
    setDocumentTypeName(ID_DOCUMENTS_LIST.find((_document) => _document.value === documentType).name);
  }, [documentType, documents.length]);

  useEffect(() => {
    // if (showLoader) {
    //   const { address, photo, id } = Store.user.status;
    //   const scanStatus = {
    //     address: address === 'ok' || address === 'verified' || address === 'pending',
    //     photo: photo === 'ok' || photo === 'verified' || photo === 'pending',
    //     id: id === 'ok' || id === 'verified' || id === 'pending',
    //   };
    //
    //   (async () => {
    //     if (scanStatus.photo && scanStatus.id) {
    //       await jumpToNextPage();
    //     } else if (scanStatus.address || scanStatus.photo || await AsyncStorage.getItem(ID_OTHER_UPLOADED) === 'true') {
    //       const additionalDocuments = Object.keys(scanStatus)
    //         .reduce((accumulator, key) => (!scanStatus[key] ? `${accumulator}${accumulator ? ', ' : ''}${key}` : accumulator), '')
    //         .replace(/,$/, '');
    //       await Store.application.addNotification(`We have received your ${await AsyncStorage.getItem(UPLOADED_DOCUMENT_TYPE) || 'document'}, now we need documents with ${additionalDocuments}`);
    //       setDocuments([]);
    //       setOtherDocumentName('');
    //       setDocumentType(ID_DOCUMENTS_LIST[0].value);
    //       setDocumentTypeName(ID_DOCUMENTS_LIST[0].name);
    //     }
    //     setShowLoader(false);
    //   })();
    // }
  }, [Store.user.status]);

  const uploadID = async () => {
    setShowLoader(true);
    try {
      const uploadedDocuments = {
        front: {
          uri: documents[0].path,
          name: `${documents[0].localIdentifier}_document.jpg`,
          type: 'image/jpeg',
        },
      };

      if (needUploadTwoPhoto) {
        uploadedDocuments.back = {
          uri: documents[1].path,
          name: `${documents[1].localIdentifier}_document.jpg`,
          type: 'image/jpeg',
        };
      }
      if (documentType === 'other') {
        uploadedDocuments['other-type'] = otherDocumentName;
        dispatchOtherDocumentContent({ type: 'eject' });
      }

      await uploadScan(uploadedDocuments, documentType, otherDocumentContent);
      if (otherDocumentContent.identity) {
        await AsyncStorage.setItem(ID_OTHER_UPLOADED, 'true');
      }
      await AsyncStorage.setItem(UPLOADED_DOCUMENT_TYPE, documentType === 'other' ? otherDocumentName : documentType);
      await Store.user.KYCApprove();
      await jumpToNextPage();
    } catch (e) {
      try {
        const errors = JSON.parse(/{.+}/.exec(e.message))?.errors;
        if (errors) {
          setFormErrors(errors.map(primeTrustErrorFormatter));
        } else {
          setFormErrors([{ message: e.message, id: Math.random() }]);
        }
      } catch (_e) {
        setFormErrors([{ message: _e.message, id: Math.random() }]);
      }
    }
    setShowLoader(false);
  };

  const documentsHandler = (_documents) => {
    const cutDocuments = [...documents, ...[_documents].flat()].slice(0, 2);

    const newSizes = cutDocuments.map((_document) => {
      const ratio = _document.width / _document.height;
      if (ratio < 1) {
        return [Math.floor(300 * ratio), 300];
      }
      return [300, Math.floor(300 / ratio)];
    });

    setShowUploadWayPicker(false);
    setDocumentSize(newSizes);
    setDocuments(cutDocuments);
  };

  const cameraPicker = async () => {
    try {
      setOpenCameraLoader(true);
      await ImagePicker.openCamera({ mediaType: 'photo' })
        .then(documentsHandler);
    } catch (e) {
      setOpenCameraLoader(false);
      setFormErrors([{ message: e.message, id: Math.random() }]);
      if (e.message === 'User did not grant camera permission.') {
        return Alert.alert(
          'To upload ID',
          'Open settings and allow "Rhino Global" to access your Camera',
          [
            {
              text: 'Later',
              style: 'cancel',
            },
            {
              text: 'Open Settings',
              onPress: async () => Linking.openSettings(),
            },
          ],
          { cancelable: false },
        );
      }
    }
    setOpenCameraLoader(false);
  };

  const documentPicker = async () => {
    try {
      setOpenGalleryLoader(true);
      await ImagePicker.openPicker({
        multiple: needUploadTwoPhoto,
        mediaType: 'photo',
        maxFiles: documentsQuantity, // iOS only
      })
        .then(documentsHandler);
    } catch (e) {
      setOpenGalleryLoader(false);
      setFormErrors([{ message: e.message, id: Math.random() }]);
      if (e.message === 'User did not grant library permission.') {
        return Alert.alert(
          'To upload ID',
          'Open settings and allow "Rhino Global" to access your Gallery',
          [
            {
              text: 'Later',
              style: 'cancel',
            },
            {
              text: 'Open Settings',
              onPress: async () => Linking.openSettings(),
            },
          ],
          { cancelable: false },
        );
      }
    }
    setOpenGalleryLoader(false);
  };

  const deleteDocument = (i) => {
    if (!showLoader) {
      setDocumentSize(documentSize.filter((_document, j) => j !== i));
      setDocuments(documents.filter((_document, j) => j !== i));
      setOtherDocumentName('');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <View style={view}>
          {documents.length ? (
            <>
              <Text allowFontScaling={false} style={styles.documentName}>
                {`Your ${otherDocumentName || documentTypeName}`}
              </Text>
              <View style={styles.hr} />
              {documents.map((document, i) => (
                <View style={styles.documentWrapper} key={document.path}>
                  <Indent height={15} />
                  {needUploadTwoPhoto && <Text allowFontScaling={false} style={styles.photoHeader}>{!i ? 'Front side' : 'Back side'}</Text>}
                  <View>
                    <TouchableWithoutFeedback onPress={() => deleteDocument(i)}>
                      <View style={styles.close}>
                        <CloseImage />
                      </View>
                    </TouchableWithoutFeedback>
                    <Image
                      source={{ uri: document.path }}
                      style={{
                        width: documentSize[i][0],
                        height: documentSize[i][1],
                        maxWidth: '93%',
                      }}
                    />
                  </View>
                </View>
              ))}
            </>
          )
            : <KYCUploadImage maxWidth="100%" />}
          <Text allowFontScaling={false} style={styles.description}>
            Valid Proof of Govt Issued ID
          </Text>
          <Indent height={10} />
        </View>
        <View style={view}>
          {!(documents.length === needUploadTwoPhoto + 1)
            ? (
              <DefaultButton
                title="Upload"
                onPress={() => (documents.length ? setShowUploadWayPicker(true) : setShowDocumentTypePicker(true))}
              />
            )
            : (
              <DefaultButton
                title="Next page"
                onPress={uploadID}
                showLoader={showLoader}
              />
            )}
          <Indent height={DEVICE_WIDTH <= 360 ? 195 : 230} />
        </View>
        {showDocumentTypePicker && (
          <Picker
            close={() => setShowDocumentTypePicker(false)}
            header="Pick downloaded document type"
            value={documentType}
            onValueChange={setDocumentType}
            list={ID_DOCUMENTS_LIST}
            select={() => {
              setShowDocumentTypePicker(false);
              if (documentType === 'other') {
                setShowOtherDocumentNameInput(true);
              } else {
                setShowUploadWayPicker(true);
              }
            }}
          />
        )}
        {showUploadWayPicker && (
          <Modal
            close={() => setShowUploadWayPicker(false)}
            header={
              needUploadTwoPhoto
                ? (documents.length ? 'Upload other document side'
                  : 'Upload front and back document sides') : ''
            }
          >
            <DefaultButton
              title="Take Photo"
              onPress={cameraPicker}
              showLoader={openCameraLoader}
            />
            <DefaultButton
              customStyles={{ marginTop: 10 }}
              title="Choose From Library"
              onPress={documentPicker}
              showLoader={openGalleryLoader}
            />
            <Indent height={20} />
          </Modal>
        )}
        {showOtherDocumentNameInput && (
          <Modal
            header="Write document name"
            close={() => {
              setShowOtherDocumentNameInput(false);
              setOtherDocumentName('');
            }}
            keyboardNormalizer
          >
            <FormInput
              style={{ marginTop: -20 }}
              set={setOtherDocumentName}
              value={otherDocumentName}
              autoFocus
            />
            <Indent height={20} />
            <DefaultButton
              title="Submit"
              showLoader={openGalleryLoader}
              onPress={() => {
                setShowOtherDocumentNameInput(false);
                setShowOtherDocumentContentPicker(true);
              }}
              disabled={!otherDocumentName.length}
            />
            <Indent height={20} />
          </Modal>
        )}
        {showOtherDocumentContentPicker && (
          <Modal
            header="Select all that apply to the content of the document"
            close={() => {
              setShowOtherDocumentContentPicker(false);
              dispatchOtherDocumentContent({ type: 'eject' });
            }}
          >
            <Indent height={20} />
            <Score
              text="Name"
              isSelected={otherDocumentContent.identity}
              onPress={() => dispatchOtherDocumentContent({ type: 'identity' })}
            />
            <Score
              text="Photo"
              isSelected={otherDocumentContent['identity-photo']}
              onPress={() => dispatchOtherDocumentContent({ type: 'identity-photo' })}
            />
            <Score
              text="Proof of address"
              isSelected={otherDocumentContent['proof-of-address']}
              onPress={() => dispatchOtherDocumentContent({ type: 'proof-of-address' })}
            />
            <DefaultButton
              title="Submit"
              onPress={() => {
                setShowUploadWayPicker(true);
                setShowOtherDocumentContentPicker(false);
              }}
              disabled={
                !(otherDocumentContent.identity
                    || otherDocumentContent['identity-photo']
                    || otherDocumentContent['proof-of-address'])
              }
            />
            <Indent height={20} />
          </Modal>
        )}
      </View>
    </ScrollView>
  );
}

KYCScan.propTypes = {
  jumpToNextPage: PropTypes.func,
  showLoader: PropTypes.bool,
  setShowLoader: PropTypes.func,
  setFormErrors: PropTypes.func,
};

export default observer(KYCScan);
