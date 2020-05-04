class Reaction < ApplicationRecord
  validates :user, :message, :emoji, presence: true

  belongs_to :user
  belongs_to :message
end
