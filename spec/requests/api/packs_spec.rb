require 'rails_helper'
require 'pry'

RSpec.describe 'Api::Packs', type: :request do
  let(:jwt_secret) { 'test-jwt-secret' }
  let(:user) { User.create!(name: 'Pack User', email: 'packs@example.com', password: 'password123') }
  let(:pack) { Pack.create!(user: user) }
  let(:headers) { auth_headers_for(user, secret: jwt_secret)}

  before do
    allow(Rails.application.credentials).to receive(:fetch).with(:secret_key).and_return(jwt_secret)
  end
  
  describe 'GET /api/packs' do
    it 'returns pack summary for current user' do
      Item.create!(pack: pack, name: 'Tent', weight: 2.0, quantity: 1, pack_id: pack.id, category: :shelter)
      Item.create!(pack: pack, name: 'Quilt', weight: 1.0, quantity: 1, pack_id: pack.id, category: :sleep_system)
      get '/api/packs', headers: headers
      
      # binding.pry
      expect(response).to have_http_status(:ok)
      # expect(json_response['weight']).to eq(3.0)
      # expect(json_response['number_of_items']).to eq(2)
    end
  end

  describe 'DELETE /api/packs/:id' do
    it 'deletes the pack' do
      pack

      expect do
        delete "/api/packs/#{pack.id}", headers: headers
      end.to change(Pack, :count).by(-1)

      expect(response).to have_http_status(:ok)
      expect(json_response['message']).to eq('pack deleted successfully')
    end
  end
end
