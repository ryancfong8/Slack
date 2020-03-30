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
    @channels = Channel.all
    if params[:query]
      @channels = Channel.where(channel_type: "channel")
      @channels = @channels.where('name ILIKE ? OR description ILIKE ?', "%#{params[:query]}%", "%#{params[:query]}%")
      return @channels
    end
    # if params[:channel_type] && params[:channel_private] 
    #   @channels = @channels.where(channel_type: params[:channel_type]).where(channel_private: params[:channel_private]).order("name ASC")
    #   puts @channels
    # elsif params[:channel_type] && params[:id]
    # if params[:channel_private] != nil
    #   @channels = Channel.where(channel_private: params[:channel_private]).order("name ASC")
    # else 
      @channels = @channels.select { |channel| has_member?(channel, params[:id].to_i) && channel[:channel_type] == params[:channel_type] }
    # end
    # end 
    # @channels.sort_by {|channel| channel.name}
    # @channels
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