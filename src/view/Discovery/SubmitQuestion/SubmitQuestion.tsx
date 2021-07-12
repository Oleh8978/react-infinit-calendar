import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { omit } from 'lodash';
import history from '@app/historyApi';

// components
import NavigationBar from '@app/component/NavigationBar';
import BodySubmitQuestion from './BodySubmitQuestion';
import ButtonSubmit from './SubmitBTN';
import ModalWindowThanks from './ModalWindow';

// interfaces
import { ArticleDTO } from '@ternala/frasier-types';
import { DiscoveryGetListRequest } from '@ternala/frasier-types';
import { IStore } from '@app/controller/model';

// actions
import { getArticlesCategoriesAction } from '@app/controller/articleCategory/actions';
import { submitAnswer } from '@app/controller/FAQ/actions';
// utils functions
import { getSavedAccess } from '@app/utils/manageAccess';

interface IProps {
  storedSearchParams: any;
  getCategoriesList: any;
  submitAnswer: any;
  articleCategories: any;
  topicListLoader: boolean;
  rout: string;
}

const SubmitQuestion: React.FC<IProps> = ({ ...props }) => {
  const [articleCategories, setArticleCategories] = useState<ArticleDTO[]>(
    undefined,
  );
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isClosed, setIsClosed] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isDropdownError, setIsDropdownError] = useState<boolean>(false);
  const [isTextareaError, setIsTextareaError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string>('');
  const [textareaValue, setTextareaValue] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');

  // console.log('textareaValue ', textareaValue, 'dropdownValue ', dropdownValue)

  const dispatch = useDispatch();

  const getArticlesCategoriesAction = (callback?: any) => {
    const searchParams: DiscoveryGetListRequest = {
      limit: 100,
      offset: 0,
      query: '',
    };

    if (
      JSON.stringify(omit(props.storedSearchParams, ['limit', 'offset'])) !==
      JSON.stringify(omit(searchParams, ['limit', 'offset']))
    ) {
      searchParams.offset = 0;
    }
    props.getCategoriesList({ ...searchParams, callback });
  };

  useEffect(() => {
    if (props.articleCategories !== undefined) {
      setArticleCategories(props.articleCategories);
    }

    if (articleCategories === undefined) {
      getArticlesCategoriesAction();
    }
  }, [props.articleCategories]);
  const setTextareaValueText = (text: any) => {
    setTextareaValue(text);
  };

  const setDropdownValueText = (text: any) => {
    setDropdownValue(text);
  };

  const isNotValid = () => {
    if (
      dropdownValue === '' ||
      dropdownValue === undefined ||
      textareaValue === '' ||
      textareaValue === undefined
    ) {
      return true;
    } else {
      return false;
    }
  };

  const formValidation = (): any => {
    if (isNotValid()) {
      if (dropdownValue === '' || dropdownValue === undefined) {
        setIsDropdownError(true);
      } else {
        setIsDropdownError(false);
      }

      if (textareaValue === '' || textareaValue === undefined) {
        setIsTextareaError(true);
      } else {
        setIsTextareaError(false);
      }

      setNameError('This field is required');

      return false;
    } else {
      setNameError(null);
      setIsDropdownError(false);
      setIsTextareaError(false);
      return true;
    }
  };

  const submitFunc = () => {
    setIsModal(formValidation());
    console.log('dropdownValue ', dropdownValue);
    console.log('textareaValue ', textareaValue);
    if (
      dropdownValue &&
      textareaValue &&
      dropdownValue !== '' &&
      textareaValue !== ''
    ) {
      props.submitAnswer({
        receivedToken: getSavedAccess().accessToken,
        categoryID: dropdownValue,
        description: textareaValue,
      }),
        setTimeout(() => {
          handleCloseModal();
          history.push('/');
        }, 2000);
    }
  };

  const entryErrorUnsetter = () => {
    setIsDropdownError(false);
    setIsTextareaError(false);
  };

  const handleCloseModal = () => {
    setIsModal(false);
  };

  return (
    <>
      {articleCategories && (
        <div className="ask-question">
          <NavigationBar name={''} rout={'/'} hasSaveButton={false} />
          <div className="ask-question-header">
            <span className="ask-question-header-text__first">
              What question would you like to have an answer from us?
            </span>
            <span className="ask-question-header-text__second">
              One question per form submission
            </span>
          </div>
          <BodySubmitQuestion
            isDropdownError={isDropdownError}
            isTextareaError={isTextareaError}
            nameError={nameError}
            setTextareaValueText={setTextareaValueText}
            textareaValue={textareaValue}
            setDropdownValueText={setDropdownValueText}
            itemsArticle={articleCategories}
            topicListLoader={props.topicListLoader}
            entryErrorUnsetter={entryErrorUnsetter}
          />
          <div className="ask-question__bottom">
            <ButtonSubmit
              name={'Submit'}
              onClick={submitFunc}
              isActive={isActive}
            />
          </div>
          {isModal ? <ModalWindowThanks /> : <> </>}
        </div>
      )}
    </>
  );
};

export default connect(
  (state: IStore) => ({
    storedSearchParams: state.discoveryListReducer.storedSearchParams,
    articleCategories: state.ArticleReducer.articleCategoriesObject.items,
    topicListLoader: state.ArticleReducer.isLoading.status,
  }),
  {
    getCategoriesList: getArticlesCategoriesAction.request,
    submitAnswer: submitAnswer.request,
  },
)(SubmitQuestion);
