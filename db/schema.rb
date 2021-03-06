# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_200_609_034_013) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'channels', force: :cascade do |t|
    t.string 'name'
    t.string 'channel_type'
    t.boolean 'channel_private'
    t.string 'description'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'memberships', force: :cascade do |t|
    t.integer 'channel_id'
    t.integer 'user_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'messages', force: :cascade do |t|
    t.string 'body'
    t.integer 'channel_id'
    t.integer 'user_id'
    t.string 'message_type'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index %w[user_id channel_id], name: 'index_messages_on_user_id_and_channel_id'
  end

  create_table 'notifications', force: :cascade do |t|
    t.integer 'user_id'
    t.integer 'channel_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'reactions', force: :cascade do |t|
    t.integer 'user_id'
    t.integer 'message_id'
    t.string 'emoji'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'users', force: :cascade do |t|
    t.string 'username', null: false
    t.string 'password_digest', null: false
    t.string 'session_token', null: false
    t.string 'email'
    t.string 'name'
    t.string 'avatar_url'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['session_token'], name: 'index_users_on_session_token', unique: true
    t.index ['username'], name: 'index_users_on_username', unique: true
  end
end
