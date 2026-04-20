class RemoveItemCategoryFromGears < ActiveRecord::Migration[6.1]
  def change
    remove_column :gears, :item_category
  end
end
