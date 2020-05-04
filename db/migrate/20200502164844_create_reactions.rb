class CreateReactions < ActiveRecord::Migration[5.1]
  def change
    create_table :reactions do |t|
      t.integer :user_id
      t.integer :message_id
      t.string :emoji

      t.timestamps
    end
  end
end
