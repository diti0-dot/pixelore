Rails.application.routes.draw do
  devise_for :users, controllers: {
       sessions: 'users/sessions',
  registrations: 'users/registrations'
      }
  get "users/current", to: "users#current", defaults: { format: :json }
  get "users/current/posts", to: "users#posts",defaults: { format: :json }
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  mount ActionCable.server => '/ws'

  # Defines the root path route ("/")
  resources :posts
   root "posts#index"
end
