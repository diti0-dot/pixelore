# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]
  respond_to :json
  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
  # 
  private 

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        id: resource.id,
        email: resource.email,
        username: resource.username
      }, status: :ok
    else
      render json: { error: "Login failed" }, status: :unauthorized
    end
  end 

  def respond_to_on_destroy
    if current_user
      render json: { message: "Logout failed" }, status: :unauthorized
    else
      render json: { message: "Logged out successfully" }, status: :ok
    end
  end

end 