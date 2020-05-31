import React from 'react';

export const LoadingPage = (props) => {
  return (
    <div className="h-100 w-100 d-flex flex-column align-items-center justify-content-center">
      <h1 className="loading-title">ChatHero</h1>
      <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>
    </div>
  );
};
