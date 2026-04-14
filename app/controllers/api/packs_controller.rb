class Api::PacksController < ApplicationController
  def index
    @pack = Pack.all
    render 'index.json.jb'
  end

  def show
    @input = params[:id]
    @pack = Pack.find(@input)
    render 'show.json.jb'
  end

  def create
    @pack = Pack.new(
      user_id: params[:user_id]
    )
    @pack.save
    render 'show.json.jb'
  end

  def update
    input = params[:id]
    @pack = Pack.find(input)
    @pack.user_id = params[:user_id] || @pack.user_id
    @pack.gear_id = params[:gear_id] || @pack.gear_id
    if @pack.save
      render json: { message: 'pack updated' }
    else
      render json: { errors: @pack.errors.full_messages }, status: :bad_request
    end
  end

  def destroy
    input = params[:id]
    @pack = Pack.find(input)
    @pack.delete
    render json: { message: 'pack association deleted' }
  end
end
