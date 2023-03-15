import React, {FC, PropsWithChildren} from 'react';

import {Context} from './context';
import {store} from "../store";

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
    return <Context.Provider value={store}>{children}</Context.Provider>;
};