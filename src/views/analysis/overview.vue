<!-- <template>
  <h2>商品统计</h2>
</template> -->
<template>
  <div class="table">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%; height: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="序号" width="120">
        <template #default="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="超星尔雅在线课程" width="400">
        <template #default="scope">{{ scope.row.courseName }}</template>
      </el-table-column>
      <el-table-column prop="name" label="课时" width="120">
        <template #default="scope">{{ scope.row.time }}</template>
      </el-table-column>
      <el-table-column prop="address" label="学分">
        <template #default="scope">{{ scope.row.score }}</template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            :loading="scope.row.id === 2 ? showId : show"
            @click="selectCourse(scope.row.id)"
            >选课</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          courseName: '《时间简史》导读',
          time: '10',
          score: '1'
        },
        {
          id: 2,
          courseName: '创新思维训练',
          time: '10',
          score: '1'
        },
        {
          id: 3,
          courseName: '创业人生',
          time: '10',
          score: '1'
        },
        {
          id: 4,
          courseName: '从草根到殿堂：流行音乐导论',
          time: '24',
          score: '1'
        },
        {
          id: 5,
          courseName: '大学生魅力讲话实操',
          time: '10',
          score: '1'
        },
        {
          id: 6,
          courseName: '法律基础',
          time: '30',
          score: '1'
        },
        {
          id: 7,
          courseName: '论文写作初阶',
          time: '12',
          score: '1'
        },
        {
          id: 8,
          courseName: '媒体创意经济：玩转互联网时代',
          time: '16',
          score: '1'
        },
        {
          id: 9,
          courseName: '人工智能与信息社会',
          time: '21',
          score: '1'
        },
        {
          id: 10,
          courseName: '人人爱设计',
          time: '15',
          score: '1'
        },
        {
          id: 11,
          courseName: '声明安全与教程',
          time: '27',
          score: '1'
        },
        {
          id: 12,
          courseName: '微表情识别：读心和读脸',
          time: '27',
          score: '1'
        }
      ],
      multipleSelection: [],
      show: false,
      showId: false
    }
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    selectCourse(id) {
      if (id === 2) {
        this.showId = true
      } else {
        ElMessage.success('选课成功')
      }
    }
  }
}
</script>
