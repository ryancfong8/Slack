require 'rails_helper'
require_relative 'helpers'

RSpec.describe Message, type: :model do
  fixtures :all
  let!(:message) { Message.create!(user_id: 1, channel_id: 1, body: 'Hello') }

  describe 'validations' do
    it { should validate_presence_of(:user_id) }
    it { should validate_presence_of(:channel_id) }
  end
end
