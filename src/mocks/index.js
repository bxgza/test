import Mock from 'mockjs';
import { loginMock } from '@/mocks/loginMock';
import { userMock } from '@/mocks/userMock';
import { articleMock } from './articleMock';

// 是否开启mock
const isMock = true;

export function setupMock() {
  if (!isMock) {
    return;
  }

  // 设置全局延迟，模拟网络请求
  Mock.setup({
    timeout: '200-600'
  });

  // 注册所有mock接口
  Object.keys(loginMock).forEach(key => {
    const [method, url] = key.split(' ');
    Mock.mock(new RegExp(url), method.toLowerCase(), loginMock[key]);
  });

  Object.keys(userMock).forEach(key => {
    const [method, url] = key.split(' ');
    Mock.mock(new RegExp(url), method.toLowerCase(), userMock[key]);
  });

  Object.keys(articleMock).forEach(key=>{
    const [method,url]=key.split(' ')
    Mock.mock(new RegExp(url),method.toLowerCase(),articleMock[key])
  })
  console.log('Mock服务已启动');
}
console.log("feat:articles")