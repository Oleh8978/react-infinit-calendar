import React, { useEffect, useState, createRef, RefObject } from 'react';
import { connect, useDispatch } from 'react-redux';

// scrolbars
import { Scrollbars } from 'react-custom-scrollbars';

//lodash
import { omit } from 'lodash';

// components
import NavigationBar from '@app/component/NavigationBar';
import Loader from '@app/component/Loader';
import NotesList from './List';

// actions
import { getNotesList } from '@app/controller/notes/actions';

// interfaces
import { IStore } from '@app/controller/model';
import { INotesSearchParams } from '@app/controller/notes/models';

interface IProps {}

const Notes: React.FC<any> = ({ ...props }) => {
  const [isSmallLoader, setIsSmallLoader] = useState<boolean>(true);
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
        limit: 10,
        offset: loadMore === 'more' ? Number(props.data.length) : 0,
        query: searchQuery,
        user: props.user,
      };
    } else {
      searchParams = {
        limit: 10,
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

  useEffect(() => {
    if (props.count === undefined) {
      loadNotesData();
    }

    if (
      props.data !== undefined &&
      props.count !== undefined &&
      props.count === props.data.length
    ) {
      setIsSmallLoader(false);
    }
  }, [props.count]);
  console.log('notes ', props.data);
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
      <NavigationBar rout={'account'} name={'My Notes'} hasSaveButton={false} />
      {props.data !== undefined ? (
        <NotesList data={props.data} isSmallLoader={isSmallLoader} />
      ) : (
        <Loader isSmall={false} />
      )}
    </Scrollbars>
  );
};

export default connect(
  (state: IStore) => ({
    data: state.notesListReducer.state.items,
    count: state.notesListReducer.state.counts,
    user: state.authState.user.id,
  }),
  { getNotesList },
)(Notes);
