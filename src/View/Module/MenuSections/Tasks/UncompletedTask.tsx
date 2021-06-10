import React, { useState, useEffect } from 'react';

// components
import UncompletedListItem from './UncompletedListItem';

// interfaces
import { ICalendarData, IListCalendarItem } from './Models';

// utils
import { numDayShortMonth } from './utils';

interface IProps {
  data: ICalendarData;
  setCheckButton: (id: number) => void;
}

const UncompletedTask: React.FC<IProps> = ({ ...props }) => {
  const [elements, setElements] = useState<ICalendarData | undefined>(
    undefined,
  );
  useEffect(() => {
    setElements(props.data);
  }, [props.data]);
  // console.log('elements ', elements)
  return (
    <>
      {elements && (
        <div className={'tasks-uncompleted'}>
          <span className="tasks-uncompleted-headeritem">
            {numDayShortMonth(elements.time)}
          </span>
          {elements.tasks.map((item) => {
            return item.items.map((elem) => {
              if (elem.isChecked === false) {
                return (
                  <UncompletedListItem
                    element={elem}
                    setCheckButton={props.setCheckButton}
                  />
                );
              }
            });
          })}
        </div>
      )}
    </>
  );
};

export default UncompletedTask;
