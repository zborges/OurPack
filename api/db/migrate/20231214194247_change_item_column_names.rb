class ChangeItemColumnNames < ActiveRecord::Migration[6.1]
  def change
    rename_column :items, :item_name, :name
    rename_column :items, :item_description, :description
    rename_column :items, :item_weight, :weight
    rename_column :items, :item_quantity, :quantity
    rename_column :items, :item_url, :url
  end
end
