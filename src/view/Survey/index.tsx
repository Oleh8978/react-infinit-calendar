import React, { useState, useEffect, createRef, RefObject } from 'react';
import { omit } from 'lodash';
import { connect, useDispatch } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

// action
import {
  getSurveysRequest,
  submitAnswerRequest,
  setLoadingAction,
} from '@app/controller/questions/actions';

// components
import NavigationBar from '@app/component/NavigationBar';
import Loader from '@app/component/Loader';

// interfaces
import { IStore } from '@app/controller/model';
import { GetListParameters } from '@ternala/frasier-types/lib/modules/query.dto';
import {
  ISurveySearchParams,
} from '@app/controller/questions/models';
import { QuestionDTO } from '@ternala/frasier-types';

export interface QuestionDTOExtended extends QuestionDTO {
  status: string;
}

interface IProps {
  questions: QuestionDTOExtended[];
  storedSearchParams: GetListParameters;
  counts: number;
  loader: boolean;
  title: string
  match: any;
}

const Survey: React.FC<IProps> = ({ ...props }) => {
  const [surveyName, setSurveyName] = useState<string>('');
  const [items, setItems] = useState<QuestionDTOExtended[]>([]);

  const fieldRef = createRef() as RefObject<Scrollbars>;
  const dispatch = useDispatch();

  const loadSurveys = (
    loadMore?: string,
    searchQuery?: string,
    callback?: any,
  ) => {
    let searchParams: ISurveySearchParams;

    if (props.questions !== undefined) {
      searchParams = {
        limit: 20,
        offset: loadMore === 'more' ? Number(props.questions.length) : 0,
      };
    } else {
      searchParams = {
        limit: 20,
        offset: loadMore === 'more' ? Number(props.questions.length) : 0,
      };
    }

    if (
      JSON.stringify(omit(props.storedSearchParams, ['limit', 'offset'])) !==
      JSON.stringify(omit(searchParams, ['limit', 'offset']))
    ) {
      searchParams.offset = 0;
    }
    dispatch(
      getSurveysRequest.request({
        searchParams: searchParams,
        survey: props.match.params.id,
      }),
    );
  };

  useEffect(() => {
    if (!props.counts) {
        loadSurveys();
    }

    if (props.questions !== undefined) {
      setItems(
        props.questions.map((item) => {
          return {
            ...item,
            status: '',
          };
        }),
      );
    }
  }, [props.questions]);

  const styleSetter = (status: string, type: string) => {
    if (status === 'yes' && type === 'yes') {
      return 'btn-active';
    }

    if (status === 'no' && type === 'no') {
      return 'btn-active';
    }

    return '';
  };

  const answerSetter = (id: number, status: string) => {
    const array = [];

    if (items.filter((item) => item.id === id)[0] !== undefined) {
      items.map((item) => {
        if (item.id === id) {
          array.push({
            ...item,
            status: status,
          });
        } else {
          array.push({ ...item });
        }
      });
      setItems(array);
    }
  };

  const loadMoreItems = () => {
    const { getClientHeight, getScrollHeight, getScrollTop, scrollToBottom } =
    fieldRef.current as Scrollbars;
  if (
    getClientHeight() + getScrollTop() >= getScrollHeight() - 1 &&
    props.counts !== 0 &&
    props.questions!== undefined &&
    props.counts !== props.questions.length
  ) {
    loadSurveys('more');
  }
  };

  const sendData = () => {
      const answers = [];
      items.map( item => {
        answers.push({
            answer: item.status,
            question: item.id
        })
      })

      if (items.filter(item => item.status === '').length === 0 ) {
          dispatch(setLoadingAction({status: true}))
          dispatch(
            submitAnswerRequest.request({
                survey: props.match.params.id,
                questionResults: answers,
            })
          )
      }
  } 

  return (
    <>
      {props.counts !== undefined? (
        <div className="survey-main">
          <NavigationBar
            rout={'account'}
            name={''}
            hasSaveButton={false}
          />
          <Scrollbars
            style={{
              width: '100%',
              maxWidth: 639,
              height: '100%',
              maxHeight: '100%',
              display: 'flex',
            }}
            onScroll={loadMoreItems}
            ref={fieldRef}
            renderView={(props) => (
              <div {...props} className={'survey-wrapper'} />
            )}>
            <>
              {items.map((item) => {
                return (
                  <div className="survey-wrapper-item" key={item.id}>
                    <span className="survey-wrapper-item-title">
                      {item.title}
                    </span>
                    <span className="survey-wrapper-item-container">
                      <span
                        className={`survey-wrapper-item-container-left ${styleSetter(
                          item.status,
                          'yes',
                        )}`}
                        onClick={() => {
                          answerSetter(item.id, 'yes');
                        }}>
                        Yes
                      </span>
                      <span
                        className={`survey-wrapper-item-container-right ${styleSetter(
                          item.status,
                          'no',
                        )}`}
                        onClick={() => {
                          answerSetter(item.id, 'no');
                        }}>
                        No
                      </span>
                    </span>
                  </div>
                );
              })}
              {props.questions && props.counts !== props.questions.length ? <Loader isSmall={true}/> : <></>}
            </>
            {props.questions && props.counts === props.questions.length ? <div
              className={`survey-submit ${
                items.filter((item) => item.status === '').length === 0
                  ? 'btn-submitactive'
                  : ''
              }`}
              onClick={() => {
                sendData()
              }}>
              <span className="survey-submit-txt">Submit</span>
            </div> : <></>}
          </Scrollbars>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default connect(
  (state: IStore) => ({
    title: state.surveyListReducer.title,
    loader: state.surveyListReducer.loaderState.status,
    questions: state.surveyListReducer.surveys.items,
    storedSearchParams: state.surveyListReducer.storedSearchParams,
    counts: state.surveyListReducer.surveys.counts,
  }),
  {
    getSurveysRequest,
    submitAnswerRequest,
  },
)(Survey);
