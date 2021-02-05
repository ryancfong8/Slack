class ChannelRelayJob < ApplicationJob
  queue_as :default

  def perform(_membership, channel)
    channel = Api::ChannelsController.render(
      partial: 'api/channels/channel',
      locals: { channel: channel }
    )
    ActionCable.server.broadcast('newChannel',
                                 channel: JSON.parse(channel))
  end
end
