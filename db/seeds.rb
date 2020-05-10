# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Message.__elasticsearch__.create_index!(force: true)

User.create!([
    {
        name: "Ryan Fong",
        username: "Ryan",
        password_digest: "$2a$12$Q5Q30.gGzNkcDraISTK1yeWOAXB6oFiGuJtRF8ftmjvlueOCWo3aq",
        session_token: "WU5T-Xw4A0VUvz4auajHuw",
        email: "",
        avatar_url: "https://res.cloudinary.com/ryancfong8/image/upload/v1586471303/PTP264-061_sq6as2.jpg"
    },
    {   
        name: "Peter Parker",
        username: "Spiderman",
        password_digest: "$2a$12$ttqXF1CPnfLEndlBrCtsbeIpWhpphqeWufIjRz7HbGTOs0lCuJXF.",
        session_token: "OsChOMisJr3xxm7ruVybhA",
        email: "",
        avatar_url: "https://res.cloudinary.com/ryancfong8/image/upload/v1586471156/spiderman_sqzhqx.jpg"
    },
    {
        name: "Steve Rogers",
        username: "Captain America",
        password_digest: "$2a$12$NTNWay1Yzcue1Q9RYI47GOoQaTaZneVJFjQTWpS94s24u6Eq2cXOm",
        session_token: "gVlgjKwfYDDIVf6k0WKuyA",
        email: "",
        avatar_url: "https://res.cloudinary.com/ryancfong8/image/upload/v1586471154/captain_america_fmnqme.jpg"
    },
    {   
        name: "Tony Stark",
        username: "Iron Man",
        password_digest: "$2a$12$N34G5Ju2nAKQgwtzootivOgS6ghrjon4v.97PrwWWgwhcYp1QSTrO",
        session_token: "z9lr3SkNyfUAvl9qKhg0fQ",
        email: "",
        avatar_url: "https://res.cloudinary.com/ryancfong8/image/upload/v1586471152/iron_man_wny0g1.jpg"
    },
    {
        name: "Bruce Banner",
        username: "Hulk",
        password_digest: "$2a$12$5U1IjAHqbMBeYgHNM94RuewKf8DuUlEhCxvwngiP5CeWTYOFZTire",
        session_token: "rSn0SCCP3dboY4rJInOQvw",
        email: "",
        avatar_url: "https://res.cloudinary.com/ryancfong8/image/upload/v1586471150/hulk_vnfb9d.jpg"
    },
    {   
        name: "Thor Odinson",
        username: "Thor",
        password_digest: "$2a$12$sguDWiuqcDIsaWyvl./97u5W1b2T5J/ShDFbvKMiX8DrQ6bVP/xqK",
        session_token: "oY_PxivgQ2oY-ysFGX9RjQ",
        email: "",
        avatar_url: "https://res.cloudinary.com/ryancfong8/image/upload/v1586471148/thor_eurbdq.jpg"
    }
])

Channel.create!([
  {name: "general", channel_type: "channel", "description": "This is a general channel", channel_private: false},
  {name: "random", channel_type: "channel", "description": "This is a random channel", channel_private: false} ,
  {name: "", channel_type: "direct", "description": "", channel_private: true}
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
    },
    {
        user_id: 3,
        channel_id: 1
    },
    {
        user_id: 4,
        channel_id: 1
    },
    {
        user_id: 5,
        channel_id: 1
    },
    {
        user_id: 6,
        channel_id: 1
    },
    {
        user_id: 3,
        channel_id: 2
    },
    {
        user_id: 4,
        channel_id: 2
    },
    {
        user_id: 5,
        channel_id: 2
    },
    {
        user_id: 6,
        channel_id: 2
    },

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
    },
    {
        body: "<p>New Message</p>",
        channel_id: 3,
        user_id: 1,
        message_type: "message"
    }
])