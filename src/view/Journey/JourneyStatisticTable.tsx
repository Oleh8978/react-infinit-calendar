import React from 'react';
import { ModuleStatistic } from '@ternala/frasier-types';

// components

interface IProps {
  data: ModuleStatistic[];
}

const JourneyStatisticTable: React.FC<IProps> = ({ data }) => {
  const mathConverter = (argument: any) => {
    if (Number.isInteger(argument)) {
      return argument;
    }
    return Number.parseFloat(argument).toFixed(1);
  };

  return (
    <div className="journeytable">
      <table>
        {data.map((item) => {
          if (Object.keys(item.statistic).length >= 2) {
            return (
              <tr>
                <th className="journeytable-title">{item.title}</th>
                <th className="journeytable-hours">{`${mathConverter(
                  item.statistic.spent / 60,
                )} / ${mathConverter(item.statistic.maxSpent / 60)} hrs`}</th>
                <th className="journeytable-percent">{`${Math.round(
                  (item.statistic.spent / item.statistic.maxSpent) * 100,
                )} %`}</th>
              </tr>
            );
          } else {
            return (
              <tr>
                <th className="journeytable-title">{item.title}</th>
                <th className="journeytable-hours">{`${mathConverter(
                  item.statistic.spent / 60,
                )} hrs`}</th>
                <th className="journeytable-percent"></th>
              </tr>
            );
          }
        })}
      </table>
    </div>
  );
};

export default JourneyStatisticTable;
