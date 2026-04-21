class ChangeScaleOfItemWeight < ActiveRecord::Migration[6.1]
  def change
    change_column :gears, :item_weight, :float, precision: 5, scale: 2
  end
end
