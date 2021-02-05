json.extract! channel, :id, :name, :channel_type, :members, :channel_private, :description
json.notifications channel.user_notifications(current_user)
