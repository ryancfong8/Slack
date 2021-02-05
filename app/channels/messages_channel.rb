class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from params[:channel_name]
  end
end
