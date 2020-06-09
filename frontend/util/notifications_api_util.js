export const createNotification = (channel_id) =>
  $.ajax({
    type: 'POST',
    url: `api/notifications`,
    data: {
      channel_id,
    },
  });

export const deleteNotifications = (channel_id) =>
  $.ajax({
    type: 'DELETE',
    url: `api/notifications/${channel_id}`,
    data: {
      channel_id,
    },
  });
