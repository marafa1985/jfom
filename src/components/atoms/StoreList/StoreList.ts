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

export const StoreList = (storeList: Store[]) => {
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
