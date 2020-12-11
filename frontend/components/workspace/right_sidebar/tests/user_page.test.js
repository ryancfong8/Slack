import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import UserPage from '../user_page.jsx';
import MockProviders from '../../../../util/utilTest/mock_providers';
import { user1, user2, channels } from '../../../../util/utilTest/test_data';

describe('App', () => {
  test('renders UserPage component', async () => {
    const getUser = jest.fn();
    getUser.mockReturnValue(user1);
    render(
      <MockProviders store={{ session: { currentUser: user1 } }}>
        <UserPage
          currentUserId={1}
          currentChannel={1}
          channel={channels[0]}
          match={{ params: {} }}
          selectedUser={user1}
          getUser={getUser}
          currentUser={user1}
        />
      </MockProviders>
    );

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Display Name')).toBeInTheDocument();
    expect(screen.getByText('Date Joined')).toBeInTheDocument();
    expect(screen.getByText(user1.username)).toBeInTheDocument();
    expect(screen.getByText(user1.name)).toBeInTheDocument();
  });
  test('renders Edit Button if selected user is same as current user', async () => {
    const getUser = jest.fn();
    getUser.mockReturnValue(user1);
    render(
      <MockProviders store={{ session: { currentUser: user1 } }}>
        <UserPage
          currentUserId={1}
          currentChannel={1}
          channel={channels[0]}
          match={{ params: {} }}
          selectedUser={user1}
          getUser={getUser}
          currentUser={user1}
        />
      </MockProviders>
    );

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
  });
  test('does not render edit button if current user is not the selected user', async () => {
    const getUser = jest.fn();
    getUser.mockReturnValue(user2);
    render(
      <MockProviders store={{ session: { currentUser: user1 } }}>
        <UserPage
          currentUserId={1}
          currentChannel={1}
          channel={channels[0]}
          match={{ params: {} }}
          selectedUser={user2}
          getUser={getUser}
          currentUser={user1}
        />
      </MockProviders>
    );

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    expect(screen.queryByText('Edit Profile')).toBeNull();
    expect(screen.getByText(user2.username)).toBeInTheDocument();
    expect(screen.getByText(user2.name)).toBeInTheDocument();
  });
});
