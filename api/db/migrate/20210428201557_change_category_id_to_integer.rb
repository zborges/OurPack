class ChangeCategoryIdToInteger < ActiveRecord::Migration[6.1]
  def change
    change_column :category_joins, :category_id, :integer, using: "category_id::integer"
    change_column :category_joins, :gear_id, :integer, using: "gear_id::integer"
  end
end
