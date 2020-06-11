class User < ApplicationRecord
  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :username, uniqueness: true
  has_many :memberships
  has_many :channels,
    through: :memberships,
    source: :channel
  has_many :reactions
  has_many :notifications


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
    channel1 = Channel.create!(channel_params)
    channel2 = Channel.create!(channel_params)
    channel3 = Channel.create!(channel_params)
    channel4 = Channel.create!(channel_params)
    
    Membership.create!([
      {
        user_id: self.id,
        channel_id: channel1.id
      },
      {
        user_id: 1,
        channel_id: channel1.id
      },
      {
        user_id: self.id,
        channel_id: channel2.id
      },
      {
        user_id: 2,
        channel_id: channel2.id
      },
      {
        user_id: self.id,
        channel_id: channel3.id
      },
      {
        user_id: 3,
        channel_id: channel3.id
      },
      {
        user_id: self.id,
        channel_id: channel4.id
      },
      {
        user_id: 4,
        channel_id: channel4.id
      }
    ])
    Thread.new do
      sleep(3)
      Message.create!([
        {
          body: "<p>Hi, I'm Ryan. Welcome to ChatHero! Feel free to create new channels, write new messages, and browse around! 
          You may even get a message from your superhero. 
          You can respond here with any questions, comments, or feedback and I will get back to you as soon as I can.  Make sure to also leave your contact info if you are on a demo account.
          Hope you enjoy ChatHero!</p>",
          channel_id: channel1.id,
          user_id: 1,
          message_type: "message"
        }
      ])
    end
    

    Thread.new do
      sleep(30)
      Message.create!([
        {
          body: "<p>Hey, Spiderman here. Just wanted to drop in and point out some cool features in ChatHero! Did you know you can make channels public or private? 
          Private channels will only be seen by the users that you add to the channel. Direct messages are also private so no one outside of this channel will be able to see this conversation.
          To add a user to your channel, click on the Details button and a button to add members will appear on the top right. You can then search for and add any member of ChatHero.
          If you have questions or feedback, be sure to leave Ryan a message!
          </p>",
          channel_id: channel2.id,
          user_id: 2,
          message_type: "message"
        }
      ])
    end
    

    Thread.new do
      sleep(60)
      Message.create!([
        {
          body: "<p>Hey there recruit, it's Cap.  I know you must be excited to start your journey.  Sometimes all the information in each channel can be overwhelming. 
          If you need to search for a specific message, try out the search functionality at the top.  You can search for the contents of any message in any channel that you are a part of.
          You can refine your search with the filters on the right side of the page. Hope that helps you along in your journey.
          If you have questions or feedback, just let Ryan know in your direct channel with him.</p>",
          channel_id: channel3.id,
          user_id: 3,
          message_type: "message"
        }
      ])
    end
    

    Thread.new do
      sleep(90)
      Message.create!([
        {
          body: "<p>Hello, I am Iron Man. I wanted to point some cool messaging features set up in ChatHero. You can format your text with bold or italics, as well as
          make lists, and include emojis. Speaking of emojis, you can react to any message with a wide range of emojis. Just hover over the message you would like to react to
          and click on the smiley face button that appears on the right. Let Ryan know if you have any requests for features, and he will respond as soon as he can.</p>",
          channel_id: channel4.id,
          user_id: 4,
          message_type: "message"
        }
      ])
    end
  end
end
  