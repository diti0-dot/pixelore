class Post < ApplicationRecord
  belongs_to :user
  has_one_attached :post_pic
  has_many :comments

def post_pic_url
  if post_pic.attached?
    Rails.application.routes.url_helpers.rails_blob_url(post_pic, host: "localhost:3000")
  end
end


end
