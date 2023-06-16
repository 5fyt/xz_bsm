const searchFormConfig = {
  searchList: [
    {
      prop: 'name',
      type: 'input',
      label: '商品名称',
      placeholder: '请输入商品名称',
      rules: []
    },
    {
      prop: 'address',
      type: 'input',
      label: '商品地址',
      placeholder: '请输入商品地址',
      rules: []
    },
    {
      prop: 'enable',
      type: 'select',
      label: '状态',
      placeholder: '请选择状态',
      rules: [],
      options: [
        { label: '可用', value: 1 },
        { label: '下架', value: 0 }
      ]
    },
    {
      prop: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      rules: [],
    }
  ],
}
export default searchFormConfig
