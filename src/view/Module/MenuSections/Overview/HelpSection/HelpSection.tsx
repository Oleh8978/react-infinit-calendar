import React, { useState } from 'react';

interface IProps {
  header: string;
  description: string;
}

const HelpSection: React.FC<IProps> = ({ ...props }) => {
  return (
    <>
      <div className="overview-help">
        <span className="overview-help-header">{props.header}</span>
        <span className="overview-help-description">{props.description}</span>
      </div>
    </>
  );
};

export default HelpSection;
