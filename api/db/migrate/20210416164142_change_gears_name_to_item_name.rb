class ChangeGearsNameToItemName < ActiveRecord::Migration[6.1]
  def change
    rename_column :gears, :name, :item_name
  end
end
