<!-- For documentation purposes (Old API prior to switch to Next.js) -->
  <!-- create_table "categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.float "weight"
    t.integer "quantity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "url"
    t.integer "pack_id", null: false
    t.integer "category", default: 0, null: false
  end

  create_table "packs", force: :cascade do |t|
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end -->

<!-- Item -->
<!-- 
  class Item < ApplicationRecord
  belongs_to :pack
  has_one :user, through: :pack
  validates :category, presence: true

  # To Add: 
    # Sort by Heaviest/Lightest
    # display_weight
    # weight_conversions (module)
  enum category: {
    shelter: 0,
    sleep_system: 1,
    clothing: 2,
    filtration_and_cookware: 3,
    toiletries: 4,
    repair_and_medkit: 5,
    electronics: 7,
    footwear: 8,
    miscellaneous: 9
  }
  
end -->

<!-- Pack -->
<!-- 
class Pack < ApplicationRecord
  has_many :items
  belongs_to :user
  
  def weight
    items.sum(:weight)
  end

  def number_of_items
    items.count
  end
end -->


<!-- User -->