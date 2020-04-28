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

#   def uniq_reactions
#     images = []
#     uniques = []
#     reactions.each do |reaction|
#       uniques.push(reaction) unless images.include?(reaction.image)
#       images.push(reaction.image)
#     end
#     uniques
#   end

#   def has_reacted?(reaction, user)
#     #current user has reacted with this reaction
#     user_reactions_on_message = user.reactions.where(message_id: self.id)
#     user_reactions_on_message.map { |reaction| reaction.image }.include?(reaction.image)
#   end

#   def likes(reaction)
#     reactions.where(image: reaction.image).count
#   end

#   has_many :reactions

  belongs_to :user
  belongs_to :channel

end
