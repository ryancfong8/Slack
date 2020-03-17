class Api::MembershipsController < ApplicationController
  def create
    @membership = Membership.new(membership_params)
    if @membership.save
      render json: "membership creation successful", status: 200
    else
      render json: @membership.errors.full_messages, status: 422
    end
  end

  def destroy

  end

  def membership_params
    params.require(:membership).permit(:user, :channel)
  end
end