import React from 'react';
import MockRedux from './mock_provider';
import MockRouter from './mock_router';

const MockProviders = ({ children, store }) => (
  <MockRedux store={store}>
    <MockRouter>{children}</MockRouter>
  </MockRedux>
);

export default MockProviders;
