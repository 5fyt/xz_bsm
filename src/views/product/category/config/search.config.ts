const searchFormConfig = {
  pageName:'category',
  searchList: [
    {
      prop: 'name',
      type: 'input',
      label: '类别名称',
      placeHolder: '请输入类别名称',
      rules: []
    },
    {
      prop: 'createAt',
      type: 'date-picker',
      label: '创建时间',
      rules: [],
      otherOption: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  labelWidth: '100px',
  itemStyle: { padding: '10px 40px' },
  colLayout: { span: 8 }
}
export default searchFormConfig
