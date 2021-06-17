import React, { useState, useEffect, createRef, RefObject } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { omit, isEmpty } from 'lodash';
import { connect, useDispatch } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

// components
import Menu from './TopicMenu';
import DiscoveryTopicList from './List/TopicsList';
import SearchBar from '../../Component/SearchBar/SearchBar';

// actions
import { getDiscoveryList } from 'Controller/Discovery/actions';
import { getArticlesCategoriesAction } from 'Controller/articleCategory/actions';

// interfaces
import { IStore } from '../../Controller/model';
import { ArticleDTO, DiscoveryDTO } from '@ternala/frasier-types';
import { DiscoveryGetListRequest } from '@ternala/frasier-types';

interface IProps extends RouteComponentProps {
  storedSearchParams: any;
}

const Discovery: React.FC<any> = ({ ...props }) => {
  const [margin, setMargin] = useState<number>(20);
  const [discovery, setDiscovery] = useState<DiscoveryDTO[]>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [articleCategories, setArticleCategories] = useState<ArticleDTO[]>(
    undefined,
  );
  const [smallLoader, setSmallLoader] = useState<boolean>(false);
  const [isMoreStated, setISmoreStated] = useState<string>('start');
  const fieldRef = createRef() as RefObject<Scrollbars>;

  const loadMoreItems = () => {
    const {
      getClientHeight,
      getScrollHeight,
      getScrollTop,
      scrollToBottom,
    } = fieldRef.current as Scrollbars;
    if (
      props.isLoading.status === false &&
      smallLoader === false &&
      getClientHeight() + getScrollTop() >= getScrollHeight() - 1 &&
      searchQuery.trim().length === 0
    ) {
      setSmallLoader(true);
      loadDiscoveries('more');
      setISmoreStated('more');
      setSmallLoader(false);
    }
  };

  const searchQueryProcessor = (text: string) => {
    setSearchQuery(text.trim());
    if (text.trim().length !== 0) {
      loadDiscoveries('start', searchQuery);
    } else {
      loadDiscoveries('start');
    }
  };

  const onCloseHandler = () => {
    loadDiscoveries('start');
    setSearchQuery('');
    setISmoreStated('start');
  };

  useEffect(() => {
    if (props.discoveryList !== undefined) {
      setDiscovery(props.discoveryList);
      setISmoreStated('start');
    }

    if (articleCategories === undefined && discovery === undefined && searchQuery.trim().length === 0) {
      loadDiscovloadArticleCategoeries();
      loadDiscoveries('start');
    }
    if (isMoreStated === 'more' && props.discoveryList !== undefined) {
      setDiscovery(props.discoveryList);
    }

    if (
      props.articleCategories !== undefined &&
      articleCategories === undefined
    ) {
      setArticleCategories(props.articleCategories);
      setISmoreStated('start');
    }

    if (searchQuery.trim().length !== 0 && props.discoveryList) {
      setDiscovery(props.discoveryList);
    }
  }, [props.articleCategories, props.discoveryList, isMoreStated, searchQuery]);
  const dispatch = useDispatch();

  console.log('discovery ', props.discoveryList);

  const loadDiscoveries = (
    loadMore?: string,
    searchQuery?: string,
    callback?: any,
  ) => {
    const searchParams: DiscoveryGetListRequest = {
      limit: 10,
      offset: loadMore === 'more' ? Number(discovery.length) : 0,
      query: searchQuery,
    };
    if (
      JSON.stringify(omit(props.storedSearchParams, ['limit', 'offset'])) !==
      JSON.stringify(omit(searchParams, ['limit', 'offset']))
    ) {
      searchParams.offset = 0;
    }
    dispatch(props.getDiscoveryList({ ...searchParams, callback }));
  };

  const loadDiscovloadArticleCategoeries = (
    // loadType: ItemsLoadType = 'start',
    callback?: any,
  ) => {
    const searchParams: DiscoveryGetListRequest = {
      limit: 10,
      offset: 10,
      query: searchQuery,
    };

    if (
      JSON.stringify(omit(props.storedSearchParams, ['limit', 'offset'])) !==
      JSON.stringify(omit(searchParams, ['limit', 'offset']))
    ) {
      searchParams.offset = 0;
    }

    dispatch(props.getCategoriesList({ ...searchParams, callback }));
  };

  const marginAdder = (isSmall: boolean): void => {
    if (isSmall) {
      setMargin(400);
    } else {
      setMargin(20);
    }
  };
  return (
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
        <div {...props} className={'main-wrapper-discovery'} />
      )}>
      <SearchBar inputValueFromSearch={searchQueryProcessor} onCloseHandler={onCloseHandler}/>
      <div className={'discovery'}>
        <Menu marginAdder={marginAdder} articleCategories={articleCategories} />
        <DiscoveryTopicList
          margin={margin}
          discoveryItems={discovery}
          isLoading={props.isLoading}
          itemsCount={props.itemsCount}
        />
      </div>
    </Scrollbars>
  );
};

export default connect(
  (state: IStore) => ({
    discoveryList: state.discoveryListReducer.discoveryList.items,
    storedSearchParams: state.discoveryListReducer.storedSearchParams,
    articleCategories: state.ArticleReducer.articleCategoriesObject.items,
    itemsCount: state.discoveryListReducer.discoveryList.counts,
    isLoading: state.discoveryListReducer.isLoading,
  }),
  {
    getDiscoveryList: getDiscoveryList.request,
    getCategoriesList: getArticlesCategoriesAction.request,
  },
)(Discovery);
