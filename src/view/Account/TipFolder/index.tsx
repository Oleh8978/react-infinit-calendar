import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

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
import { TipSendShortDTO } from '@ternala/frasier-types/lib/modules/tip/send/tipSendShort.dto';

// utils
import { getSavedAccess } from '@app/utils/manageAccess';

interface IProps {
  counts: number;
}

const TipsInfo: React.FC<any> = ({ ...props }) => {
  const [items, setItems] = useState<any>([]);
  const [unreadedItems, setUnreadedItems] = useState<any>([]);
  const dispatch = useDispatch();

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
          .filter((item: TipSendShortDTO) => item.isRead === false)
          .map((elem: TipSendShortDTO) => {
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
  }, [props.items]);
  // console.log('unreadedItems ', unreadedItems);
  // console.log('props.items', props.items);
  // console.log('props.userID ', props.userID);
  return (
    <>
      {props.loader ? (
        <Loader isSmall={true} />
      ) : (
        <div className={'tips-main'}>
          <NavigationBar rout={'account'} name={'Tips'} hasSaveButton={false} />
          <div className={'tips-main-body'}>
            {items
              .filter((item: TipSendShortDTO) => item.isRead === false)
              .map((elem) => {
                return (
                  <div className="tips-main-body-item-wrapper">
                    <div className={'tips-main-body-item-unread'}>
                      <span className={'tips-main-body-item-text'}>
                        {elem.makeAt}
                      </span>
                    </div>
                  </div>
                );
              })}
            {items
              .filter((item: TipSendShortDTO) => item.isRead === true)
              .map((elem) => {
                return (
                  <div className="tips-main-body-item-wrapper">
                    <div className={'tips-main-body-item-read'}>
                      <span className={'tips-main-body-item-text'}>
                        {elem.makeAt}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
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
