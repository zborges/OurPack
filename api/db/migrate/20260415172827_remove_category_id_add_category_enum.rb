class RemoveCategoryIdAddCategoryEnum < ActiveRecord::Migration[7.2]
  def change
    # Redundant with RemoveCategoryIdFromItems (20260415172823), which already
    # removed category_id and added the category integer column.
  end
end
