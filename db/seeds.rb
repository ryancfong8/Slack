# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!([
    {
        name: "Ryan Fong",
        username: "Ryan",
        password_digest: "$2a$12$Q5Q30.gGzNkcDraISTK1yeWOAXB6oFiGuJtRF8ftmjvlueOCWo3aq",
        session_token: "WU5T-Xw4A0VUvz4auajHuw",
        email: ""
    },
    {   
        name: "Peter Parker",
        username: "Spiderman",
        password_digest: "$2a$12$ttqXF1CPnfLEndlBrCtsbeIpWhpphqeWufIjRz7HbGTOs0lCuJXF.",
        session_token: "OsChOMisJr3xxm7ruVybhA",
        email: ""
    },
    {
        name: "Steve Rogers",
        username: "Captain America",
        password_digest: "$2a$12$NTNWay1Yzcue1Q9RYI47GOoQaTaZneVJFjQTWpS94s24u6Eq2cXOm",
        session_token: "gVlgjKwfYDDIVf6k0WKuyA",
        email: ""
    },
    {   
        name: "Tony Stark",
        username: "Iron Man",
        password_digest: "$2a$12$N34G5Ju2nAKQgwtzootivOgS6ghrjon4v.97PrwWWgwhcYp1QSTrO",
        session_token: "z9lr3SkNyfUAvl9qKhg0fQ",
        email: ""
    },
    {
        name: "Bruce Banner",
        username: "Hulk",
        password_digest: "$2a$12$5U1IjAHqbMBeYgHNM94RuewKf8DuUlEhCxvwngiP5CeWTYOFZTire",
        session_token: "rSn0SCCP3dboY4rJInOQvw",
        email: ""
    },
    {   
        name: "Thor Odinson",
        username: "Thor",
        password_digest: "$2a$12$sguDWiuqcDIsaWyvl./97u5W1b2T5J/ShDFbvKMiX8DrQ6bVP/xqK",
        session_token: "oY_PxivgQ2oY-ysFGX9RjQ",
        email: ""
    }
])

Channel.create!([
  {name: "general", channel_type: "channel", "description": "This is a general channel", channel_private: false},
  {name: "random", channel_type: "channel", "description": "This is a random channel", channel_private: false} ,
  {name: "Ryan 2", channel_type: "direct", "description": "", channel_private: true}
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
    },
    {
        user_id: 1,
        channel_id: 3
    },
    {
        user_id: 2,
        channel_id: 3
    }
])

Message.create!([
    {
        body: "<p>User 1 Channel 1</p>",
        channel_id: 1,
        user_id: 1,
        message_type: "message"
    },
    {
        body: "<p>User 1 Channel 1</p>",
        channel_id: 1,
        user_id: 1,
        message_type: "message"
    },
    {
        body: "<p>User 1 Channel 2</p>",
        channel_id: 2,
        user_id: 1,
        message_type: "message"
    },
    {
        body: "<p>User 1 Channel 2</p>",
        channel_id: 2,
        user_id: 1,
        message_type: "message"
    },
    {
        body: "<p>User 2 Channel 1</p>",
        channel_id: 1,
        user_id: 2,
        message_type: "message"
    },
    {
        body: "<p>User 2 Channel 1</p>",
        channel_id: 1,
        user_id: 2,
        message_type: "message"
    },
    {
        body: "<p>User 1 Channel 1</p>",
        channel_id: 1,
        user_id: 1,
        message_type: "message"
    }
])