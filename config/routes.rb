Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    resources :users, only: %i[create update show index]
    resource :session, only: %i[create destroy]
    resources :channels, only: %i[create index update show destroy]
    resource :memberships, only: %i[create destroy]
    resources :messages, only: %i[create index update show destroy]
    resources :reactions, only: %i[create destroy]
    resources :notifications, only: %i[create show destroy]
  end

  root 'static_pages#root'
end
