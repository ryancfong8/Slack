import React from 'react';
import { HashRouter } from 'react-router-dom';

const MockRouter = ({ children }) => {
  return <HashRouter>{children}</HashRouter>;
};

export default MockRouter;
