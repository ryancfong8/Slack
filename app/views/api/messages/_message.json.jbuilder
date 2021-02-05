json.body message.body
json.id message.id
json.user_id message.user_id
json.channel_id message.channel_id
json.channel_name message.channel.name
json.user message.user
json.created_at message.created_at
json.message_type message.message_type
if defined? message.uniq_reactions
  json.reactions message.uniq_reactions.each do |reaction|
    json.emoji reaction.emoji
    json.has_reacted message.has_reacted?(reaction, current_user)
    json.likes message.likes(reaction)
    json.id reaction.id
  end
  json.channel_members message.channel.members.each do |member|
    json.id member.id
    json.username member.username
  end
end
if defined?(message.uniq_reactions).nil?
  json.body_highlight message.highlight.body[0]
  json.channel message.channel
  json.channel_members message.channel_members
end
json.channel_private message.channel.channel_private
json.channel_type message.channel.channel_type
