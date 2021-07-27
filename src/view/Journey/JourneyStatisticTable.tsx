import React, { useState } from 'react';
import { ModuleStatistic } from '@ternala/frasier-types';

// components

interface IProps {
  data: ModuleStatistic[];
}

const JourneyStatisticTable: React.FC<IProps> = ({ data }) => {
  return (
    <div className="journeytable">
      <table>
        {data.map((item) => {
          return (
            <tr>
              <th className="journeytable-title">{item.title}</th>
              <th className="journeytable-hours">{`${item.statistic.spent} / ${item.statistic.maxSpent} hrs`}</th>
              <th className="journeytable-percent">{`${Math.round(
                (item.statistic.spent / item.statistic.maxSpent) * 100,
              )} %`}</th>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default JourneyStatisticTable;
