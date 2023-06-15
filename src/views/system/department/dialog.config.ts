const dialogConfig={
  pageName:'department',
  header:{
    add:'新增用户',
    edit:'编辑用户'
  },
  dialogList:[
    {
      type:'input',
      label:'部门名称',
      prop:'name',
      placeholder:'请输入部门名称',
      initialValue:'营销部'
    },
    {
      type:'input',
      label:'部门领导',
      prop:'leader',
      placeholder:'请输入部门领导'
    },

    {
      type:'select',
      label:'请选择',
      prop:'parentId',
      placeholder:'请输入上级部门',
      options:[]
    }
  ]
}
export default dialogConfig
