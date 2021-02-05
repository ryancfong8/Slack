class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def current_user
    return nil if session[:session_token].nil?

    @current_user ||= User.find_by(session_token: session[:session_token])
  end
end
