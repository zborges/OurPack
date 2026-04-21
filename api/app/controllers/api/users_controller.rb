class Api::UsersController < ApplicationController
  before_action :set_user, only: [:show, :destroy]

  def create
    @user = User.new(user_params)
    if @user.save
      Pack.create(user_id: @user.id)
      render json: { message: 'User created successfully' }, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    render :show
  end

  def destroy
    @user.destroy
    render json: { message: 'User deleted successfully' }
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
