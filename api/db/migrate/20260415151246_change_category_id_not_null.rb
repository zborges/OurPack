class ChangeCategoryIdNotNull < ActiveRecord::Migration[7.2]
  def change
    change_column_null :items, :category_id, false
  end
end
