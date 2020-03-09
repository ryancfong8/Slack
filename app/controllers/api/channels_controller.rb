class Api::ChannelsController < ApplicationController
  def create
    @channel = Channel.new(channel_params)
    if @channel.save
      @channel.member_ids = params[:channel][:members]
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def update
    @channel = Channel.find(params[:id])
    if @channel.update(channel_params)
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def show
    @channel = Channel.find(params[:id])
  end

  def index
    @channels = Channel.all
    @channels = @channels.select { |channel| has_member?(channel, params[:id].to_i) }
  end

  def has_member?(channel, id)
    channel.members.any? { |member| member.id === id }
  end

  def destroy
    Channel.find(params[:id]).delete
  end

  private

  def channel_params
    params.require(:channel).permit(:title, :type)
  end
end