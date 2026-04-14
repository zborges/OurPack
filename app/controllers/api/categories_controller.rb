class Api::CategoriesController < ApplicationController
  def index
    @category = Category.all
    render 'index.json.jb'
  end
end
