import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { omit, isEmpty } from 'lodash';
import { connect, useDispatch } from 'react-redux';

// components
import Menu from './TopicMenu';
import DiscoveryTopicList from './List/TopicsList';
import SearchBar from '../../Component/SearchBar/SearchBar';

// actions
import { getDiscoveryList } from 'Controller/Discovery/actions';
import { getArticlesCategoriesAction } from 'Controller/articleCategory/actions';

// interfaces
import { IStore } from '../../Controller/model';
import { ArticleDTO, ArticleGetListResponse } from '@ternala/frasier-types';

import { DiscoveryGetListRequest } from '@ternala/frasier-types';

interface IProps extends RouteComponentProps {
  storedSearchParams: any;
}

const Discovery: React.FC<any> = ({ ...props }) => {
  const [margin, setMargin] = useState<number>(20);
  const [items, setItems] = useState<any>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [articleCategories, setArticleCategories] = useState<ArticleDTO[]>(undefined)

  useEffect(() => {
    if (!items && props.discoveryList !== undefined) {
      loadDiscoveries();
      setItems(props.discoveryList);
    }
    if (!articleCategories && props.articleCategories !== undefined) {
      loadDiscovloadArticleCategoeries();
      setArticleCategories(props.articleCategories);
    }
    console.log('items ', items);
    console.log('articles', articleCategories);
  }, [items, articleCategories]);

  const dispatch = useDispatch();

  const loadDiscoveries = (
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
      searchParams.offset = 10;
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
      searchParams.offset = 10;
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
    <>
      <SearchBar />
      <div className={'discovery'}>
        <Menu marginAdder={marginAdder} />
        <DiscoveryTopicList margin={margin} />
      </div>
    </>
  );
};

export default connect(
  (state: IStore) => ({
    discoveryList: state.discoveryListReducer.discoveryList.items,
    storedSearchParams: state.discoveryListReducer.storedSearchParams,
    articleCategories: state.ArticleReducer.articleCategoriesObject.items,
  }),
  {
    getDiscoveryList: getDiscoveryList.request,
    getCategoriesList: getArticlesCategoriesAction.request,
  },
)(Discovery);
