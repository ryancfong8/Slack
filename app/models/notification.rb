class Notification < ApplicationRecord
  validates :user, :channel, null: false
  belongs_to :user
  belongs_to :channel
end
