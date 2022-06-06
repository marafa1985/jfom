import { FC } from 'lib/component';

export type Store = {
  key: string;
  title: string;
};

export const stores: Store[] = [
  {
    key: 'alleStores',
    title: 'Alle Stores'
  },
  {
    key: 'dresden',
    title: 'Dresden Elbepark'
  }
];

export const StoreList: FC<Store[]> = storeList => {
  const controlList: any = {};
  storeList.forEach(
    store =>
      (controlList[store.key + 'Li'] = {
        radioWithLabelRadio: {
          name: 'store'
        },
        radioWithLabel: {
          innerHTML: store.title
        }
      })
  );
  return controlList;
};
