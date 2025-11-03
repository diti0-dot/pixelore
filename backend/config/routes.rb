Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  get "users/current", to: "users#current", defaults: { format: :json }
  get "users/current/posts", to: "users#posts", defaults: { format: :json }

  mount ActionCable.server => '/ws'

  resources :users do
    resources :posts, only: [:index] 
  end

  resources :posts do
    resources :comments
  end

  root "posts#index"
end
