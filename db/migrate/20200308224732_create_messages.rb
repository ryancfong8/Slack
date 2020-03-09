class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.string :body
      t.integer :channel_id
      t.integer :user_id

      t.timestamps
    end
    add_index :messages, [:user_id, :channel_id]
  end
end
