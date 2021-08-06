import React, { useEffect, useState, createRef, RefObject } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

// config
import { LoaderAction } from '@app/config/constants';

// actions
import { getArticleListByModuleCqategory } from '@app/controller/articles/actions';

// custom components
import NavigationBar from '@app/component/NavigationBar';
import Loader from '@app/component/Loader';

// Actions
import { getModuleAction } from '@app/controller/module/actions';

// Selectors
import { getLoader, getModules } from '@app/controller/module';

// View
import TrialExpired from '@app/view/Schedule/TrialExpired/TrialExpired';

// interfaces
import { IStore } from '@app/controller/model';

type IProps = RouteComponentProps<{ id: string }>;

const Module: React.FC<any> = (props) => {
  const { id } = props.match.params;
  const idNumber = Number(id);
  const [isFirstLoaded, setIsFirstLoaded] = useState<boolean>(undefined);
  const fieldRef = createRef() as RefObject<Scrollbars>;
  const modules: any = useSelector(getModules);
  const loaders = useSelector(getLoader);

  const loadMoreItems = () => {
    const { getClientHeight, getScrollHeight, getScrollTop, scrollToBottom } =
      fieldRef.current as Scrollbars;
    if (
      props.articles.counts &&
      props.articles.items.length === props.articles.counts
    ) {
      return;
    }

    if (
      getClientHeight() + getScrollTop() >= getScrollHeight() - 1 &&
      props.articles.counts !== undefined &&
      props.moduleId !== undefined
    ) {
      dispatch(
        getArticleListByModuleCqategory.request({
          limit: 10,
          offset: props.articles.length,
          query: '',
          moduleCategories: [Number(Object.keys(props.moduleId)[0])],
        }),
      );
    }

    return;
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getModuleAction.request({
        id: idNumber,
      }),
    );
    setIsFirstLoaded(false);
  }, []);

  useEffect(() => {
    if (loaders.length === 0 && isFirstLoaded === false) {
      setIsFirstLoaded(true);
    }
  }, [loaders]);

  return (
    <div className={'module'}>
      {modules !== undefined ?<NavigationBar
        rout={'/schedule'}
        name={modules[idNumber]?.title}
        page={'schedule'}
        isSaveActive={true}
      /> : <></>}
      <div className="module-content">
        <Scrollbars
          style={{
            width: '100%',
            maxWidth: 639,
            height: '100%',
            maxHeight: '100%',
            display: 'flex',
          }}
          ref={fieldRef}
          onScroll={loadMoreItems}>
          {modules?.[idNumber]?.isExpired ? (
            <TrialExpired id={modules?.[idNumber]?.journey?.id} />
          ) : (
            <div className={'module-body'}>{props.children}</div>
          )}
        </Scrollbars>
        {isFirstLoaded ? (
          Boolean(
            loaders.filter(
              (item) => item.type === LoaderAction.module.getModule,
            ).length,
          ) && <Loader isSmall={true} isAbsolute={true} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default connect(
  (state: IStore) => ({
    articles: state.articleListReducer.state,
    counts: state.articleListReducer.state.counts,
    moduleId: state.moduleState.moduleData,
    storedSearchParams: state.articleListReducer.storedSearchParams,
  }),
  {
    getArticleListByModuleCqategory,
  },
)(Module);
