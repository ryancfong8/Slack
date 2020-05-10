class Message < ApplicationRecord
  validates :user_id, :channel_id, presence: true
  after_commit { MessageRelayJob.perform_later(self, self.channel) }
#   after_create_commit { MessageBroadcastJob.perform_later(self, self.channel) }

#   validate :ensure_body

#   def ensure_body
#     unless self.body.length > 0 || self.gif_url.length > 0
#       errors.add(:body, "can't be blank")
#     end
#   end

  def uniq_reactions
    emojis = []
    uniques = []
    reactions.each do |reaction|
      uniques.push(reaction) unless emojis.include?(reaction.emoji)
      emojis.push(reaction.emoji)
    end
    uniques
  end

  def has_reacted?(reaction, user)
    # current user has already reacted with this reaction
    user_reactions_on_message = user.reactions.where(message_id: self.id)
    user_reactions_on_message.map { |reaction| reaction.emoji }.include?(reaction.emoji)
  end

  def likes(reaction)
    reactions.where(emoji: reaction.emoji).count
  end

  has_many :reactions

  belongs_to :user
  belongs_to :channel

  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

  def as_indexed_json(options={})
    body_hash = {
      "body" => Sanitize.fragment(self.body).strip,
      "channel_members" => self.channel.members.map{|member| member.id}
    }
    self.as_json(
      include: {
        user: { only: :username},
        channel: { only: :name }
      }
    ).merge(body_hash)
  end
end
