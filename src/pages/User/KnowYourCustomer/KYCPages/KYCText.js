import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import HTML from 'react-native-render-html';

import registerContact from '../../../../../services/registerContact';
import getUserAgreement from '../../../../../services/getUserAgreement';

import Store from '../../../../store';
import {
  getDate,
  getShortDate,
} from '../../../../../utilities/formatters/timeFormatter';
import primeTrustErrorFormatter from '../../../../../utilities/formatters/primeTrustErrorFormatter';
import postalCodeFormatter from '../../../../../utilities/formatters/postalCodeFormatter';
import numberFormatter from '../../../../../utilities/formatters/numberFormatter';

import { USA_STATES_LIST } from '../../../../../constants/constants';

import {
  nameValidator,
  familyNameValidator,
  phoneNumberValidator,
  streetValidator,
  cityValidator,
  postalCodeValidator,
  taxNumberValidator,
  emailValidator,
} from '../../../../../utilities/yupValidators';

import FormInput from '../../../../components/FormInput/FormInput';
import DefaultButton from '../../../../components/DefaultButton/DefaultButton';
import Indent from '../../../../components/Indent/Indent';
import Picker from '../../../../components/Picker/Picker';
import DatePicker from '../../../../components/DatePicker/DatePicker';
import CheckBox from '../../../../components/Checkbox/CheckBox';

import CloseImage from '../../../../../assets/svgs/Close';
import { view } from '../../../../../styles/mixins';
import styles from '../KnowYourCustomer.styles';

