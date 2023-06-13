const contentConfig = {
  pageName: 'department',
  //配置头部信息
  header: {
    title: '部门列表',
    handleBtn: '新增部门'
  },
  //配置表格信息
  departmentList: [
    {
      type: 'selection',
      width: '70',
      label: ''
    },
    {
      type: 'index',
      width: '70',
      label: '序号'
    },
    {
      type: 'normal',
      prop: 'name',
      label: '部门名称',
      width: '150'
    },
    {
      type: 'normal',
      prop: 'leader',
      label: '部门领导',
      width: '150'
    },
    {
      type: 'normal',
      prop: 'parentId',
      label: '上级部门',
      width: '150'
    },
    {
      type: 'timer',
      prop: 'createAt',
      label: '创建时间'
    },
    //创建时间配置
    {
      type: 'timer',
      prop: 'updateAt',
      label: '更新时间'
    },
    //操作配置
    {
      type: 'handler',
      label:'操作',
      width:''
    },
    // //配置自定义模块
    //  {
    //   type: 'custom',
    //   label: '部门领导',
    //   prop: 'leader',
    //   width: '150px',
    //   slotName: 'leader'
    // },
    // {
    //   type: 'custom',
    //   label: '上级部门',
    //   prop: 'parentId',
    //   width: '150px',
    //   slotName: 'parent'
    // },
  ]
}
export default contentConfig
