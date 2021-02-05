class Channel < ApplicationRecord
  validates :channel_type, presence: true
  validates :name, presence: true, unless: :direct_channel?
  validates :channel_private, inclusion: [true, false], unless: :direct_channel?
  has_many :memberships
  has_many :members,
           through: :memberships,
           source: :user
  has_many :notifications

  def direct_channel?
    channel_type === 'direct'
  end

  def user_notifications(current_user)
    notifications.select do |notification|
      notification.channel_id == id && notification.user_id == current_user.id
    end
  end

  # query: String,
  # is_member: Boolean,
  # channel_type:  String ("channel" or "direct"),
  # excluded_ids : Array[Number],
  # excluded_member_ids: Array[Number]
  def self.find_by_query(query = '', _is_member = true, channel_type = 'channel', _member_ids = [], excluded_ids = [], excluded_member_ids = [])
    @channels = Channel.includes(:members).where('channels.name ILIKE ? OR channels.description ILIKE ?',
                                                 "%#{query}%", "%#{query}%")
                       .where(channel_type: channel_type)
                       .where.not(id: excluded_ids)
                       .where.not("users.id": excluded_member_ids)
    # if is_member
    #   @channels.where("users.id": current_user_id)
    # end
    # if member_ids && member_ids.length > 0
    #   @channels.where("users.id": member_ids)
    # end
    @channels
  end
end
