export const getUsers = () =>
  $.ajax({
    method: 'GET',
    url: 'api/users'
  });

export const searchUsers = query =>
  $.ajax({
    method: 'GET',
    url: 'api/users',
    data: {
      query
    }
  });
