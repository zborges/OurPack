class ChangeGearsUrlToItemUrl < ActiveRecord::Migration[6.1]
  def change
    rename_column :gears, :url, :item_url
  end
end
