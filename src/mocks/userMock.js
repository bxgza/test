import Mock from 'mockjs';

export const userMock = {
  // 获取用户信息
  'GET /my/userinfo': () => {
    return Mock.mock({
      code: 0,
      data: {
        'userId': '@id()',
        'username': 'admin',
        'email': 'admin@example.com',
        'avatar': '@/assets/bozai.png',
        'createTime': '@datetime'
      },
      message: '获取成功'
    });
  },

  // 更新用户信息
  'PUT /my/userinfo': (options) => {
    const data = JSON.parse(options.body);
    return {
      code: 0,
      data: data,
      message: '更新成功'
    };
  },
  //更换头像
  'PATCH /my/update/avatar':(avatar)=>{
    const data=JSON.parse(avatar.body)
    return {
      code:0,
      data:data,
      message:'更新成功'
    }
  }
};