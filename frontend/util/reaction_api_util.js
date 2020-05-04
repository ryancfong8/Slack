export const createReaction = (reaction) =>
  $.ajax({
    method: 'POST',
    url: 'api/reactions',
    data: { reaction },
  });

export const deleteReaction = (reaction) =>
  $.ajax({
    method: 'DELETE',
    url: `api/reactions/${reaction.id}`,
    data: { reaction },
  });
