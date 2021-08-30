import React, { useEffect, useState, createRef, RefObject } from 'react';
import { connect, useDispatch } from 'react-redux';

// scrolbars
import { Scrollbars } from 'react-custom-scrollbars';

//lodash
import { omit } from 'lodash';

// components
import NavigationBar from '@app/component/NavigationBar';
import SearchBar from '@app/component/SearchBar/SearchBar';
import Loader from '@app/component/Loader';
import NotesList from './List';

// actions
import { getNotesList } from '@app/controller/notes/actions';
import {
  getNoteByID,
  setLoadingAction,
} from '@app/controller/singleNote/actions';

// history
import history from '@app/historyApi';

// interfaces
import { IStore } from '@app/controller/model';
import { INotesSearchParams } from '@app/controller/notes/models';

interface IProps {}

const CustomReRenderHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotesList.request({}));
  }, []);
};

const Notes: React.FC<any> = ({ ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [typingTimeOut, setTypingTimeOut] = useState<any>(0);
  const [searchQuery, setSearchQuery] = useState<string>('')

  const fieldRef = createRef() as RefObject<Scrollbars>;
  const dispatch = useDispatch();

  const loadMoreItems = () => {
    const { getClientHeight, getScrollHeight, getScrollTop, scrollToBottom } =
      fieldRef.current as Scrollbars;
    if (
      getClientHeight() + getScrollTop() >= getScrollHeight() - 1 &&
      props.count !== 0 &&
      props.count !== props.data.length
    ) {
      loadNotesData('more');
    }
  };

  const loadNotesData = (
    loadMore?: string,
    searchQuery?: string,
    callback?: any,
  ) => {
    let searchParams: INotesSearchParams;

    if (props.data !== undefined) {
      searchParams = {
        limit: 20,
        offset: loadMore === 'more' ? Number(props.data.length) : 0,
        query: searchQuery,
        user: props.user,
      };
    } else {
      searchParams = {
        limit: 20,
        offset: loadMore === 'more' ? Number(props.data.length) : 0,
        query: searchQuery,
        user: props.user,
      };
    }
    if (
      JSON.stringify(omit(props.storedSearchParams, ['limit', 'offset'])) !==
      JSON.stringify(omit(searchParams, ['limit', 'offset']))
    ) {
      searchParams.offset = 0;
    }
    dispatch(getNotesList.request({ ...searchParams, callback }));
  };

  // CustomReRenderHook();

  useEffect(() => {
    if (!props.count && props.singleNoteLoader === false) {
      loadNotesData();
    }

    if (
      String(String(location.pathname).search(/\/note-details\/(.*)/g)) === '-1'
    ) {
      dispatch(getNoteByID.success(undefined));
    }
  }, [props.count, props.singleNoteLoader]);

  const tracker = (text: string) => {
    if (typingTimeOut) {
      clearTimeout(typingTimeOut);
    }
    setTypingTimeOut( setTimeout(function () {
          setIsLoading(false)
          setSearchQuery(text)
          loadNotesData('start', text)
          console.log('text ', text)
          // loadDiscoveries('start', text.trim())
        }, 5000)
   );

  }

  const searchQueryProcessor = (text: string) => {
    setIsLoading(true)
    tracker(text)
  }

  const onCloseHandler = () => {
    console.log('close')
  }

const bodyOfNotes = () => {

  if (isLoading === true ) {
    return <Loader isSmall={false} />
  }

  if (props.data !== undefined ) {
    return <NotesList data={props.data} counts={props.count} />
  }

  return <Loader isSmall={false} />

}
 

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
      renderView={(props) => <div {...props} className={'notes'} />}>
      <SearchBar
            textHead={'Notes'}
            inputValueFromSearch={searchQueryProcessor}
            onCloseHandler={onCloseHandler}
            />
      {bodyOfNotes()}
    </Scrollbars>
  );
};

export default connect(
  (state: IStore) => ({
    data: state.notesListReducer.state.items,
    storedSearchParams: state.notesListReducer.storedSearchParams,
    count: state.notesListReducer.state.counts,
    user: state.authState.user.id,
    singleNoteLoader: state.singleNoteReducer.loaderState.status,
  }),
  { getNotesList, getNoteByID, setLoadingAction },
)(Notes);
