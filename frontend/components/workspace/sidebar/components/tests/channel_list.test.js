import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import ChannelListItem from '../channel_list_item.jsx';
import MockProviders from '../../../../../util/utilTest/mock_providers';
import { user1, channels } from '../../../../../util/utilTest/test_data';

describe('App', () => {
  test('renders ChannelListItem component', () => {
    render(
      <MockProviders store={{ session: { currentUser: user1 } }}>
        <ChannelListItem currentUserId={1} currentChannel={1} channel={channels[0]} />
      </MockProviders>
    );

    expect(screen.getByText(/marketing/i)).toBeInTheDocument();
  });
});