function KYCText({ type = 'natural_person', jumpToNextPage, showLoader, setShowLoader, setFormErrors }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date('January 1, 2000'));
  const [dateIsPicked, setDateIsPicked] = useState(false);

  const [showRegionFormationPicker, setShowRegionFormationPicker] = useState(false);
  const [regionFormation, setRegionFormation] = useState(USA_STATES_LIST[0].value);
  const [regionFormationIsPicked, setRegionFormationIsPicked] = useState(false);

  const [showTaxStatePicker, setShowTaxStatePicker] = useState(false);
  const [taxState, setTaxState] = useState(USA_STATES_LIST[0].value);
  const [taxStateIsPicked, setTaxStateIsPicked] = useState(false);

  const [showStatePicker, setShowStatePicker] = useState(false);
  const [state, setState] = useState(USA_STATES_LIST[0].value);
  const [stateIsPicked, setStateIsPicked] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const [agreedCheckpoint, setAgreedCheckpoint] = useState(false);
  const [userAgreement, setUserAgreement] = useState('');
  const [textFormedData, setTextFormedData] = useState({});

  const openAgreement = async (values) => {
    try {
      setShowLoader(true);
      const KYCFormedData = type === 'natural_person'
        ? {
          name: `${values.name} ${values.familyName}`,
          email: values.email || '',
          'date-of-birth': getShortDate(date),
          'tax-id-number': values.taxId,
          'tax-country': 'US',
          'tax-state': taxState,
          'primary-phone-number': {
            country: 'US',
            number: values.phoneNumber,
          },
          'primary-address': {
            country: 'US',
            region: state,
            city: values.city,
            'street-1': values.streetAddress,
            'postal-code': values.postalCode,
          },
        } : {
          name: values.name,
          email: values.email || '',
          'date-of-incorporation': getShortDate(date),
          'description-of-services': values.descriptionOfServices,
          'jurisdictions-of-business-activity': 'US',
          'tax-id-number': values.taxId,
          'tax-country': 'US',
          'region-of-formation': regionFormation,
          'tax-state': taxState,
          'primary-phone-number': {
            country: 'US',
            number: values.phoneNumber,
          },
          'primary-address': {
            country: 'US',
            region: state,
            city: values.city,
            'street-1': values.streetAddress,
            'postal-code': values.postalCode,
          },
        };
      setTextFormedData(KYCFormedData);
      const parseUserAgreement = (await getUserAgreement(KYCFormedData.name)).content
        // delete fonts cause weren't sure we have them
        .replace(/font-family:[.\w\s]*/g, '')
        // delete useless end of text
        .replace(/Agreed as of day[.\s\S\n]+between:/g, '')
        // change line break to space for right html rendering
        .replace(/(<.+>)([^<]*)(<\/.+>)/g, (m, p1, p2, p3) => `${p1}${p2.replace(/\n/g, ' ')}${p3}`);
      setUserAgreement(parseUserAgreement);
      setAgreedCheckpoint(false);
      setShowAgreement(true);
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

  const uploadText = async () => {
    setShowLoader(true);
    try {
      await registerContact(textFormedData, type)
        .then(async () => {
          await jumpToNextPage();
        });
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
    setShowAgreement(false);
  };

  return (
    <>
      <Formik
        validationSchema={yup.object().shape({
          name: nameValidator,
          familyName: familyNameValidator,
          email: emailValidator,
          phoneNumber: phoneNumberValidator,
          streetAddress: streetValidator,
          city: cityValidator,
          postalCode: postalCodeValidator,
          taxId: taxNumberValidator,
        })}
        initialValues={{
          name: type === 'natural_person' ? Store.user.givenName : '',
          descriptionOfServices: '',
          familyName: Store.user.familyName,
          email: Store.user.email,
          date: '',
          phoneNumber: '',
          regionFormation: '',
          taxState: '',
          state: '',
          city: '',
          streetAddress: '',
          postalCode: '',
          taxId: '',
        }}
        onSubmit={openAgreement}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
          dirty,
        }) => (
          <>
            <SafeAreaView style={{ width: '100%' }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={view}>
                  <FormInput
                    autoCompleteType="name"
                    autoCapitalize="words"
                    set={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    textContentType="givenName"
                    placeholder={type === 'natural_person' ? 'First Name' : 'Company Name'}
                    error={touched.name && errors.name}
                  />
                  {type === 'company' && (
                    <FormInput
                      set={handleChange('descriptionOfServices')}
                      onBlur={handleBlur('descriptionOfServices')}
                      value={values.descriptionOfServices}
                      placeholder="Description Of Services"
                      error={touched.descriptionOfServices && errors.descriptionOfServices}
                    />
                  )}
                  {type === 'natural_person' && (
                    <FormInput
                      autoCompleteType="name"
                      autoCapitalize="words"
                      set={handleChange('familyName')}
                      onBlur={handleBlur('familyName')}
                      value={values.familyName}
                      textContentType="familyName"
                      placeholder="Last Name"
                      error={touched.familyName && errors.familyName}
                    />
                  )}
                  <FormInput
                    keyboardType="email-address"
                    autoCompleteType="email"
                    set={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    textContentType="emailAddress"
                    placeholder="Email Address"
                    error={touched.email && errors.email}
                  />
                  <FormInput
                    editable={false}
                    onFocus={() => {
                      setShowDatePicker(true);
                      setDateIsPicked(true);
                    }}
                    onBlur={handleBlur('date')}
                    value={dateIsPicked ? getDate(date) : ''}
                    placeholder={type === 'natural_person' ? 'Date of Birth' : 'Date of Incorporation'}
                    error={
                      touched.date
                      && !dateIsPicked
                      && 'This Date is required'
                    }
                  />
                  <FormInput
                    autoCompleteType="tel"
                    keyboardType="phone-pad"
                    set={(value) => numberFormatter(value, handleChange('phoneNumber'))}
                    onBlur={handleBlur('phoneNumber')}
                    value={values.phoneNumber}
                    placeholder="Phone Number"
                    error={touched.phoneNumber && errors.phoneNumber}
                  />
                  {type === 'company' && (
                  <View style={view}>
                    <FormInput
                      editable={false}
                      onFocus={() => {
                        setShowRegionFormationPicker(true);
                        setRegionFormationIsPicked(true);
                      }}
                      set={handleChange('regionFormation')}
                      onBlur={handleBlur('regionFormation')}
                      value={regionFormationIsPicked ? regionFormation : ''}
                      placeholder="Region Formation"
                      error={
                        touched.regionFormation
                        && !regionFormationIsPicked
                        && 'Region formation is required'
                      }
                    />
                    {Platform.OS === 'android' && (
                    <View style={styles.invisiblePicker}>
                      <Picker
                        close={() => setShowRegionFormationPicker(false)}
                        header="Pick your region formation"
                        value={regionFormation}
                        onValueChange={(value) => {
                          setRegionFormation(value);
                          setRegionFormationIsPicked(true);
                        }}
                        list={USA_STATES_LIST}
                        select={() => setShowRegionFormationPicker(false)}
                      />
                    </View>
                    )}
                  </View>
                  )}
                  <View style={view}>
                    <FormInput
                      editable={false}
                      onFocus={() => {
                        setShowTaxStatePicker(true);
                        setTaxStateIsPicked(true);
                      }}
                      set={handleChange('taxState')}
                      onBlur={handleBlur('taxState')}
                      value={taxStateIsPicked ? taxState : ''}
                      placeholder="Tax State"
                      error={
                        touched.taxState
                        && !taxStateIsPicked
                        && 'Tax state is required'
                      }
                    />
                    {Platform.OS === 'android' && (
                      <View style={styles.invisiblePicker}>
                        <Picker
                          close={() => setShowTaxStatePicker(false)}
                          header="Pick your tax state"
                          value={taxState}
                          onValueChange={(value) => {
                            setTaxState(value);
                            setTaxStateIsPicked(true);
                          }}
                          list={USA_STATES_LIST}
                          select={() => setShowTaxStatePicker(false)}
                        />
                      </View>
                    )}
                  </View>
                  <View style={view}>
                    <FormInput
                      editable={false}
                      onFocus={() => {
                        setShowStatePicker(true);
                        setStateIsPicked(true);
                      }}
                      set={handleChange('state')}
                      onBlur={handleBlur('state')}
                      value={stateIsPicked ? state : ''}
                      placeholder="State"
                      error={
                        touched.state
                        && !stateIsPicked
                        && 'State state is required'
                      }
                    />
                    {Platform.OS === 'android' && (
                      <View style={styles.invisiblePicker}>
                        <Picker
                          close={() => setShowStatePicker(false)}
                          header="Pick your state"
                          value={state}
                          onValueChange={(value) => {
                            setState(value);
                            setStateIsPicked(true);
                          }}
                          list={USA_STATES_LIST}
                          select={() => setShowStatePicker(false)}
                        />
                      </View>
                    )}
                  </View>
                  <FormInput
                    autoCapitalize="sentences"
                    set={handleChange('city')}
                    onBlur={handleBlur('city')}
                    value={values.city}
                    textContentType="addressCityAndState"
                    placeholder="City"
                    error={touched.city && errors.city}
                  />
                  <FormInput
                    autoCapitalize="sentences"
                    autoCompleteType="street-address"
                    set={handleChange('streetAddress')}
                    onBlur={handleBlur('streetAddress')}
                    value={values.streetAddress}
                    textContentType="fullStreetAddress"
                    placeholder="Street Address"
                    error={touched.streetAddress && errors.streetAddress}
                  />
                  <FormInput
                    keyboardType="number-pad"
                    set={(value) => postalCodeFormatter(value, handleChange('postalCode'))}
                    onBlur={handleBlur('postalCode')}
                    value={values.postalCode}
                    autoCompleteType="postal-code"
                    textContentType="postalCode"
                    placeholder="Postal Code"
                    error={touched.postalCode && errors.postalCode}
                    maxLength={5}
                  />
                  <FormInput
                    isHide
                    keyboardType="number-pad"
                    set={(value) => numberFormatter(value, handleChange('taxId'))}
                    onBlur={handleBlur('taxId')}
                    value={values.taxId}
                    placeholder="Social Security Number\Tax ID"
                    error={touched.taxId && errors.taxId}
                    maxLength={9}
                  />
                  <Indent height={17} />
                  <DefaultButton
                    title="Next Step"
                    onPress={handleSubmit}
                    showLoader={showLoader}
                    disabled={
                      !(
                        isValid
                          && dirty
                          && dateIsPicked
                          && taxStateIsPicked
                          && stateIsPicked
                          && (type === 'natural_person' || regionFormationIsPicked)
                      )
                    }
                  />
                  <Indent height={195} />
                </View>
              </ScrollView>
            </SafeAreaView>
          </>
        )}
      </Formik>
      {showDatePicker && (
        <DatePicker
          close={() => setShowDatePicker(false)}
          header={type === 'natural_person' ? 'Set your date of birth' : 'Set date of incorporation'}
          value={date}
          onValueChange={(event, _date) => {
            if (Platform.OS === 'android') {
              setShowDatePicker(false);
              if (event.type === 'set') {
                setDate(_date);
              }
            } else {
              setDate(_date);
            }
          }}
          select={() => setShowDatePicker(false)}
        />
      )}
      {showRegionFormationPicker && (
      <Picker
        close={() => setShowRegionFormationPicker(false)}
        header="Pick your region formation"
        value={regionFormation}
        onValueChange={setRegionFormation}
        list={USA_STATES_LIST}
        select={() => setShowRegionFormationPicker(false)}
      />
      )}
      {showTaxStatePicker && (
        <Picker
          close={() => setShowTaxStatePicker(false)}
          header="Pick your tax state"
          value={taxState}
          onValueChange={setTaxState}
          list={USA_STATES_LIST}
          select={() => setShowTaxStatePicker(false)}
        />
      )}
      {showStatePicker && (
        <Picker
          close={() => setShowStatePicker(false)}
          header="Pick your state"
          value={state}
          onValueChange={setState}
          list={USA_STATES_LIST}
          select={() => setShowStatePicker(false)}
        />
      )}
      {showAgreement && (
        <Modal
          animationType="slide"
          transparent
          onRequestClose={() => {
            setShowAgreement(false);
          }}
        >
          <View style={styles.agreementBackground}>
            <SafeAreaView>
              <View style={styles.agreementWrapper}>
                <View style={{ position: 'absolute', right: 10, top: 10 }}>
                  <TouchableOpacity onPress={() => setShowAgreement(false)}>
                    <CloseImage />
                  </TouchableOpacity>
                </View>
                <ScrollView>
                  <View style={{ maxWidth: '100%', marginBottom: -225 }}>
                    <HTML
                      source={{ html: userAgreement }}
                      classesStyles={{ pt__signature: { display: 'none' } }}
                    />
                  </View>
                </ScrollView>
                <Indent height={80} />
                <View style={styles.agreementButton}>
                  <TouchableWithoutFeedback onPress={() => setAgreedCheckpoint(!agreedCheckpoint)}>
                    <View style={{ flexDirection: 'row' }}>
                      <CheckBox checked={agreedCheckpoint} />
                      <Text allowFontScaling={false}>
                        {`I, ${textFormedData.name} agree`}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <Indent height={15} />
                  <DefaultButton
                    title="Submit"
                    disabled={!agreedCheckpoint}
                    showLoader={showLoader}
                    onPress={uploadText}
                  />
                </View>
              </View>
            </SafeAreaView>
          </View>
        </Modal>
      )}
    </>
  );
}

KYCText.propTypes = {
  jumpToNextPage: PropTypes.func,
  showLoader: PropTypes.bool,
  setShowLoader: PropTypes.func,
  setFormErrors: PropTypes.func,
  type: PropTypes.string,
};

export default KYCText;
