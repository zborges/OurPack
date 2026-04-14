class Api::UsersController < ApplicationController
  def create
    user = User.new(
      name: params[:name],
      email: params[:email],
      password: params[:password],
      password_confirmation: params[:password_confirmation]
    )
    if user.save
      @pack = Pack.new(
        user_id: user.id
      )
      @pack.save
      render json: { message: 'User created successfully' }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :bad_request
    end
  end

  def show
    @user = User.find(params[:id])
    # byebug
    if @user.pack.items.empty?
      render json: 'User does not have any gear'
    else
      render 'show.json.jb'
    end
  end

  def destroy
    input = params[:id]
    user = User.find(input)
    if user.delete
      render json: { message: 'user deleted successfully' }
    else
      render json: { errors: user.errors.full_messages }, status: :bad_request
    end
  end
end
