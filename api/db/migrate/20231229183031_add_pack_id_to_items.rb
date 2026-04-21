class AddPackIdToItems < ActiveRecord::Migration[6.1]
  def change
    add_column :items, :pack_id, :integer
  end
end
