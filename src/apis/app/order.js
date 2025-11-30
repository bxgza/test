import { ref } from 'vue'

// 模拟数据库（表格数据）
export const mockTableData = [
  {
    id: 1,
    orderNo: 'ON202501010001',
    productId: 'P1001',
    productName: '苹果手机 128G',
    phone: '13812345678',
    platformType: ['京东'],
    productCategory: '电子产品',
    paymentMethod: '支付宝',
    payStatus: 'paid',
    actualPayment: '5999.00',
    payTime: '2025-01-01 10:20:30',
    createTime: '2025-01-01 10:00:00',
    orderStatus: 'completed'
  },
  {
    id: 2,
    orderNo: 'ON202501010002',
    productId: 'P2001',
    productName: '蓝牙耳机 Pro',
    phone: '13998765432',
    platformType: ['拼多多'],
    productCategory: '数码配件',
    paymentMethod: '微信支付',
    payStatus: 'unpaid',
    actualPayment: '299.00',
    payTime: '',
    createTime: '2025-01-01 11:30:00',
    orderStatus: 'pending'
  }
]

// 自增 ID 模拟数据库自增
let autoId = 3
//获取数据
export const getOrderList = (params) => {
  console.log('queryParams:', params)

  const{
    pageNum,
    pageSize,
    orderName,
    payStatus,
    
    platformType,
    timeRange
  }=params
  let res=[...mockTableData]
  if(orderName){
    res=res.filter(item=>item.productName.includes(orderName))
  }
  if(payStatus){
    res=res.filter(item=>item.payStatus===payStatus)
  }
  if(platformType){
    res=res.filter(item=>item.platformType.includes(platformType))
  }
  if(timeRange&&timeRange.length===2){
    const [start,end]=timeRange
    const startTime=new Date(start).getTime()
    const endTime=new Date(end).getTime()
    res=res.filter(item=>{
      const t=new Date(item.createTime).getTime()
      return t>=startTime&&t<=endTime
    })
  }
  
  const start = (pageNum - 1) * pageSize
  const end = start + pageSize

  return Promise.resolve({
    list: res.slice(start, end),
    total: res.length
  })
}
//新增
export const addOrder = (data) => {
  mockTableData.unshift({
    ...data,
    id: autoId++, // 模拟数据库自增 ID
    createTime: data.createTime || new Date().toISOString(),
  })

  return Promise.resolve({
    message: '新增成功',
    data:data
  })
}
//修改
export const updateOrder = (formData) => {
  const index = mockTableData.findIndex(item => item.id === formData.id)
  if (index !== -1) {
    mockTableData[index] = {
      ...mockTableData[index],
      ...formData
    }
  }

  return Promise.resolve({
    message: '修改成功',
  })
}
//删除
export const deleteOrder=(id)=>{
  const index=mockTableData.value.findIndex(item=>item.id===id)
  if(index!==-1){
    mockTableData.value.splice(index,1)
  }
  return Promise.resolve({
    message:'删除成功'
  })
}



