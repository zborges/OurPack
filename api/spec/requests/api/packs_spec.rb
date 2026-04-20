require 'rails_helper'

RSpec.describe 'Api::Packs', type: :request do
  let(:user) { User.create!(name: 'Pack User', email: 'packs@example.com', password: 'password123') }
  let(:pack) { Pack.create!(user: user) }
  let(:headers) { auth_headers_for(user) }
  
  describe 'GET /api/packs' do
    it 'returns pack summary for current user' do
      Item.create!(pack: pack, name: 'Tent', weight: 2.0, quantity: 1, category: :shelter)
      Item.create!(pack: pack, name: 'Quilt', weight: 1.0, quantity: 1, category: :sleep_system)
      get '/api/packs', headers: headers
      
      expect(response).to have_http_status(:ok)
      expect(json_response['weight']).to eq(3.0)
      expect(json_response['number_of_items']).to eq(2)
    end
  end
end
