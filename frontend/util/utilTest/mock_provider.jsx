import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../store/store.js';

const MockProvider = ({ children, store = {} }) => <Provider store={configureStore(store)}>{children}</Provider>;

export default MockProvider;
