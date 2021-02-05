# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Message.__elasticsearch__.create_index!(force: true)

Channel.create!([
                  { name: 'general', channel_type: 'channel',
                    "description": 'The #general channel is for team-wide communication and announcements. All team members are in this channel.', channel_private: false },
                  { name: 'random', channel_type: 'channel',
                    "description": "A place for non-work banter, links, articles of interest, humor or anything else which you'd like concentrated in some place other than work-related channels.", channel_private: false }
                ])

User.create!([
               {
                 name: 'Ryan Fong',
                 username: 'Ryan',
                 password_digest: '$2a$12$Q5Q30.gGzNkcDraISTK1yeWOAXB6oFiGuJtRF8ftmjvlueOCWo3aq',
                 session_token: 'WU5T-Xw4A0VUvz4auajHuw',
                 email: '',
                 avatar_url: 'https://res.cloudinary.com/ryancfong8/image/upload/v1586471303/PTP264-061_sq6as2.jpg'
               },
               {
                 name: 'Peter Parker',
                 username: 'Spiderman',
                 password_digest: '$2a$12$ttqXF1CPnfLEndlBrCtsbeIpWhpphqeWufIjRz7HbGTOs0lCuJXF.',
                 session_token: 'OsChOMisJr3xxm7ruVybhA',
                 email: '',
                 avatar_url: 'https://res.cloudinary.com/ryancfong8/image/upload/v1591079074/spider_man_PNG90_pllizj.png'
               },
               {
                 name: 'Steve Rogers',
                 username: 'Captain America',
                 password_digest: '$2a$12$NTNWay1Yzcue1Q9RYI47GOoQaTaZneVJFjQTWpS94s24u6Eq2cXOm',
                 session_token: 'gVlgjKwfYDDIVf6k0WKuyA',
                 email: '',
                 avatar_url: 'https://res.cloudinary.com/ryancfong8/image/upload/v1591068462/Captain-America-PNG-Transparent-Image_fo7bt4.png'
               },
               {
                 name: 'Tony Stark',
                 username: 'Iron Man',
                 password_digest: '$2a$12$N34G5Ju2nAKQgwtzootivOgS6ghrjon4v.97PrwWWgwhcYp1QSTrO',
                 session_token: 'z9lr3SkNyfUAvl9qKhg0fQ',
                 email: '',
                 avatar_url: 'https://res.cloudinary.com/ryancfong8/image/upload/v1591072362/iron_man_png_ji5ybm.png'
               },
               {
                 name: 'Bruce Banner',
                 username: 'Hulk',
                 password_digest: '$2a$12$5U1IjAHqbMBeYgHNM94RuewKf8DuUlEhCxvwngiP5CeWTYOFZTire',
                 session_token: 'rSn0SCCP3dboY4rJInOQvw',
                 email: '',
                 avatar_url: 'https://res.cloudinary.com/ryancfong8/image/upload/v1591948767/Hulk_png_vzmhlh.png'
               },
               {
                 name: 'Thor Odinson',
                 username: 'Thor',
                 password_digest: '$2a$12$sguDWiuqcDIsaWyvl./97u5W1b2T5J/ShDFbvKMiX8DrQ6bVP/xqK',
                 session_token: 'oY_PxivgQ2oY-ysFGX9RjQ',
                 email: '',
                 avatar_url: 'https://res.cloudinary.com/ryancfong8/image/upload/v1591948027/clipart1695108_rczenl.png'
               },
               {
                 name: 'Black Panther',
                 username: "T'Challa",
                 password_digest: '$2a$12$pTWBxoz9od9Y8ezjei7Pre93fGxrDGvecistu0MhXxmxjtNDuuu3e',
                 session_token: 'l7UVVc2VG69F0LK1fxrwYQ',
                 email: '',
                 avatar_url: 'https://res.cloudinary.com/ryancfong8/image/upload/v1591244196/slack/pxjkuoendbxd3vly3ezm.png'
               },
               {
                 name: 'Ant-Man',
                 username: 'Scott Lang',
                 password_digest: '$2a$12$yPiWKF8h6wc2PGwPoLLnE.M7zjx8yyRLOqzcAhH0MZwCvxCCKk77W',
                 session_token: 'kC1A85nOilWeNmZpSn4dBA',
                 email: '',
                 avatar_url: 'https://res.cloudinary.com/ryancfong8/image/upload/v1592293002/pngguru.com_h5utww.png'
               },
               {
                 username: 'Captain Marvel',
                 password_digest: '$2a$12$48exqXumuIJKTpUEHNiNIujYw2y3sjy0YahvrfCjprKJccQeeX27G',
                 session_token: 'XupWHvkpPvnH_EM0DCrQVg',
                 email: nil,
                 name: 'Carol Danvers',
                 avatar_url: 'https://res.cloudinary.com/ryancfong8/image/upload/v1591072362/captain_marvel_png_vsirqo.png'
               },
               {
                 username: 'Black Widow',
                 password_digest: '$2a$12$Dy1GBr/IvEY3P7Ajd1Hw/uDBDbfjLyVyyDZLXXkJP5lXrlgstO1ca',
                 session_token: 'Mo9TCvu2ujzET7DMvMgbDg',
                 email: '',
                 name: 'Natasha Romanov',
                 avatar_url: 'https://res.cloudinary.com/ryancfong8/image/upload/v1591946048/clipart1695912_zv07mn.png'
               },
               {
                 username: 'Hawkeye',
                 password_digest: '$2a$12$oMwDVIdjZ/O3rZvwO47spukHxUvVgqAnQpQG3zvkEL3BUVYOQrrBe',
                 session_token: '2HYLCNfQJ4r9wXzZ2UjcZw',
                 email: nil,
                 name: 'Clint Barton',
                 avatar_url: 'https://res.cloudinary.com/ryancfong8/image/upload/v1592293004/kindpng_3637245_nxvnou.png'
               },
               {
                 username: 'Dr. Strange',
                 password_digest: '$2a$12$I849cZNxAjT18Vl6VTo5CO8ODHZPLKjvlj9u/.axMglBP3NVWnv2K',
                 session_token: 'AcRKJUQNzSDO4cYgpEOgkg',
                 email: nil,
                 name: 'Steven Strange',
                 avatar_url: 'https://res.cloudinary.com/ryancfong8/image/upload/v1592293002/PngItem_5248690_gu4qxm.png'
               },
               {
                 username: 'Scarlett Witch',
                 password_digest: '$2a$12$ldSrtGHpuiHfK8NKtoL3E.Fb7pRC2qzxonGQ3cWQq89G1DZ359eEW',
                 session_token: '4sIiY-QetzipO4GhHDc_uw',
                 email: nil,
                 name: 'Wanda Maximoff',
                 avatar_url: 'https://res.cloudinary.com/ryancfong8/image/upload/v1592293003/21409-5-scarlet-witch-image_iwjhmn.png'
               },
               {
                 username: 'War Machine',
                 password_digest: '$2a$12$84FVJbA2vDfQ9sU179B25u.CexM3jTMB34QhN1J5V6qCOu/lZo6Ay',
                 session_token: 'yzT2Q956A49VaoscYzPZFg',
                 email: nil,
                 name: 'James Rhodes',
                 avatar_url: 'https://res.cloudinary.com/ryancfong8/image/upload/v1592293004/PngItem_5297366_mpbnhp.png'
               },
               {
                 username: 'Falcon',
                 password_digest: '$2a$12$o5RthoOSeGFPllWOlrVkPu9/JPzSUt/jdDq8/voaXHwKChpP8KUzW',
                 session_token: 'DH5c9LGf9YRNqylr9tnDEw',
                 email: nil,
                 name: 'Samuel Wilson',
                 avatar_url: 'https://res.cloudinary.com/ryancfong8/image/upload/v1592293003/228e8434a09cd2c8f5fa9e190f42c45f_dzqxlp.png'
               },
               {
                 username: 'Starlord',
                 password_digest: '$2a$12$fcfeqvj8Qft76JoeiKBdiea6aBgNndXxl2vSlmW1ML9B.AHYzLtMS',
                 session_token: 'ZKLIXM4mZXEwCYOUaRlZ1A',
                 email: nil,
                 name: 'Peter Quill',
                 avatar_url: 'https://res.cloudinary.com/ryancfong8/image/upload/v1592293003/154-1545547_star-lord-comic-png-transparent-png_rnzqca.png'
               }
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
                       channel_id: 1
                     },
                     {
                       user_id: 2,
                       channel_id: 1
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
                       user_id: 7,
                       channel_id: 1
                     },
                     {
                       user_id: 8,
                       channel_id: 1
                     },
                     {
                       user_id: 9,
                       channel_id: 1
                     },
                     {
                       user_id: 10,
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
                     }

                   ])

