import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

// componets
import Link from '@app/routing/Link';
import Loader from '@app/component/Loader';

// actions
import { getTipsListRequest } from '@app/controller/Tips/actions';

// interfaces
import { IStore } from '@app/controller/model';
import { TipSendShortDTO } from '@ternala/frasier-types/lib/modules/tip/send/tipSendShort.dto';

// static
import imgW from './static/messageW.png';
import imgM from './static/messageM.png';
import oldTip from './static/oldtips.png';

interface IProps {
  counts: number;
}

const Tips: React.FC<any> = ({ ...props }) => {
  const images = [imgW, imgM];
  const [number, setNumber] = useState<number>(undefined);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [img, setImg] = useState<string>(images[Math.floor(Math.random() * 2)]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.counts === undefined) {
      dispatch(
        props.getTipsListRequest({
          searchParams: {
            limit: 1000,
            offset: 0,
          },
          userId: `${props.userID}`,
        }),
      );
    }

    if (props.counts !== undefined) {
      setNumber(
        props.items.filter((item: TipSendShortDTO) => item.isRead === false)
          .length,
      );
    }

    if (
      props.items &&
      props.items.filter((item: TipSendShortDTO) => item.isRead === false)
        .length === 0
    ) {
      setIsNew(false);
    } else {
      setIsNew(true);
    }
  }, [props.items]);

  if (props.items.filter((item: TipSendShortDTO) => item.isRead === false)
  .length === 0 ) {
    return <></>;
  }
  return (
    <>
      {props.counts
      &&
      !props.loader ? (
        <div className={'tips'}>
          <span className={'tips-header'}>Tips from frasier</span>
          <Link to={'tip-list'} className={'tips-wrapper'}>
            {number && <span className={'tips-number'}>{number}</span>}
            {isNew ? <span className={'tips-new'}>new</span> : <> </>}
            <span className={'tips-tip'}>tips</span>
            <img
              src={img}
              className={'tips-persone'}
              alt="img"
              style={{
                marginTop: img === imgW ? '-12px' : '-40px',
                marginRight: img === imgW ? '22px' : '5px',
              }}
            />
          </Link>
        </div>
      ) : (
        <Loader isSmall={true} />
      )}
    </>
  );
};

export default connect(
  (state: IStore) => ({
    counts: state.tipsListReducer.tips.itemsCount,
    loader: state.tipsListReducer.loaderState.status,
    items: state.tipsListReducer.tips.items,
    userID: state.authState.user.id,
  }),
  {
    getTipsListRequest: getTipsListRequest.request,
  },
)(Tips);
