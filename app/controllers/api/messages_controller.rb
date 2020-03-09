class Api::MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)
    if @message.save
      render :show
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def update
    @message = Message.find(params[:id])
    if @message.update(message_params)
      @messages = Message.where(channel_id: message_params[:channel_id])
      render :index
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def destroy
    Message.find(params[:id]).delete
  end

  def index
    @messages = Message.where(channel_id: params[:channel_id])
  end

  private
  def message_params
    params.require(:message).permit(:body, :user_id, :channel_id)
  end
end