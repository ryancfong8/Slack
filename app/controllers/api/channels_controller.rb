class Api::ChannelsController < ApplicationController
  def create
    @channel = Channel.new(channel_params)
    if @channel.save
      Membership.create(user_id: current_user.id, channel_id: @channel.id)
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
    @channels = Channel.find_by_query(params[:query], params[:is_member], params[:channel_type], params[:excluded_ids], params[:excluded_member_ids])
    render :index
  end

  def has_member?(channel, id)
    channel.members.any? { |member| member.id == id }
  end

  def destroy
    Channel.find(params[:id]).delete
  end

  private

  def channel_params
    params.require(:channel).permit(:name, :channel_type, :channel_private, :description)
  end
end