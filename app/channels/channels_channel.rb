class ChannelsChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'newChannel'
  end
end
