class ChangeGearsQuantityToItemQuantity < ActiveRecord::Migration[6.1]
  def change
    rename_column :gears, :quantity, :item_quantity
  end
end
