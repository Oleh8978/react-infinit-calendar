import React, { useState, useEffect, createRef, RefObject } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

// actions
import {
  getTipsListRequest,
  setReadedItems,
} from '@app/controller/Tips/actions';

// components
import NavigationBar from '@app/component/NavigationBar';
import Loader from '@app/component/Loader';

// interfaces
import { IStore } from '@app/controller/model';
import { TipSendDTO } from '@ternala/frasier-types';

// utils
import { getSavedAccess } from '@app/utils/manageAccess';

interface IProps {
  counts: number;
}

// const CustomReRenderHook = () => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getStatisticList.request({}));
//     dispatch(getStatisticToday.request({}));
//   }, []);
// };

const TipsInfo: React.FC<any> = ({ ...props }) => {
  const [items, setItems] = useState<any>([]);
  const [unreadedItems, setUnreadedItems] = useState<any>([]);
  const fieldRef = createRef() as RefObject<Scrollbars>;
  const dispatch = useDispatch();

  const loadMoreItems = () => {
    const { getClientHeight, getScrollHeight, getScrollTop, scrollToBottom } =
      fieldRef.current as Scrollbars;
    if (
      props.counts &&
      props.items.length === props.counts
    ) {
      return;
    }

    if (
      getClientHeight() + getScrollTop() >= getScrollHeight() - 1 &&
      props.counts !== undefined &&
      props.userID !== undefined
    ) {
      dispatch(
        getTipsListRequest.request({
          searchParams: {
            limit: 20,
            offset: props.items.length,
          },
          userId: `${props.userID}`,
        }),
      );
    }

    return;
  };

  useEffect(() => {
    if (props.counts === undefined) {
      dispatch(
        getTipsListRequest.request({
          searchParams: {
            limit: 1000,
            offset: 0,
          },
          userId: `${props.userID}`,
        }),
      );
    }

    if (props.counts) {
      setItems(props.items);
      setUnreadedItems(
        props.items
          .filter((item: TipSendDTO) => item.isRead === false)
          .map((elem: TipSendDTO) => {
            return elem.id;
          }),
      );
      dispatch(
        setReadedItems.request({
          accessToken: getSavedAccess().accessToken,
          readedIds: unreadedItems,
        }),
      );
    }
  }, [props.counts]);
  // console.log('unreadedItems ', unreadedItems);
  console.log('props.items', props.items);
  // console.log('props.userID ', props.userID);
  return (
    <>
      {props.counts === undefined ? (
        <Loader isSmall={false} />
      ) : (
        <div className={'tips-main'}>
          <NavigationBar rout={'account'} name={'Tips'} hasSaveButton={false} />
        <Scrollbars
          style={{
            position: 'inherit',
            width: '100%',
            maxWidth: 639,
            height: '100%',
            maxHeight: '100%',
            display: 'flex',
          }}
          ref={fieldRef}
          onScroll={loadMoreItems}>
          <div className={'tips-main-body'}>
            {items
              .filter((item: TipSendDTO) => item.isRead === false)
              .filter((elem: TipSendDTO) => Object.keys(elem.tip).length !== 0)
              .map((elem) => {
                return (
                  <div className="tips-main-body-item-wrapper-unread">
                    <div className={'tips-main-body-item-unread'}>
                      <>
                        {elem.tip.image ? (
                          <img
                            src={elem.tip.image}
                            className={'tips-main-body-item-img'}
                            alt="img"
                          />
                        ) : (
                          <> </>
                        )}
                      </>
                      <span className={'tips-main-body-item-text'}>
                        {elem.tip.copy}
                      </span>
                    </div>
                  </div>
                );
              })}
            {items
              .filter((item: TipSendDTO) => item.isRead === true)
              .filter((elem: TipSendDTO) => Object.keys(elem.tip).length !== 0)
              .map((elem) => {
                return (
                  <div className="tips-main-body-item-wrapper">
                    <div className={'tips-main-body-item-read'}>
                      <>
                        {elem.tip.image ? (
                          <img
                            src={elem.tip.image}
                            className={'tips-main-body-item-img'}
                            alt="img"
                          />
                        ) : (
                          <> </>
                        )}
                      </>
                      <span className={'tips-main-body-item-text'}>
                        {elem.tip.copy}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
          </Scrollbars>
          
        </div>
      )}
    </>
  );
};

export default connect(
  (state: IStore) => ({
    counts: state.tipsListReducer.tips.itemsCount,
    items: state.tipsListReducer.tips.items,
    userID: state.authState.user.id,
    loader: state.tipsListReducer.loaderState.status,
  }),
  { getTipsListRequest, setReadedItems },
)(TipsInfo);
