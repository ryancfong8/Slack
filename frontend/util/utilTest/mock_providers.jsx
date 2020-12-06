import React from 'react';
import MockRedux from './mock_provider';
import MockRouter from './mock_router';

const MockProviders = ({ children, query, user, store }) => (
  <MockRedux state={store}>
    <MockRouter query={query}>{children}</MockRouter>
  </MockRedux>
);

export default MockProviders;
