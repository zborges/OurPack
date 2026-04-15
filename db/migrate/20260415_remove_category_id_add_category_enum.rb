class RemoveCategoryIdAddCategoryEnum < ActiveRecord::Migration[7.2]
  def change
    remove_column :items, :category_id, :integer
    add_column :items, :category, :integer, default: 0, null: false
  end
end
