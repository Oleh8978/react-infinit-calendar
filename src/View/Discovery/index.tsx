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

// HOC
import useScrollListener from 'View/Schedule/Calendar/customHOC';

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
  const [itemsCount, setItemsCount] = useState<number>(0);
  const fieldRef = createRef() as RefObject<Scrollbars>;

  const handleScroll = () => {
    const scrolled = document.querySelector(
      '.main-wrapper-discovery',
    ) as HTMLElement;
    if (
      props.itemsCount > discovery.length &&
      props.isLoading.status === false
    ) {
      if (scrolled.scrollHeight - 700 <= scrolled.scrollTop) {
        console.log('inn');
        // props.loadMore('more');
      }
    }
  };
  //   if (
  //     !this.props.allItemsLoaded &&
  //     !this.state.isLoading &&
  //     (getClientHeight() + getScrollTop() >= getScrollHeight() - ITEMS_LOADER_HEIGHT)
  //  ) {
  //     this.setState(() => ({ isLoadingMore: true }))
  //     scrollToBottom()
  //     this.props.onLoadMore('more', () =>
  //        this.setState(() => ({ isLoadingMore: false }))
  //     )
  //     this.props.onLoadMore('more')
  //  }

  // useScrollListener(fieldRef, handleScroll, 5000);

  useEffect(() => {
    if (props.discoveryList !== undefined) {
      setDiscovery(props.discoveryList);
      setItemsCount(props.itemsCount);
    }

    if (articleCategories === undefined && discovery === undefined) {
      loadDiscovloadArticleCategoeries();
      loadDiscoveries();
    }

    if (props.articleCategories !== undefined) {
      setArticleCategories(props.articleCategories);
    }
  }, [props.articleCategories, props.discoveryList]);

  const dispatch = useDispatch();

  const loadDiscoveries = (callback?: any, loadMore?: string) => {
    console.log(' inn load more ');
    const searchParams: DiscoveryGetListRequest = {
      limit: 10,
      offset: loadMore === 'more' ? discovery.length : 0,
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
      ref={fieldRef}
      renderView={(props) => (
        <div {...props} className={'main-wrapper-discovery'} />
      )}>
      <SearchBar />
      <div className={'discovery'}>
        <Menu marginAdder={marginAdder} articleCategories={articleCategories} />
        <DiscoveryTopicList
          margin={margin}
          discoveryItems={discovery}
          isLoading={props.isLoading}
          itemsCount={props.itemsCount}
          loadMore={loadDiscoveries}
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
