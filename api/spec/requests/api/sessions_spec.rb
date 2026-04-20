require 'rails_helper'

RSpec.describe 'Api::Sessions', type: :request do
  let(:jwt_secret) { 'test-jwt-secret' }
  let!(:user) { User.create!(name: 'Session User', email: 'sessions@example.com', password: 'password123') }

  before do
    allow(Rails.application.credentials).to receive(:fetch).with(:secret_key).and_return(jwt_secret)
  end

  describe 'POST /api/sessions' do
    it 'returns a jwt for valid credentials' do
      post '/api/sessions', params: { email: user.email, password: 'password123' }

      expect(response).to have_http_status(:created)
      expect(json_response['jwt']).to be_present
      expect(json_response['email']).to eq(user.email)
      expect(json_response['user_id']).to eq(user.id)
    end

    it 'returns unauthorized for invalid credentials' do
      post '/api/sessions', params: { email: user.email, password: 'wrong-password' }

      expect(response).to have_http_status(:unauthorized)
      expect(json_response).to eq({})
    end
  end
end
