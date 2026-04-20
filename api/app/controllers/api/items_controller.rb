class Api::ItemsController < ApplicationController
  before_action :authenticate_user
  before_action :set_item, only: [:show, :update, :destroy]

  def index
    @items = current_pack.items
    render :index
  end

  def show
    render :show
  end

  def create
    @item = current_pack.items.build(item_params)
    
    if @item.save
      render :show, status: :created
    else
      render json: { error: @item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @item.update(item_params)
      render :show
    else
      render json: { error: @item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @item.destroy
    render json: { message: 'Item deleted successfully' }
  end

  private

  def current_pack
    @current_pack ||= current_user.pack || Pack.create!(user: current_user)
  end

  def set_item
    @item = Item.find(params[:id])
  end

  def item_params
    params.require(:item).permit(:name, :description, :weight, :quantity, :url, :category)
  end
end
