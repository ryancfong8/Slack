import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';
import MockProviders from '../util/utilTest/mock_providers';

describe('App', () => {
  test('renders App component', () => {
    render(
      <MockProviders>
        <App />
      </MockProviders>
    );

    expect(screen.getByText('ChatHero assembles your team together, wherever you are')).toBeInTheDocument();
  });
});
