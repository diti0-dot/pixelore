# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
#   
# ===== USERS =====
User.create!(id: 1, email: "cleouser@example.com", username: "Cleo", password: "password")
User.create!(id: 2, email: "guest@example.com", username: "Guest", password: "password")
User.create!(id: 34, email: "diti@example.com", username: "diti", password: "password")
User.create!(id: 35, email: "mac@example.com", username: "mac", password: "password")
User.create!(id: 36, email: "mac1@example.com", username: "mac1", password: "password")
User.create!(id: 37, email: "hehehhe@example.com", username: "hehehhe", password: "password")
User.create!(id: 38, email: "fuc111111ee@example.com", username: "fuc111111ee", password: "password")
User.create!(id: 39, email: "iiwwa@example.com", username: "iiwwa", password: "password")

# ===== POSTS =====
post1 = Post.create!(title: "Controller", body: "controller hehhe", user_id: 2)
post1.post_pic.attach(
  io: File.open(Rails.root.join("db/seeds/images/controller.png")),
  filename: "controller.png",
  content_type: "image/png"
)

post2 = Post.create!(title: "Heart", body: "I wanted to draw this", user_id: 2)
post2.post_pic.attach(
  io: File.open(Rails.root.join("db/seeds/images/heart.png")),
  filename: "heart.png",
  content_type: "image/png"
)

post3 = Post.create!(title: "Pumpkin", body: "It's fall finalllyyy", user_id: 1)
post3.post_pic.attach(
  io: File.open(Rails.root.join("db/seeds/images/pumpkin.png")),
  filename: "pumpkin.png",
  content_type: "image/png"
)


