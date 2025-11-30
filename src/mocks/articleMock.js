import Mock from 'mockjs';

// 初始化数据存储
const initArticleData = () => {
  if (!localStorage.getItem('mockCategories')) {
    const defaultCategories = [
      { id: 1, cate_name: '技术文章', cate_alias: 'tech', create_time: new Date().toISOString() },
      { id: 2, cate_name: '生活随笔', cate_alias: 'life', create_time: new Date().toISOString() },
      { id: 3, cate_name: '学习笔记', cate_alias: 'study', create_time: new Date().toISOString() }
    ];
    localStorage.setItem('mockCategories', JSON.stringify(defaultCategories));
  }
  
  if (!localStorage.getItem('mockArticles')) {
    const defaultArticles = [
      {
        id: 1,
        title: 'Vue3入门教程',
        content: '这是Vue3的入门教程内容...',
        cate_id: 1,
        cate_name: '技术文章',
        state: '已发布',
        pub_date: new Date().toISOString(),
        create_time: new Date().toISOString(),
        update_time: new Date().toISOString()
      },
      {
        id: 2,
        title: '我的日常生活',
        content: '今天天气很好...',
        cate_id: 2,
        cate_name: '生活随笔',
        state: '草稿',
        pub_date: null,
        create_time: new Date().toISOString(),
        update_time: new Date().toISOString()
      }
    ];
    localStorage.setItem('mockArticles', JSON.stringify(defaultArticles));
  }
};

