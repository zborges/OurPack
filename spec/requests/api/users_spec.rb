require 'rails_helper'

RSpec.describe 'Api::Users', type: :request do
  describe 'POST /api/users' do
    it 'creates a user and associated pack' do
      params = {
        user: {
          name: 'New User',
          email: 'users@example.com',
          password: 'password123',
          password_confirmation: 'password123'
        }
      }

      expect do
        post '/api/users', params: params
      end.to change(User, :count).by(1).and change(Pack, :count).by(1)

      expect(response).to have_http_status(:created)
      expect(json_response['message']).to eq('User created successfully')
    end

    it 'returns validation errors for invalid attributes' do
      post '/api/users', params: { user: { email: '', password: 'short' } }

      expect(response).to have_http_status(:unprocessable_entity)
      expect(json_response['errors']).to include("Email can't be blank")
    end
  end

  describe 'DELETE /api/users/:id' do
    it 'deletes the user' do
      user = User.create!(name: 'Delete User', email: 'delete-user@example.com', password: 'password123')

      expect do
        delete "/api/users/#{user.id}"
      end.to change(User, :count).by(-1)

      expect(response).to have_http_status(:ok)
      expect(json_response['message']).to eq('User deleted successfully')
    end
  end
end
