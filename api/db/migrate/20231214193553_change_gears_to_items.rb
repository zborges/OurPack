class ChangeGearsToItems < ActiveRecord::Migration[6.1]
  def change
    rename_table :gears, :items
  end
end
