class User < ApplicationRecord
  has_secure_password
  has_one :pack
  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 8}, if: -> {password.present}


end
