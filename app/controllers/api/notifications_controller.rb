class Api::NotificationsController < ApplicationController
  def create
    channel_id = params[:channel_id]
    user_id = current_user.id
    @notification = Notification.new
    @notification.channel_id = channel_id
    @notification.user_id = user_id

    if @notification.save
      @channel = Channel.find(params[:channel_id])
      render '/api/channels/show.json.jbuilder'
    else
      render json: @notification.errors.full_messages, status: 422
    end
  end

  def destroy
    @notifications = Notification.where(channel_id: params[:channel_id]).where(user_id: current_user.id)
    print 'DESTROYING NOTIFICATIONS'
    puts @notifications
    @notifications.destroy_all
    @channel = Channel.find(params[:channel_id])
    render '/api/channels/show.json.jbuilder'
  end
end
