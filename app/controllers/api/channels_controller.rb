class Api::ChannelsController < ApplicationController
  def create
    @channel = Channel.new(channel_params)
    if @channel.save
      Membership.create(user_id: current_user.id, channel_id: @channel.id)
      if params[:member_ids]
        params[:member_ids].each do |member_id|
          Membership.create(user_id: member_id, channel_id: @channel.id)
        end
      end
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def update
    @channel = Channel.find(params[:id])
    if params[:member_ids]
      params[:member_ids].each do |member_id|
        Membership.create(user_id: member_id, channel_id: @channel.id)
      end
      render :show
    elsif @channel.update(channel_params)
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def show
    @channel = Channel.find(params[:id])
  end

  def index
    @channels = Channel.find_by_query(params[:query], params[:is_member], params[:channel_type], params[:member_ids], params[:excluded_ids], params[:excluded_member_ids])
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