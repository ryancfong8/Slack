class CreateChannels < ActiveRecord::Migration[5.1]
  def change
    create_table :channels do |t|
      t.string :name
      t.string :channel_type
      t.boolean :channel_private
      t.string :description

      t.timestamps
    end
  end
end
