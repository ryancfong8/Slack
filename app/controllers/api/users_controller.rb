class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login_user(@user)
      render 'api/users/show'
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def index 
    @users = User.find_by_query(params[:query], params[:excluded_ids])
    render :index
  end

  private

  def user_params
    params.require(:user).permit(:name, :username, :password, :email)
  end
end
