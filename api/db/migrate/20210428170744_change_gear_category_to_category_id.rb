class ChangeGearCategoryToCategoryId < ActiveRecord::Migration[6.1]
  def change
    rename_column :gears, :item_category, :category_id
  end
end
