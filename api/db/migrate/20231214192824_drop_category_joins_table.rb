class DropCategoryJoinsTable < ActiveRecord::Migration[6.1]
  def change
    drop_table :category_joins
  end
end
