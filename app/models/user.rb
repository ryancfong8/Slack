class User < ApplicationRecord
  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :username, uniqueness: true
  has_many :memberships
  has_many :channels,
    through: :memberships,
    source: :channel
  has_many :reactions


  after_initialize :ensure_session_token

  after_create_commit :add_channel_memberships

  attr_reader :password

  def reset_session_token
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= self.reset_session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  # takes a query string and an array of excluded_ids
  def self.find_by_query(query = "", excluded_ids)
    User.where('username ILIKE ? OR name ILIKE ?', "%#{query}%", "%#{query}%").where.not(id: excluded_ids)
  end 

  def add_channel_memberships
    Membership.create!([
      {
        user_id: self.id,
        channel_id: 1
      },
      {
        user_id: self.id,
        channel_id: 2
      }
    ])
    channel_params = {name: "", channel_type: "direct", "description": "", channel_private: true}
    channel = Channel.create!(channel_params)
    Membership.create!([
      {
        user_id: self.id,
        channel_id: channel.id
      },
      {
        user_id: 1,
        channel_id: channel.id
      }
    ])
    Message.create!([
    {
        body: "<p>Hi, I'm Ryan. Welcome to ChatHero!</p>",
        channel_id: channel.id,
        user_id: 1,
        message_type: "message"
    }
  ])
  end
end
