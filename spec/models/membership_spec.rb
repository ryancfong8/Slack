require 'rails_helper'

RSpec.describe Membership, type: :model do
  fixtures :all

  let!(:channel3) { Channel.create!(channel_type: 'channel', name: 'sales', channel_private: false) }
  let!(:user5) { User.create!(id: 5, username: 'guest5', password: 'password5') }
  let!(:membership) { Membership.create!(user_id: user5.id, channel_id: channel3.id) }

  describe 'validations' do
    it { should validate_presence_of(:user_id) }
    it { should validate_presence_of(:channel_id) }
  end

  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:channel) }
  end
end
