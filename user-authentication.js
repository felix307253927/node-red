const users = new Map([
  ['admin', {
    pwd: '123123',
    auth: "*"
  }]
])


module.exports = {
  type: "credentials",
  users: function (username) {
    console.log('---', username);
    return new Promise(function (resolve) {
      // Do whatever work is needed to check username is a valid
      // user.
      const user = users.get(username)
      if (user) {
        // Resolve with the user object. It must contain
        // properties 'username' and 'permissions'
        console.log('resolve users', username);
        resolve({
          username: username,
          permissions: user.pwd
        });
      } else {
        // Resolve with null to indicate this user does not exist
        resolve(null);
      }
    });
  },
  authenticate: function (username, password) {
    return new Promise(function (resolve) {
      // Do whatever work is needed to validate the username/password
      // combination.
      const user = users.get(username)
      if (user && user.pwd === password) {
        // Resolve with the user object. Equivalent to having
        // called users(username);
        resolve({
          username: username,
          permissions: user.auth
        });
      } else {
        // Resolve with null to indicate the username/password pair
        // were not valid.
        resolve(null);
      }
    });
  },
  default: function () {
    return new Promise(function (resolve) {
      // Resolve with the user object for the default user.
      // If no default user exists, resolve with null.
      resolve({
        anonymous: true,
        permissions: "read"
      });
    });
  }
}