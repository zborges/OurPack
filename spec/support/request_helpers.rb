module RequestHelpers
  def json_response
    JSON.parse(response.body)
  end

  def auth_headers_for(user)
    token = JWT.encode(
      { user_id: user.id, exp: 24.hours.from_now.to_i },
      Rails.application.secret_key_base,
      'HS256'
    )

    {
      'Authorization' => "Bearer #{token}",
      'Accept' => 'application/json'
    }
  end
end

RSpec.configure do |config|
  config.include RequestHelpers, type: :request
end
