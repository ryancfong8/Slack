class Channel < ApplicationRecord
  validates :name, presence: true
  has_many :memberships
  has_many :members,
    through: :memberships,
    source: :user

  # query: String, 
  # is_member: Boolean, 
  # channel_type:  String ("channel" or "direct"),
  # excluded_ids : Array[Number], 
  # excluded_member_ids: Array[Number]
  def self.find_by_query(query = "", is_member = true, channel_type = "", excluded_ids = [], excluded_member_ids =[])
    @channels = Channel.includes(:members).where('channels.name ILIKE ? OR channels.name ILIKE ?', "%#{query}%", "%#{query}")
      .where(channel_type: channel_type)
      .where.not(id: excluded_ids)
      .where.not("users.id": excluded_member_ids)
    if is_member
      @channels.where("users.id": current_user_id)
    end
    @channels
  end 
end
