json.body message.body
json.id message.id
json.user_id message.user_id
json.channel_id message.channel_id
json.channel_name message.channel.name
json.user message.user
json.created_at message.created_at
json.post_time (message.created_at - 7.hours).strftime('%l:%M %p')
json.message_type message.message_type