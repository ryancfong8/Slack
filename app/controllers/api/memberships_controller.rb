class Api::MembershipsController < ApplicationController
  def create
    @membership = Membership.new(membership_params)
    if @membership.save
      @channel = Channel.find(membership_params[:channel_id])
      render '/api/channels/show.json.jbuilder'
    else
      render json: @membership.errors.full_messages, status: 422
    end
  end

  def destroy; end

  def membership_params
    params.require(:membership).permit(:user_id, :channel_id)
  end
end
