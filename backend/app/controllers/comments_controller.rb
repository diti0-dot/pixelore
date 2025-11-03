class CommentsController < ApplicationController
  before_action :set_comment, only: [ :destroy]

  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.build(comment_params)
    @comment.user = current_user || User.find(2)

    if @comment.save
      render json: {
        id: @comment.id,
        body: @comment.body,
        user: { id: @comment.user.id, username: @comment.user.username },
        post_id: @comment.post.id
      }, status: :created
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @comment.destroy
    head :no_content
  end

  private

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:body)
  end
end
