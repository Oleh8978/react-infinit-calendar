import React, { useState } from 'react';

// components

interface IProps {
  data: any;
}

const Tab: React.FC<IProps> = ({...props}) => {
  const [isActive, setIsActive] = useState<boolean>(true);

  const TabTitle = (props) => {
    return(
      props.isActive === props.dataTab
        ? <li onClick={props.onClick} className="tab-title tab-title--active" data-tab={props.dataTab} style={{width: `${props.tabWidth}%`}}>{props.title}</li>
        : <li onClick={props.onClick} className="tab-title" data-tab={props.dataTab} style={{width: `${props.tabWidth}%`}}>{props.title}</li>
    )
  }

  const TabContent = (props) => {
    return(
      <div className={"tab-content-item"} style={props.style} data-tab={props.dataTab}>{props.content}</div>
    )
  }

  const changeActive = (ev) => {
    setIsActive(ev.target.getAttribute("data-tab"));
  }

  return (
      <div className="tab">
        <ul className="tab-titles">
          {props.data.map((item) =>
            <TabTitle isActive={isActive} onClick={changeActive} dataTab={item.id} title={item.tabTitle} tabWidth={Math.round(100 / props.data.length)} />
          )}
        </ul>
        <div className="tab-content">
          {props.data.map((item) =>
            isActive === item.id
              ? <TabContent  dataTab={item.id} content={item.tabContent} />
              : <TabContent style={{display: 'none'}} dataTab={item.id} content={item.tabContent} />
          )}
        </div>
      </div>
  );
}

export default Tab;
