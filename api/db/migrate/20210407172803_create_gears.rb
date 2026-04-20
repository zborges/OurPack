class CreateGears < ActiveRecord::Migration[6.1]
  def change
    create_table :gears do |t|
      t.string :name
      t.text :item_description
      t.float :item_weight
      t.integer :quantity

      t.timestamps
    end
  end
end
