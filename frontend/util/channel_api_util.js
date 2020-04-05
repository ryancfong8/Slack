export const getCurrentChannel = id =>
  $.ajax({
    method: 'GET',
    url: `api/channels/${id}`
  });

export const createChannel = (channel, member_ids) =>
  $.ajax({
    method: 'POST',
    url: 'api/channels',
    data: { channel, member_ids }
  });

export const updateChannel = (channel, member_ids) =>
  $.ajax({
    method: 'PATCH',
    url: `api/channels/${channel.id}`,
    data: { channel, member_ids }
  });

export const deleteChannel = id =>
  $.ajax({
    method: 'DELETE',
    url: `api/channels/${id}`,
    data: { id }
  });

export const searchChannels = data =>
  $.ajax({
    method: 'GET',
    url: 'api/channels',
    data
  });
