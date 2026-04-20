class ChangeGearIdNotNull < ActiveRecord::Migration[7.2]
  def change
    change_column_null :items, :pack_id, false
  end
end
