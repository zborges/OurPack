class RemoveCategoryIdFromGears < ActiveRecord::Migration[6.1]
  def change
    remove_column :gears, :category_id
  end
end
