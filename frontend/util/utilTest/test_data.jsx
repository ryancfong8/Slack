export const user1 = {
  id: 1,
  username: 'bob_smith',
  name: 'Bob Smith',
};
export const user2 = {
  id: 2,
  username: 'roseanne_jones',
  name: 'Roseanne Jones',
};
export const channels = [
  {
    id: 1,
    channel_type: 'channel',
    name: 'marketing',
    notifications: [],
    members: [user1, user2],
    description: 'A channel for marketing',
  },
];
