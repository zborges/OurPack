class Api::PacksController < ApplicationController
  before_action :authenticate_user
  before_action :set_pack, only: [:destroy]

  def index
    @pack = current_user.pack
    render :index
  end

  def create
    @pack = Pack.new(
      user_id: current_user.id
    )
    if @pack.save
      render :index, status: :created
    else
      render json: { error: @pack.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private 

  def set_pack
    @pack = Pack.find(params[:id])
  end
end