Message.create!([
                  {
                    body: '<p>I need backup for a mission this weekend. Anyone in?</p>',
                    channel_id: 1,
                    user_id: 3,
                    message_type: 'message'
                  },
                  {
                    body: '<p>Let me ask Jarvis about my availability</p>',
                    channel_id: 1,
                    user_id: 4,
                    message_type: 'message'
                  },
                  {
                    body: "<p>I want in! But I'll need a ride. Mr. Stark can I use the new suit you are working on?</p>",
                    channel_id: 1,
                    user_id: 2,
                    message_type: 'message'
                  },
                  {
                    body: '<p>Is it Thanos again?</p>',
                    channel_id: 1,
                    user_id: 2,
                    message_type: 'message'
                  },
                  {
                    body: '<p>Nope. The threat is small, but the enemy should not be taken lightly&nbsp;</p>',
                    channel_id: 1,
                    user_id: 3,
                    message_type: 'message'
                  },
                  {
                    body: '<p>Peter, the suit was supposed to be our secret</p>',
                    channel_id: 1,
                    user_id: 4,
                    message_type: 'message'
                  },
                  {
                    body: "<p>Hey Tony, why don't you make a suit for me too?</p>",
                    channel_id: 1,
                    user_id: 8
                  },
                  {
                    body: "<p>I'd make one so that you can stay small permanently</p>",
                    channel_id: 1,
                    user_id: 4,
                    message_type: 'message'
                  },
                  {
                    body: "<p>Hey now, let's not get distracted from the mission here</p>",
                    channel_id: 1,
                    user_id: 3,
                    message_type: 'message'
                  },
                  {
                    body: "<p>Let's listen to Steve. I would be honored to go on this mission with him.</p>",
                    channel_id: 1,
                    user_id: 7,
                    message_type: 'message'
                  },
                  {
                    body: "<p>Hey, just messing around here. Let's go!</p>",
                    channel_id: 1,
                    user_id: 8,
                    message_type: 'message'
                  },
                  {
                    body: '<p>If I get to Hulk smash things, I am in</p>',
                    channel_id: 1,
                    user_id: 5,
                    message_type: 'message'
                  },
                  {
                    body: '<p>For Asgard!</p>',
                    channel_id: 1,
                    user_id: 6,
                    message_type: 'message'
                  },
                  {
                    body: "<p>I'll be out on a mission in a different planet, but let me know if you guys need me.</p>",
                    channel_id: 1,
                    user_id: 9,
                    message_type: 'message'
                  },
                  {
                    body: "<p>Let's show these guys what we got.</p>",
                    channel_id: 1,
                    user_id: 10,
                    message_type: 'message'
                  },
                  {
                    body: '<p>Ok team the mission is a go</p>',
                    channel_id: 1,
                    user_id: 3,
                    message_type: 'message'
                  },
                  {
                    body:
                    "<p>I'll take Queens, T'Challa and Lang with me. Tony, you lead Bruce, Thor, and Nat around the back and we'll converge on them from both sides</p>",
                    channel_id: 1,
                    user_id: 3,
                    message_type: 'message'
                  },
                  {
                    body: '<p>You got it Cap!</p>',
                    channel_id: 1,
                    user_id: 8,
                    message_type: 'message'
                  },
                  {
                    body: '<p>Time to Hulk Smash!</p>',
                    channel_id: 1,
                    user_id: 5,
                    message_type: 'message'
                  },
                  {
                    body: '<p>Ahem, Jarvis says my schedule is free</p>',
                    channel_id: 1,
                    user_id: 4,
                    message_type: 'message'
                  },
                  {
                    body: '<p>And no, Peter, you can not use the suit</p>',
                    channel_id: 1,
                    user_id: 4,
                    message_type: 'message'
                  },
                  {
                    body: '<p>Aw Man! Next time!</p>',
                    channel_id: 1,
                    user_id: 2,
                    message_type: 'message'
                  },
                  {
                    body: '<p>Avengers Assemble!</p>',
                    channel_id: 1,
                    user_id: 3,
                    message_type: 'message'
                  },
                  {
                    body: '<p>Anyone know if that shawarma place is still open?</p>',
                    channel_id: 2,
                    user_id: 4,
                    message_type: 'message'
                  }
                ])

Reaction.create!([
                   {
                     user_id: 8,
                     message_id: 1,
                     emoji: ':+1::skin-tone-2:'
                   },
                   {
                     user_id: 5,
                     message_id: 1,
                     emoji: ':+1::skin-tone-2:'
                   },
                   {
                     user_id: 2,
                     message_id: 1,
                     emoji: ':+1::skin-tone-2:'
                   },
                   {
                     user_id: 2,
                     message_id: 5,
                     emoji: ':ok_hand::skin-tone-2:'
                   },
                   {
                     user_id: 2,
                     message_id: 6,
                     emoji: ':no_mouth:'
                   },
                   {
                     user_id: 2,
                     message_id: 7,
                     emoji: ':rolling_on_the_floor_laughing:'
                   },
                   {
                     user_id: 2,
                     message_id: 8,
                     emoji: ':open_mouth:'
                   },
                   {
                     user_id: 8,
                     message_id: 14,
                     emoji: ':100:'
                   },
                   {
                     user_id: 2,
                     message_id: 19,
                     emoji: ':slightly_frowning_face:'
                   },
                   {
                     user_id: 2,
                     message_id: 19,
                     emoji: ':broken_heart:'
                   }
                 ])
