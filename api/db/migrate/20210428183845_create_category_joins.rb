class CreateCategoryJoins < ActiveRecord::Migration[6.1]
  def change
    create_table :category_joins do |t|
      t.string :category_id
      t.string :gear_id
      t.timestamps
    end
  end
end
