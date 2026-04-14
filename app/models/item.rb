class Item < ApplicationRecord
  # Gear has: name, description, weight, quantity, category. Can remove "item"
  # Need to say gear has one category
  # item belong to a pack
  belongs_to :pack
  has_one :category
  has_one :user, through: :packs
end
