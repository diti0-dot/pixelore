# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
 include ActionController::MimeResponds
  respond_to :json
 


  private

  # Prevent Devise from trying to set flash messages (fixes the 500 error)
  def set_flash_message!(*); end

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: { message: "Signed up successfully.", user: resource }, status: :ok
    else
      render json: { message: "Sign up failed.", errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
  end

  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [:username])
  end
end
