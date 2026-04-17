class Pack < ApplicationRecord
  has_many :items
  belongs_to :user
  
  def total_weight
    items.sum(:weight)
  end

  def number_of_items
    items.count
  end
end
