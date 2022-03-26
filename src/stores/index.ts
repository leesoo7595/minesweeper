import { useContext, createContext } from 'react';
import gameStore from './GameStore';

export const stores = {
  gameStore,
};

export const storesContext = createContext({
  ...stores,
});

const useStores = () => useContext(storesContext);
export default useStores;
