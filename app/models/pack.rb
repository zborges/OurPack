class Pack < ApplicationRecord
  # Pack has a user_id.
  # Pack has one user. Or does it belong to a user?
  # pack has many items
  has_many :items
  belongs_to :user
end
