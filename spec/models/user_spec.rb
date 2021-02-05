require 'rails_helper'
require_relative 'helpers'

RSpec.describe User, type: :model do
  fixtures :all

  let!(:user) { User.create!(id: 5, username: 'guest5', password: 'password5') }

  describe 'validations' do
    it { should validate_presence_of(:username) }
    it { should validate_presence_of(:password_digest) }
    it { should validate_presence_of(:session_token) }
    it { should validate_uniqueness_of(:username) }
    it { should validate_length_of(:password).is_at_least(6) }
  end

  describe 'associations' do
    it { should have_many(:memberships) }
    it { should have_many(:channels) }
    it { should have_many(:reactions) }
    it { should have_many(:notifications) }
  end
end
