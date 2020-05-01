export const getMessages = (channel_id) =>
  $.ajax({
    method: 'GET',
    url: 'api/messages',
    data: {
      channel_id,
    },
  });

export const createMessage = (message) =>
  $.ajax({
    method: 'POST',
    url: 'api/messages',
    data: { message },
  });

export const updateMessage = (message) =>
  $.ajax({
    method: 'PATCH',
    url: `api/messages/${message.id}`,
    data: { message },
  });

export const deleteMessage = (message) =>
  $.ajax({
    method: 'DELETE',
    url: `api/messages/${message.id}`,
    data: { id: message.id },
  });
