<template>
  <div class="container mt--300 text-center">
    <h3 class="display-3 text-white">请在此界面上传您的作品</h3>
    <el-upload
      :before-upload="beforeUpload"
      action=""
      ref="uploadForm"
      :auto-upload="false"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      multiple
      >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <base-button type="success" class="upload-button" @click="submitUpload">点击上传</base-button>
  </div>
  
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      params: {}
    };
  },
  created: function() {
    const info = JSON.parse(localStorage.getItem('user-info'))
    this.params = { 'mail': info.mail }
  },
  methods: {
    handleRemove(file, fileList) {
      
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitUpload() {
      // console.log(this.params)
      this.$refs.uploadForm.submit()
      const info = JSON.parse(localStorage.getItem('user-info'))
      const formData = new FormData()
      const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } }
      this.fileList.forEach(file => {
        formData.append('files', file)
      })
      formData.append('mail', info.mail)
      console.log(formData)
      axios.post('http://localhost:3000/users/multiUpload', formData, headerConfig).then(res => {
        console.log(res)
        return this.$store.dispatch('user/getInfo')
      })
      .then(data => {
        
      })
      .catch(err => {
        console.log(err)
      })
    },
    beforeUpload(file) {
      this.fileList.push(file)
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-button{
  margin: 2vh auto;
}
</style>