import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

// components
import { Link } from 'react-router-dom';

// interfaces
import { ExpertDTO } from '@ternala/frasier-types';
import { IStore } from '@app/controller/model';

// actions
import { setSelectedExpert } from '@app/controller/selectedExpert/actions';

interface IProps {
  people: any;
  isMain: boolean;
  marginBottom?: boolean;
}

interface IExtendedExpertDTO extends ExpertDTO {
  isActive: boolean;
}

const Slider: React.FC<any> = ({ ...props }) => {
  const [experts, setExperts] = useState<IExtendedExpertDTO[]>([]);
  const dispatch = useDispatch();

  const moseMover = (ele) => {
    let pos = { top: 0, left: 0, x: 0, y: 0 };
    const mouseDownHandler = (e) => {
      pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
        x: e.clientX,
        y: e.clientY,
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = (e) => {
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      ele.scrollTop = pos.top - dy;
      ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    if (ele !== null) ele.addEventListener('mousedown', mouseDownHandler);
  };

  useEffect(() => {
    const elementGenral = document.querySelector('.overview-help-slider ');
    moseMover(elementGenral);
    if (props.people !== undefined) {
      const arr = [];
      props.people.map((item: ExpertDTO) => {
        if (props.selectedExpert === item.id) {
          arr.push({
            ...item,
            isActive: true,
          });
        } else {
          arr.push({
            ...item,
            isActive: false,
          });
        }
      });
      setExperts(arr);
    }
    // else if (props.people !== undefined && props.selectedExpert === undefined) {
    //   const arr = [];
    //   props.people.map((item: ExpertDTO) => {
    //     if (props.people.indexOf(item.id) == 0 ) {
    //       arr.push({
    //         ...item,
    //         isActive: true,
    //       });
    //     } else {
    //       arr.push({
    //         ...item,
    //         isActive: false,
    //       });
    //     }

    //   });
    //   setExperts(arr);
    // }
  }, [props.people, props.selectedExpert]);

  const selectExpert = (id: any) => {
    const arr = [...experts];
    arr.map((item) => {
      if (item.id !== id) {
        item.isActive = false;
        return item;
      } else {
        item.isActive = true;
        return item;
      }
    });
    setExperts(arr);
  };

  return (
    <>
      <div
        className={
          props.marginBottom
            ? 'overview-help-slider__marginnull scrollbar__hidden'
            : 'overview-help-slider scrollbar__hidden'
        }>
        {experts.map((persone) => {
          return (
            <>
              {' '}
              {props.isMain ? (
                <Link
                  to={`/expert-help/expert`}
                  className="overview-help-slider-item"
                  onClick={() => {
                    selectExpert(persone.id);
                    dispatch(setSelectedExpert({ expert: persone.id }));
                  }}>
                  <img
                    src={persone.image}
                    className="overview-help-slider-item-img"
                  />
                  <span className="overview-help-slider-item-name">
                    {persone.name}
                  </span>
                  <div className="overview-help-slider-item__bottom-line" />
                </Link>
              ) : (
                <div
                  className="overview-help-slider-item"
                  onClick={() => {
                    selectExpert(persone.id);
                    dispatch(setSelectedExpert({ expert: persone.id }));
                  }}>
                  <img
                    src={persone.image}
                    className="overview-help-slider-item-img"
                  />
                  <span className="overview-help-slider-item-name">
                    {persone.name}
                  </span>
                  {persone.isActive ? (
                    <div
                      className="overview-help-slider-item__bottom-line"
                      style={{ backgroundColor: 'rgba(129, 121, 220, 0.2)' }}
                    />
                  ) : (
                    <div className="overview-help-slider-item__bottom-line" />
                  )}
                </div>
              )}
            </>
          );
        })}
      </div>
    </>
  );
};

export default connect(
  (state: IStore) => ({
    selectedExpert: state.ExpertSelectedStateReducer.expert,
  }),
  {
    setSelectedExpert,
  },
)(Slider);
