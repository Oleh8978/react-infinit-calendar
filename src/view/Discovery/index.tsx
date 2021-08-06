import React, { useState, useEffect, createRef, RefObject } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { omit } from 'lodash';
import { connect, useDispatch } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

// components
import Menu from './TopicMenu';
import DiscoveryTopicList from './List/TopicsList';
import SearchBar from '@app/component/SearchBar/SearchBar';
import Loader from '@app/component/Loader';

// actions
import { getDiscoveryList } from '@app/controller/Discovery/actions';
import { getArticlesCategoriesAction } from '@app/controller/articleCategory/actions';

// interfaces
import { IStore } from '@app/controller/model';
import { ArticleDTO, DiscoveryDTO } from '@ternala/frasier-types';
import { DiscoveryGetListRequest } from '@ternala/frasier-types';

// constants
import { discoveryEntityTypeEnum } from '@ternala/frasier-types/lib/constants/main';


interface IProps extends RouteComponentProps {
  storedSearchParams: any;
}

const Discovery: React.FC<any> = ({ ...props }) => {
  const [margin, setMargin] = useState<number>(20);
  const [discovery, setDiscovery] = useState<DiscoveryDTO[]>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [articleCategories, setArticleCategories] =
    useState<ArticleDTO[]>(undefined);
  const [isJourneyClicked, setIsJourneyClicked] = useState<boolean>(false);
  const [smallLoader, setSmallLoader] = useState<boolean>(false);
  const [isDown, setIsDown] = useState<boolean>(false);
  const [isMoreStated, setISmoreStated] = useState<string>('start');
  const [ids, setIds] = useState<number[]>([]);
  const fieldRef = createRef() as RefObject<Scrollbars>;
  const [forse, setForse] = useState<boolean>(false);
  const [hiddenMenu, setHiddenMenu] = useState<boolean>(false);

  const loadMoreItems = () => {
    const { getClientHeight, getScrollHeight, getScrollTop, scrollToBottom } =
      fieldRef.current as Scrollbars;
    if (
      props.isLoading.status === false &&
      smallLoader === false &&
      getClientHeight() + getScrollTop() >= getScrollHeight() - 1 &&
      props.itemsCount && props.itemsCount.counts !== 0 &&
      discovery !== undefined &&
      props.itemsCount !== discovery.length
    ) {
      loadDiscoveries('more', searchQuery);
      setISmoreStated('more');

      if (
        discovery &&
        props.itemsCount && props.itemsCount.counts &&
        discovery.length === props.itemsCount
      ) {
        setIsDown(false);
        setSmallLoader(false);
      } else {
        setIsDown(true);
        setSmallLoader(true);
      }
    }
  };

  const searchQueryProcessor = (text: string) => {
    setSearchQuery(text.trim().toLowerCase());
    loadDiscoveries('start', searchQuery);
    if (text.trim().length !== 0) {
      loadDiscoveries('start', text.trim());
      setHiddenMenu(true);
    } else {
      loadDiscoveries('start', '');
      setHiddenMenu(false);
    }
  };

  const onCloseHandler = () => {
    loadDiscoveries('start', '');
    setSearchQuery('');
    setISmoreStated('start');
    setHiddenMenu(false);
  };

  useEffect(() => {
    if (props.discoveryList && props.discoveryList.items !== undefined && ids.length === 0) {
      setDiscovery(props.discoveryList.items);
      setISmoreStated('start');
    }

    if (
      articleCategories === undefined &&
      discovery === undefined &&
      searchQuery.trim().length === 0
    ) {
      loadDiscovloadArticleCategoeries();
      loadDiscoveries('start', searchQuery);
    }
    if (isMoreStated === 'more' && props.discoveryList && props.discoveryList.items !== undefined) {
      setDiscovery(props.discoveryList.items);
    }

    if (
      props.articleCategories !== undefined &&
      ids.length === 0 &&
      isJourneyClicked === false
    ) {
      setArticleCategories(props.articleCategories);
      setISmoreStated('start');
    }

    if (searchQuery.trim().length !== 0 && props.discoveryList && props.discoveryList.items) {
      setDiscovery(props.discoveryList.items);
    }

    if (isDown === true) {
      setSmallLoader(false);
      setIsDown(false);
    }

    if (forse === true) {
      setDiscovery(undefined);
      loadDiscoveries('start', searchQuery);
      setForse(false);
    }

    if (ids.length !== 0 && props.discoveryList && props.discoveryList.items!== undefined) {
      setDiscovery(props.discoveryList.items);
    }
  }, [
    props.articleCategories,
    props.discoveryList,
    isMoreStated,
    searchQuery,
    smallLoader,
    forse,
  ]);
  const dispatch = useDispatch();

  const loadDiscoveries = (
    loadMore?: string,
    searchQuery?: string,
    callback?: any,
  ) => {
    let searchParams: DiscoveryGetListRequest;

    if (discovery !== undefined && ids.length > 0) {
      searchParams = {
        limit: 10,
        offset: loadMore === 'more' ? Number(discovery.length) : 0,
        query: searchQuery,
        categories: ids,
        type: discoveryEntityTypeEnum.article,
      };
    } else if (isJourneyClicked) {
      searchParams = {
        limit: 10,
        offset: loadMore === 'more' ? Number(discovery.length) : 0,
        query: searchQuery,
        type: discoveryEntityTypeEnum.journey,
      };
    } else {
      searchParams = {
        limit: 10,
        offset: loadMore === 'more' ? Number(discovery.length) : 0,
        query: searchQuery,
      };
    }

    if (
      JSON.stringify(omit(props.storedSearchParams, ['limit', 'offset'])) !==
      JSON.stringify(omit(searchParams, ['limit', 'offset']))
    ) {
      searchParams.offset = 0;
    }
    dispatch(props.getDiscoveryList({ ...searchParams, callback }));
  };

  const loadDiscovloadArticleCategoeries = (callback?: any) => {
    const searchParams: DiscoveryGetListRequest = {
      limit: 100,
      offset: 0,
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

  const arraySetter = (id: number, element: string) => {
    if (
      ids.filter((elem) => elem === id).length === 0 &&
      articleCategories
        .filter((elem: any) => elem.id === id)[0]
        .title.toLowerCase() !== 'journeys'
    ) {
      setIds([id]);
      dispatch(
        props.getDiscoveryList({
          limit: 10,
          offset: 0,
          query: searchQuery,
          categories: [id],
          type: discoveryEntityTypeEnum.article,
        }),
      );
      setDiscovery(undefined);
      setIsJourneyClicked(false);
    } else if (
      articleCategories
        .filter((elem: any) => elem.id === id)[0]
        .title.toLowerCase() === 'journeys' &&
      isJourneyClicked === false
    ) {
      setIds([]);
      setIsJourneyClicked(true);
      dispatch(
        props.getDiscoveryList({
          limit: 10,
          offset: 0,
          query: searchQuery,
          type: discoveryEntityTypeEnum.journey,
        }),
      );
      setDiscovery(undefined);
    } else if (
      articleCategories
        .filter((elem: any) => elem.id === id)[0]
        .title.toLowerCase() === 'journeys' &&
      isJourneyClicked === true
    ) {
      setIds([]);
      setIsJourneyClicked(false);
      dispatch(
        props.getDiscoveryList({
          limit: 10,
          offset: 0,
          query: searchQuery,
        }),
      );
      setDiscovery(undefined);
    } else {
      setIds([]);
      setForse(true);
      setIsJourneyClicked(false);
    }
  };

  const allSetter = () => {
    dispatch(
      props.getDiscoveryList({
        limit: 10,
        offset: 0,
        query: searchQuery,
      }),
    );
    setDiscovery(undefined);
    setIds([]);
    setForse(true);
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
      {props.topicListLoader === true ||
      articleCategories === undefined ||
      props.discoveryList && props.discoveryList.items === undefined ? (
        <Loader isSmall={true} />
      ) : (
        <>
          <SearchBar
            inputValueFromSearch={searchQueryProcessor}
            onCloseHandler={onCloseHandler}
          />
          <div className={'discovery'}>
            <Menu
              marginAdder={marginAdder}
              articleCategories={articleCategories}
              loadDiscovloadArticleCategoeries={
                loadDiscovloadArticleCategoeries
              }
              arraySetter={arraySetter}
              allSetter={allSetter}
              hiddenMenu={hiddenMenu}
            />

            <DiscoveryTopicList
              margin={margin}
              discoveryItems={discovery}
              isLoading={props.isLoading}
              itemsCount={props.itemsCount}
            />
          </div>
        </>
      )}
    </Scrollbars>
  );
};

export default connect(
  (state: IStore) => ({
    discoveryList: state.discoveryListReducer.discoveryList,
    storedSearchParams: state.discoveryListReducer.storedSearchParams,
    articleCategories: state.ArticleReducer.articleCategoriesObject.items,
    itemsCount: state.discoveryListReducer.discoveryList,
    isLoading: state.discoveryListReducer.isLoading,
    topicListLoader: state.ArticleReducer.isLoading.status,
  }),
  {
    getDiscoveryList: getDiscoveryList.request,
    getCategoriesList: getArticlesCategoriesAction.request,
  },
)(Discovery);
