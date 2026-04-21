class CreatePacks < ActiveRecord::Migration[6.1]
  def change
    create_table :packs do |t|
      t.integer :user_id
      t.integer :gear_id

      t.timestamps
    end
  end
end
