Rails.application.routes.draw do
  # EXAMPLE HTML ROUTE
  # get "/photos" => "photos#index"

  # EXAMPLE JSON ROUTE WITH API NAMESPACE
  namespace :api do
    get '/item_weight' => 'items#weight'
    get '/items' => 'items#index'
    post '/items' => 'items#create'
    get '/items/:id' => 'items#show'
    patch 'items/:id' => 'items#update'
    delete 'items/:id' => 'items#destroy'

    get '/packs' => 'packs#index'
    post '/packs' => 'packs#create'
    get '/packs/:id' => 'packs#show'
    patch 'packs/:id' => 'packs#update'
    delete 'packs/:id' => 'packs#destroy'

    post '/users' => 'users#create'
    delete 'users/:id' => 'users#destroy'
    get 'users/:id' => 'users#show'

    post '/sessions' => 'sessions#create'

    delete '/categories/:id' => 'categories#destroy'
    get '/categories' => 'categories#index'
    post '/categories' => 'categories#create'

    post '/category_join' => 'category_join#create'
    get '/category_join' => 'category_join#index'
  end
end
