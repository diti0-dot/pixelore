class UsersController < ApplicationController
  def current
    if user_signed_in?
      render json: {
        id: current_user.id,
        email: current_user.email,
        username: current_user.username
      }
    else
      guest = User.find(2)
      render json: {
        id: guest.id,
        email: guest.email,
        username: guest.username
      }
    end
  end

def posts
  user = user_signed_in? ? current_user : User.find(2)
  posts = user.posts.order(created_at: :desc).map do |post|
    post.as_json(only: [:id, :title, :body, :created_at]).merge(
      post_pic_url: post.post_pic.attached? ? url_for(post.post_pic) : nil
    )
  end
  render json: posts
end


end
