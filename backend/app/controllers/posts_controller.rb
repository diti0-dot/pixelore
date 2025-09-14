class PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]
  
  def index
    posts = Post.includes(:user).order(created_at: :desc)
    render json: posts.as_json(
      only: [:id, :title, :body, :created_at],
      methods: [:post_pic_url],
      include: {
        user: { only: [:id, :username, :email] }
      }
    )
  end

  def show 
    render json: @post
  end

  def create
    @post = Post.new(post_params)
    @post.user_id = current_user ? current_user.id : 2

    if @post.save
      image_url = @post.post_pic.attached? ? url_for(@post.post_pic) : nil

      render json: {
        id: @post.id,
        title: @post.title,
        body: @post.body,
        user: { id: @post.user.id, username: @post.user.username },
        image_url: image_url
      }, status: :created
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_content
    end
  end

  def destroy
    @post.destroy
    head :no_content
  end

  private 
  
  def set_post
    @post = Post.find(params[:id]) # Fixed: param -> params
  end

  def post_params
    params.require(:post).permit(:title, :body, :post_pic)
  end
end