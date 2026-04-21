class AddUrlToGears < ActiveRecord::Migration[6.1]
  def change
    add_column :gears, :url, :string
  end
end
