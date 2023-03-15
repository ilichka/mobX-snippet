import { useContext } from 'react';

import { Context } from '../context';
import { RootStore } from '../entities/root';

export const useStore = (): RootStore => {
    const rootStore = useContext(Context);

    if (!rootStore) {
        throw new Error('useStore must be used within a StoreProvider');
    }

    return rootStore;
};