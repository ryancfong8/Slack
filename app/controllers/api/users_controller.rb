class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    @user.avatar_url = "https://res.cloudinary.com/ryancfong8/image/upload/v1590641456/staff-avatar-man_mk5ql4.png"
    if @user.save
      login_user(@user)
      render 'api/users/show'
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render :show
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def index 
    @users = User.find_by_query(params[:query], params[:excluded_ids])
    render :index
  end

  def show 
    @user = User.find(params[:id])
  end

  private

  def user_params
    params.require(:user).permit(:name, :username, :password, :email, :avatar_url)
  end
end
