# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!([
    {
        username: "Ryan",
        password_digest: "$2a$12$Q5Q30.gGzNkcDraISTK1yeWOAXB6oFiGuJtRF8ftmjvlueOCWo3aq",
        session_token: "ZDvw2CoYEI-tN9r4lfkVhw",
    },
    {   
        username: "Ryan 2",
        password_digest: "$2a$12$.IpSzsxTyEETq.RtKU2qbOFu2kEqf8fs/BlBpTou1ZbTcb.A1PYUu",
        session_token: "DPQsLEU4LpOHt5vyG2YlPg"
    }
])

Channel.create!([
  {title: "general", channel_type: "channel"},
  {title: "random", channel_type: "channel"}
])

Membership.create!([
    {
        user_id: 1,
        channel_id: 1
    },
    {
        user_id: 2,
        channel_id: 1
    },
    {
        user_id: 1,
        channel_id: 2
    },
    {
        user_id: 2,
        channel_id: 2
    }
])