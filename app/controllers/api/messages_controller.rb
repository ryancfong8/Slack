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
    if params[:query]
      require 'elasticsearch/dsl'
      def message_authorize
        { :channel_members => current_user.id }
      end
      query = Elasticsearch::DSL::Search.search do
        query do
          bool do 
            must do 
              match :body do
                query params[:query]
             end
            end
            filter do
              term message_authorize
            end
          end
        end
      end

      @messages = Message.search(query).results
    else
      @messages = Message.where(channel_id: params[:channel_id])
    end
  end

  private
  def message_params
    params.require(:message).permit(:body, :user_id, :channel_id, :message_type)
  end
end