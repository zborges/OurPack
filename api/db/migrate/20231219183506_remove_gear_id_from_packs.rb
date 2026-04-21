class RemoveGearIdFromPacks < ActiveRecord::Migration[6.1]
  def change
    remove_column :packs, :gear_id
  end
end
