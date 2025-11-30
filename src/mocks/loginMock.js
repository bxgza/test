import Mock from 'mockjs';

export const loginMock = {
  // 登录接口
  'POST /login': (options) => {
    const { username, password } = JSON.parse(options.body);
    
    if (username === 'admin1' && password === '123456') {
      return Mock.mock({
        code: 0,
        data: {
          'token': '@guid()',
          'userId': '@id()',
          'username': username,
          'avatar': '@image("100x100")'
        },
        message: '登录成功'
      });
    } else {
      return {
        code: 401,
        data: null,
        message: '用户名或密码错误'
      };
    }
  },

  // 注册接口
  'POST /reg': (options) => {
    const { username, email, password } = JSON.parse(options.body);
    
    if (username === 'existing_user') {
      return {
        code: 400,
        data: null,
        message: '用户名已存在'
      };
    }
    
    return Mock.mock({
      code:0,
      data: {
        'userId': '@id()',
        'username': username,
        'email': email
      },
      message: '注册成功'
    });
  },

  // 登出接口
  'POST /logout': () => {
    return {
      code: 0,
      data: null,
      message: '登出成功'
    };
  }
};