import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AccountContainer from '../account_container.jsx';
import MockProviders from '../../../../../util/utilTest/mock_providers';
import { user1 } from '../../../../../util/utilTest/test_data';

describe('App', () => {
  test('renders App component', () => {
    render(
      <MockProviders store={{ session: { currentUser: user1 } }}>
        <AccountContainer />
      </MockProviders>
    );

    expect(screen.getByText(user1.username)).toBeInTheDocument();
  });

  test('dropdown menu appears', () => {
    render(
      <MockProviders store={{ session: { currentUser: user1 } }}>
        <AccountContainer currentChannel={{ id: 1 }} />
      </MockProviders>
    );

    expect(screen.queryByText('Log Out')).toBeNull();

    fireEvent.click(screen.getByText(user1.username));

    expect(screen.getByText('Log Out')).toBeInTheDocument();
  });

  test('dropdown menu disappears when clicked outside', () => {
    render(
      <div>
        <MockProviders store={{ session: { currentUser: user1 } }}>
          <AccountContainer currentChannel={{ id: 1 }} />
        </MockProviders>
        <div>Outside</div>
      </div>
    );

    fireEvent.click(screen.getByText(user1.username));

    expect(screen.getByText('Log Out')).toBeInTheDocument();

    userEvent.click(screen.getByText('Outside'));

    expect(screen.queryByText('Log Out')).toBeNull();
  });
});
