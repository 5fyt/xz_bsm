const searchConfig = {
  pageName:'department',
  searchList: [
    {
      type: 'input',
      label: '部门名称',
      prop: 'name',
      placeholder: '请输入你的部门名称',
      initialValue:'老板部'
    },{
      type:'input',
      label: '领导名称',
      prop: 'leader',
      placeholder: '请输入你的领导名称'
    },{
      type:'date-picker',
      label:'创建时间',
      prop:'createAt'
    }
  ]
}
export default searchConfig
