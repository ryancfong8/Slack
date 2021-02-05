require 'rails_helper'

def setup_users_and_channels
  channel1 = Channel.new(id: 1, channel_type: 'channel', name: 'general', channel_private: false)
  channel1.save
  channel2 = Channel.new(id: 2, channel_type: 'channel', name: 'random', channel_private: false)
  channel2.save
  user1 = User.new(id: 1, username: 'guest', password: 'password')
  user1.save
  user2 = User.new(id: 2, username: 'guest2', password: 'password2')
  user2.save
  user3 = User.new(id: 3, username: 'guest3', password: 'password3')
  user3.save
  user4 = User.new(id: 4, username: 'guest4', password: 'password4')
  user4.save
end

def delete_users_and_channels
  User.delete_all
  Channel.delete_all
end
