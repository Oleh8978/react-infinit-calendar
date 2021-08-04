import { addNewTip } from '@app/controller/Tips/actions';
import { INamespaceInterface } from './models';

export const namespaces: INamespaceInterface[] = [
  {
    title: 'tip',
    events: [
      {
        eventName: 'NewTip',
        action: addNewTip,
      },
    ],
  },
];
