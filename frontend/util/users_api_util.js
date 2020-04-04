export const getUsers = () =>
  $.ajax({
    method: 'GET',
    url: 'api/users'
  });

export const searchUsers = data =>
  $.ajax({
    method: 'GET',
    url: 'api/users',
    data
  });
