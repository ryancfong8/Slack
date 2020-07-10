# ChatHero

[ChatHero Live](heroku)

[heroku]: https://chathero.herokuapp.com/

ChatHero is a full stack web application inspired Slack. It is built using React with Redux architectural framework on the frontend, Ruby on Rails on the backend, and a PostgreSQL database. ChatHero has been upgraded to use React Hooks. ChatHero also uses Elasticsearch to search through messages. ChatHero aims to connect users together through organized communication.

<!-- ![home page](readME_photos/home_page.png) -->

## Features and Implementation

### Channels

ChatHero allows users to create 3 types of channels: a public channel, a private channel, and direct message channel. Any user can join, view, and add messages to any public channel. Users can search through public channels based on the channel name. Private channels can only be accessed by members. Same with direct messages. Private channels and direct messages will have the `channel_private` field as true. The difference between private channels and direct messages is that a private channel will have a `name`.

<!-- ![sidebar](readME_photos/sidebar.png) -->
<!-- ![create channel](readME_photos/create_channel.png) -->
<!-- ![browse channel](readME_photos/browse_channel.png) -->

Users can search for and add members to any channel they are part of. This is the same process to make a direct channel.

<!-- ![add member](readME_photos/create_channel.png) -->
<!-- ![direct message](readME_photos/browse_channel.png) -->

### Text Editor

<!-- ![Text Editor](readME_photos/text_editor.png) -->

The text editor is built with a fork of the react-draft-wysiwig package. It allows for text formatting and a variety of other features a simple text input does not have. React-draft-wysiwig is built on top of DraftJS, a rich text editor framework from Facebook. Users can format their text, include emojis, and mention other users with the feature.

### Messaging

<!-- ![Messaging](readME_photos/messaging.png) -->

ChatHero uses websockets to update messages in real time. ChatHero accomplishes this by using ActionCable to create these websockets that allow data to stream directly between the client and server. Users are subscribed to every channel that they are part of. When a new message is created, the new message is either added to the channel the user is viewing, or a notification is created to alert the user that they have received a new message.

### Notifications

<!-- ![Notifications](readME_photos/notifications.png) -->

Notifications are generated when a user receives a message and is not viewing the channel that the message is part of. An alert shows in the upper right corner to convey that the user has received a new message. In addition, a red number will appear next to the channel, to convey the number of unread messages. These notifications are stored in a notifications database, and will be removed when the user views the channel. If the user clicks the alert in the upper right, the user will be taken to the channel that contains the message, and the message will briefly highlight.

### Search Messages

<!-- ![Search](readME_photos/search.png) -->

Users have the ability to search through their messages from every channel that they are part of. Messages can be found by searching it's contents. All messages containing the search term will come up the search results. Users can filter search results by user or by channel. Clicking on the search result will take the user to the channel that contains the message.

### Emojis

<!-- ![Emojis](readME_photos/emojis.png) -->

Users can react to any message with a wide variety of emojis. Users can also include select emojis in their message. The EmojiMart npm package provides the emojis that users can select. A future improvement is to use EmojiMart in the text editor, currently the editor has a select amount of emojis.

### User Profile

<!-- ![User Profile](readME_photos/user_profile.png) -->

Users can edit their user profile. A username is required, but full name and profile picture are not. Users can change this information at any time. Photos are hosted by Cloudinary.

## Future Improvements

Future Improvements for this project are:

- Implementing multiple workspaces, currently everything is one workspace
- Using the same emoji component in both the editor and the message
- Email notifications
- Bookmark channels
- Search for more than just messages
