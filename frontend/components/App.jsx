import React from 'react';
import GreetingContainer from './greeting/greeting_container';

const App = ({ children, location }) => (
  <div className="w-100 h-100 pr-4 pl-4">
    <GreetingContainer />
    <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
      <h1>Welcome to ChatHero</h1>
      <p>ChatHero is the quickest way to stay in touch with your team.</p>
    </div>
    {children}
  </div>
);

export default App;
