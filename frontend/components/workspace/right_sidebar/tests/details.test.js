import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Details } from '../details.jsx';
import MockProviders from '../../../../util/utilTest/mock_providers';
import { user1, channels } from '../../../../util/utilTest/test_data';

describe('App', () => {
  test('renders Details component', () => {
    render(
      <MockProviders store={{ session: { currentUser: user1 } }}>
        <Details currentUserId={1} currentChannel={1} channel={channels[0]} match={{ params: {} }} />
      </MockProviders>
    );

    expect(screen.getByText('Details')).toBeInTheDocument();
  });

  test('renders Details About component', () => {
    render(
      <MockProviders store={{ session: { currentUser: user1 } }}>
        <Details currentUserId={1} currentChannel={1} channel={channels[0]} match={{ params: { modifier: 'about' } }} />
      </MockProviders>
    );

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('A channel for marketing')).toBeInTheDocument();
    expect(screen.queryByText(user1.username)).toBeNull();
  });

  test('renders Details Members component', () => {
    render(
      <MockProviders store={{ session: { currentUser: user1 } }}>
        <Details
          currentUserId={1}
          currentChannel={1}
          channel={channels[0]}
          match={{ params: { modifier: 'members' } }}
        />
      </MockProviders>
    );

    expect(screen.getByText('Members')).toBeInTheDocument();
    expect(screen.getByText(user1.username)).toBeInTheDocument();
    expect(screen.queryByText('A channel for marketing')).toBeNull();
  });
});
