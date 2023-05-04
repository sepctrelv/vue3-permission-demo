exports.validateUserRegister = (body, jsonObj) => {
  let message = '';
  let unPassed = false;
  const { account, password, identity } = body;

  if (!body || !account || !password || !identity) {
    message = '缺少用户信息';
    unPassed = true
  } else if (!['admin', 'member', 'guest'].includes(identity)) {
    message = '缺少正确的用户身份';
    unPassed = true
  } else if (jsonObj.users.some(item => item.account === account)) {
    message = '用户已存在';
    unPassed = true
  }

  return { unPassed, message }
}

exports.validateUserLogin = (body, user) => {
  let message = '';
  let unPassed = false;
  const { account, password } = body;


  if (!body || !account || !password) {
    message = '缺少用户信息';
    unPassed = true
  } else if (!user) {
    message = '用户不存在';
    unPassed = true
  } else if (user.password !== password) {
    message = '密码不正确';
    unPassed = true
  }

  return { unPassed, message }
}

exports.generateUserId = (obj) => {
  return obj.users.length === 0 ? 1 : obj.users[obj.users.length - 1].uid + 1;
};