import Mock from 'mockjs'

export const getTrade = Mock.mock({
  total: 1,
  elecLogVoList: [
    {
      cancelTime: 1553937223000,
      created: 1553935349000,
      orderSn: function() {
        return Mock.mock('@id()')
      },
      status: 2
    }
  ]
})
