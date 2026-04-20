Rails.application.routes.draw do
  # EXAMPLE HTML ROUTE
  # get "/photos" => "photos#index"

  # EXAMPLE JSON ROUTE WITH API NAMESPACE
  namespace :api do

    resources :items
    resources :packs

    post '/users' => 'users#create'
    delete 'users/:id' => 'users#destroy'
    get 'users/:id' => 'users#show'

    post '/sessions' => 'sessions#create'
  end
end
