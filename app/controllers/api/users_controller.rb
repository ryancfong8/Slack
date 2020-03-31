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
    @users = User.all
    if params[:query]
      @@users = User.where.not(id: current_user.id)
      @users = @users.where('username ILIKE ? OR name ILIKE ?', "%#{params[:query]}%", "%#{params[:query]}")
      return @users
    end
    @users
  end

  private

  def user_params
    params.require(:user).permit(:name, :username, :password, :email)
  end
end