export const articleMock = {
  // 获取文章分类列表
  'GET /my/cate/list': () => {
    initArticleData();
    const categories = JSON.parse(localStorage.getItem('mockCategories') || '[]');
    
    return {
      code: 0,
      data: categories,
      message: '获取分类列表成功'
    };
  },

  // 添加文章分类
  'POST /my/cate/add': (options) => {
    initArticleData();
    const { cate_name, cate_alias } = JSON.parse(options.body);
    const categories = JSON.parse(localStorage.getItem('mockCategories'));
    
    // 检查分类名是否已存在
    if (categories.find(cate => cate.cate_name === cate_name)) {
      return {
        code: 1,
        data: null,
        message: '分类名称已存在'
      };
    }
    
    // 检查别名是否已存在
    if (categories.find(cate => cate.cate_alias === cate_alias)) {
      return {
        code: 1,
        data: null,
        message: '分类别名已存在'
      };
    }
    
    const newCategory = {
      id: categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1,
      cate_name,
      cate_alias,
      create_time: new Date().toISOString()
    };
    
    categories.push(newCategory);
    localStorage.setItem('mockCategories', JSON.stringify(categories));
    
    return {
      code: 0,
      data: newCategory,
      message: '添加分类成功'
    };
  },

  // 更新文章分类
  'PUT /my/cate/info': (options) => {
    initArticleData();
    const updateData = JSON.parse(options.body);
    const categories = JSON.parse(localStorage.getItem('mockCategories'));
    
    const categoryIndex = categories.findIndex(cate => cate.id === updateData.id);
    
    if (categoryIndex === -1) {
      return {
        code: 1,
        data: null,
        message: '分类不存在'
      };
    }
    
    // 检查分类名是否重复（排除自己）
    if (categories.find(cate => cate.id !== updateData.id && cate.cate_name === updateData.cate_name)) {
      return {
        code: 1,
        data: null,
        message: '分类名称已存在'
      };
    }
    
    // 检查别名是否重复（排除自己）
    if (categories.find(cate => cate.id !== updateData.id && cate.cate_alias === updateData.cate_alias)) {
      return {
        code: 1,
        data: null,
        message: '分类别名已存在'
      };
    }
    
    categories[categoryIndex] = {
      ...categories[categoryIndex],
      ...updateData,
      update_time: new Date().toISOString()
    };
    
    localStorage.setItem('mockCategories', JSON.stringify(categories));
    
    return {
      code: 0,
      data: categories[categoryIndex],
      message: '更新分类成功'
    };
  },

  // 删除文章分类
  'DELETE /my/cate/del': (options) => {
    initArticleData();
    const { id } = JSON.parse(options.body);
    const categories = JSON.parse(localStorage.getItem('mockCategories'));
    const articles = JSON.parse(localStorage.getItem('mockArticles'));
    
    // 检查分类下是否有文章
    const articlesInCategory = articles.filter(article => article.cate_id === parseInt(id));
    if (articlesInCategory.length > 0) {
      return {
        code: 1,
        data: null,
        message: '该分类下存在文章，无法删除'
      };
    }
    
    const categoryIndex = categories.findIndex(cate => cate.id === parseInt(id));
    
    if (categoryIndex === -1) {
      return {
        code: 1,
        data: null,
        message: '分类不存在'
      };
    }
    
    categories.splice(categoryIndex, 1);
    localStorage.setItem('mockCategories', JSON.stringify(categories));
    
    return {
      code: 0,
      data: null,
      message: '删除分类成功'
    };
  },

  // 获取文章列表
  'GET /my/article/list': (options) => {
    initArticleData();
    const params = new URLSearchParams(options.url.split('?')[1]);
    const cate_id = params.get('cate_id');
    const state = params.get('state');
    const pagenum = parseInt(params.get('page')) || 1;
    const pageSize = parseInt(params.get('pageSize')) || 10;
    
    let articles = JSON.parse(localStorage.getItem('mockArticles') || '[]');
    
    // 确保articles是数组
  if (!Array.isArray(articles)) {
    console.warn('articles不是数组，重置为空数组');
    articles = [];
    localStorage.setItem('mockArticles', JSON.stringify(articles));
  }
    // 过滤条件
    if (cate_id) {
      articles = articles.filter(article => article.cate_id === parseInt(cate_id));
    }
    if (state) {
      articles = articles.filter(article => article.state === state);
    }
    
    // 分页
    const total = articles.length;
    const startIndex = (pagenum - 1) * pageSize;
    const paginatedArticles = articles.slice(startIndex, startIndex + pageSize);
    
    return {
      code: 0,
      data: paginatedArticles,
      total:total,
      message: '获取文章列表成功'
    };
  },

  // mock/article.js

// 1. 添加文章 - 处理 FormData
'POST /my/article/add': (options) => {
  initArticleData();
  
  console.log('接收到 FormData 添加请求',options.body);
  
  // 模拟从 FormData 中解析的数据
  const mockData = {
    id: Mock.mock('@id'),
    title: '新文章标题',
    content: '新文章内容',
    cate_id: 1,
    cate_name: '技术文章',
    state: '草稿',
    cover_img: Mock.mock('@image("800x600")'),
    create_time: new Date().toISOString(),
    update_time: new Date().toISOString()
  };
  
  const articles = JSON.parse(localStorage.getItem('mockArticles') || '[]');
  articles.push(mockData);
  localStorage.setItem('mockArticles', JSON.stringify(articles));
  
  return {
    code: 0,
    data: mockData,
    message: '添加成功'
  };
},

'PUT /my/article/info': (options) => {
  initArticleData();
  
  console.log('编辑请求:', options);
  
  // 如果前端需要返回数据，可以从 localStorage 获取最新数据
  const articles = JSON.parse(localStorage.getItem('mockArticles') || '[]');
  const latestArticle = articles[articles.length - 1]; // 获取最新文章
  
  return {
    code: 0,
    data: latestArticle || null,
    message: '修改成功'
  };
},

  // 删除文章
  'DELETE /my/article/info': (options) => {
    initArticleData();
    const { id } = JSON.parse(options.body);
    const articles = JSON.parse(localStorage.getItem('mockArticles'));
    
    const articleIndex = articles.findIndex(article => article.id === parseInt(id));
    
    if (articleIndex === -1) {
      return {
        code: 1,
        data: null,
        message: '文章不存在'
      };
    }
    
    articles.splice(articleIndex, 1);
    localStorage.setItem('mockArticles', JSON.stringify(articles));
    
    return {
      code: 0,
      data: null,
      message: '删除文章成功'
    };
  },

  // 获取文章详情
  'GET /my/article/info': (options) => {
    initArticleData();
    
    const articles = JSON.parse(localStorage.getItem('mockArticles') || '[]');
    const urlParams = new URLSearchParams(options.url.split('?')[1] || '');
    const id = urlParams.get('id');
    const article = articles.find(a => a.id === parseInt(id));
    console.log(`获取到的id：${id}+文章列表：${articles.value}`)
    if (!article) {
      return {
        code: 1,
        data: null,
        message: '文章不存在'
      };
    }
    
    return {
      code: 0,
      data: article,
      message: '获取文章详情成功'
    };
  }
};