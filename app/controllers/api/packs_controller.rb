class Api::PacksController < ApplicationController
  before_action :set_pack, only: [:destroy]

  def index
    @pack = current_user.pack
    'index.json.jb'
  end

  def create
    @pack = Pack.new(
      user_id: params[:user_id]
    )
    if @pack.save
     'show.json.jb'
    else
      render json: { error: @pack.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @pack.destroy
    render json: { message: 'pack deleted successfully' }
  end

  private 

  def set_pack
    @pack = Pack.find(params[:id])
  end
end
