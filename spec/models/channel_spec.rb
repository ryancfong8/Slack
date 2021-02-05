require 'rails_helper'

RSpec.describe Channel, type: :model do
  let!(:channel) { Channel.create!(channel_type: 'channel', name: 'marketing', channel_private: false) }
  let!(:channel2) { Channel.create!(channel_type: 'direct', name: '', channel_private: true) }

  describe 'validations' do
    it { should validate_presence_of(:channel_type) }
  end

  describe 'associations' do
    it { should have_many(:memberships) }
    it { should have_many(:members) }
    it { should have_many(:notifications) }
  end

  describe 'channel properties' do
    it 'detects if direct channel' do
      expect(channel.direct_channel?).to eq(false)
      expect(channel2.direct_channel?).to eq(true)
    end
  end

  Channel.delete_all
end
