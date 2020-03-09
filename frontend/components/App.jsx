import React from 'react';
import GreetingContainer from './greeting/greeting_container';

const App = ({ children, location }) => (
  <div>
    <GreetingContainer />
    <h1>Welcome to CleanChat</h1>
    <p>Cleanchat is the quickest way to stay in touch with your team.</p>
    {children}
  </div>
);

export default App;
