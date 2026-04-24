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
  
end
