require 'rails_helper'

RSpec.describe 'Api::Items', type: :request do
  let(:jwt_secret) { 'test-jwt-secret' }
  let(:user) { User.create!(name: 'Test User', email: 'items@example.com', password: 'password123') }
  let(:pack) { Pack.create!(user: user) }
  let(:headers) { auth_headers_for(user, secret: jwt_secret) }

  before do
    allow(Rails.application.credentials).to receive(:fetch).with(:secret_key).and_return(jwt_secret)
    pack
  end

  describe 'GET /api/items' do
    it 'returns only current user items' do
      Item.create!(pack: pack, name: 'Tent', category: :shelter)

      other_user = User.create!(name: 'Other', email: 'other-items@example.com', password: 'password123')
      other_pack = Pack.create!(user: other_user)
      Item.create!(pack: other_pack, name: 'Other Item', category: :miscellaneous)

      get '/api/items', headers: headers

      expect(response).to have_http_status(:ok)
      expect(json_response.size).to eq(1)
      expect(json_response.first['name']).to eq('Tent')
    end
  end

  describe 'POST /api/items' do
    it 'creates an item for the current user pack' do
      params = {
        item: {
          name: 'Quilt',
          description: 'Down quilt',
          weight: 1.2,
          quantity: 1,
          url: 'https://example.com/quilt',
          category: 'sleep_system'
        }
      }

      expect do
        post '/api/items', params: params, headers: headers
      end.to change(Item, :count).by(1)

      expect(response).to have_http_status(:created)
      expect(json_response['item_name']).to eq('Quilt')
    end
  end

  describe 'PATCH /api/items/:id' do
    it 'updates the item' do
      item = Item.create!(pack: pack, name: 'Old Name', category: :miscellaneous)

      patch "/api/items/#{item.id}", params: { item: { name: 'New Name' } }, headers: headers

      expect(response).to have_http_status(:ok)
      expect(item.reload.name).to eq('New Name')
    end
  end

  describe 'DELETE /api/items/:id' do
    it 'deletes the item' do
      item = Item.create!(pack: pack, name: 'Knife', category: :miscellaneous)

      expect do
        delete "/api/items/#{item.id}", headers: headers
      end.to change(Item, :count).by(-1)

      expect(response).to have_http_status(:ok)
      expect(json_response['message']).to eq('Item deleted successfully')
    end
  end
end
