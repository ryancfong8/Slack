import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ChannelForm from '../channel_form.jsx';
import MockProviders from '../../../../../util/utilTest/mock_providers';
import { user1 } from '../../../../../util/utilTest/test_data';

describe('App', () => {
  test('renders ChannelForm component', () => {
    render(
      <MockProviders store={{ session: { currentUser: user1 } }}>
        <ChannelForm currentUserId={1} />
      </MockProviders>
    );

    expect(screen.getByText('Create a channel')).toBeInTheDocument();
  });

  test('Make Private button toggles form between creating a private and public channel', () => {
    render(
      <MockProviders store={{ session: { currentUser: user1 } }}>
        <ChannelForm currentUserId={1} />
      </MockProviders>
    );

    expect(screen.queryByText('Create a private channel')).toBeNull();

    fireEvent.click(screen.getByRole('checkbox'));

    expect(screen.getByText('Create a private channel')).toBeInTheDocument();
  });

  test('ChannelForm submits properly', async () => {
    const createChannel = jest.fn();
    createChannel.mockReturnValue(new Promise(() => {}));
    render(
      <MockProviders store={{ session: { currentUser: user1 } }}>
        <ChannelForm currentUserId={1} createChannel={createChannel} channels={[]} />
      </MockProviders>
    );

    await userEvent.type(screen.getByLabelText('Name'), 'Marketing');

    fireEvent.click(screen.getByText('Create'));

    expect(createChannel).toHaveBeenCalledTimes(1);
  });

  test('error message for user in existing channel render properly', async () => {
    const channels = [
      {
        id: 1,
        name: 'marketing-channel',
        members: [{ id: 1 }],
      },
    ];
    render(
      <MockProviders store={{ session: { currentUser: user1 } }}>
        <ChannelForm currentUserId={1} channels={channels} />
      </MockProviders>
    );

    await userEvent.type(screen.getByLabelText('Name'), 'Marketing Channel');

    fireEvent.click(screen.getByText('Create'));

    expect(screen.getByText('You are part of a channel with this name that already exists.')).toBeInTheDocument();
    expect(screen.getByText('Go To Channel')).toBeInTheDocument();
  });

  test('error message for existing private channel render properly', async () => {
    const channels = [
      {
        id: 1,
        name: 'marketing-channel',
        members: [{ id: 2 }],
        channel_private: true,
      },
    ];
    render(
      <MockProviders store={{ session: { currentUser: user1 } }}>
        <ChannelForm currentUserId={1} channels={channels} />
      </MockProviders>
    );

    await userEvent.type(screen.getByLabelText('Name'), 'Marketing Channel');

    fireEvent.click(screen.getByText('Create'));

    expect(
      screen.getByText('A private channel with this name already exists. Please select a new channel name.')
    ).toBeInTheDocument();
    expect(screen.queryByText('Join Channel')).toBeNull();
  });

  test('error message for existing channel render properly', async () => {
    const channels = [
      {
        id: 1,
        name: 'marketing-channel',
        members: [{ id: 2 }],
      },
    ];
    render(
      <MockProviders store={{ session: { currentUser: user1 } }}>
        <ChannelForm currentUserId={1} channels={channels} />
      </MockProviders>
    );

    await userEvent.type(screen.getByLabelText('Name'), 'Marketing Channel');

    fireEvent.click(screen.getByText('Create'));

    expect(screen.getByText('A public channel with this name already exists.')).toBeInTheDocument();
    expect(screen.getByText('Join Channel')).toBeInTheDocument();
  });
});
