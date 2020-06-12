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
        highlight do
          field :body do 
            fragment_size 50
          end
        end
        aggregation :filter_users do 
          terms do
            field "user.id"
          end
        end
        aggregation :filter_channels do 
          terms do
            field "channel.id"
          end
        end
      end

      response = Message.search(query)
# {
#        "filter_users" => {
#         "doc_count_error_upper_bound" => 0,
#                 "sum_other_doc_count" => 0,
#                             "buckets" => [
#             [0] {
#                       "key" => "Ryan",
#                 "doc_count" => 5
#             },
#             [1] {
#                       "key" => "Spiderman",
#                 "doc_count" => 2
#             }
#         ]
#     },
#     "filter_channels" => {
#         "doc_count_error_upper_bound" => 0,
#                 "sum_other_doc_count" => 0,
#                             "buckets" => [
#             [0] {
#                       "key" => "general",
#                 "doc_count" => 5
#             },
#             [1] {
#                       "key" => "random",
#                 "doc_count" => 2
#             }
#         ]
#     }
# }
      @aggregations = response.aggregations
      @messages = response.results
    else
      # check if user has access to channel
      channel = Channel.find_by_id(params[:channel_id])
      authorized = channel.members.map{|member| member.id}.include?(current_user.id)
      if authorized
      @messages = Message.where(channel_id: params[:channel_id])
      else 
        if channel.channel_private == true
          render json: "You are not authorized to view this channel", status: 401
        else 
          @messages = Message.where(channel_id: params[:channel_id])
        end
      end
    end
  end

  private
  def message_params
    params.require(:message).permit(:body, :user_id, :channel_id, :message_type)
  end
end