class ChangeCategoryToItemCategory < ActiveRecord::Migration[6.1]
  def change
    rename_column :gears, :category, :item_category
  end
end
