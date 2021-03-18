<template>
  <div>
    <van-uploader v-if="size=='small'"
      v-model="images"
      :preview-image="false"
      :capture="capture"
      :multiple="multiple" 
      :max-size="maxSize"
      :max-count="maxCount"
      :before-read="beforeRead" 
      :after-read="afterRead"
      :before-delete="beforeDelete"
      @delete="deleteImg">
      <van-icon size="25" name="photograph" />
    </van-uploader>
    <van-uploader
      v-else
      v-model="images"
      :capture="capture"
      :multiple="multiple" 
      :max-size="maxSize"
      :max-count="maxCount"
      :before-read="beforeRead" 
      :after-read="afterRead"
      :before-delete="beforeDelete"
      @delete="deleteImg"
    />
    <upload-form v-for="(img, k) in images" :key="k" :file-data="img" :index="k" @upload="uploadImag"/>
  </div>
</template>
<script>
import { GetStaticToken, GetMoreStaticToken } from '@/api/list'
import uploadForm from './uploadForm'
export default {
  name: 'uploader',
  components: { uploadForm },
  props: {
    fileList: {
      type: Array,
      default: ()=>([])
    }, 
    multiple: {
      type: Boolean,
      default: ()=>(false)
    },
    capture: {
      type: String
    },
    maxSize: {
      type: Number|String
    },
    maxCount: {
      type: Number|String
    },
    size: {
      type: String,
      default: 'normal'
    },
    BelongType: {
      type: String
    },
    BelongId: {
      type: String|Number
    }
  },
  model: {
    prop: 'fileList',
    event: 'change'
  },
  watch: {
    'fileList':function(n,o){
      if (this.fileList.length>0){
        for (var i in this.fileList){
          if (typeof this.fileList[i].Id==='number'){
            this.images.push({
              url:this.fileList[i].URL,
              status:'done',
              id: this.fileList[i].Id,
              t: 'have'
            })
          }
        }
      }
    }
  },
  data() {
    return {
      images:[],
      uploadList:[],
      rmlist: []
    }
  },
  mounted() {
  },
  methods: {
    beforeRead(file) {
      if (Array.isArray(file)){
        var paths = []
        for(var i in file){
          paths.push(file[i].name)
        }
        return GetMoreStaticToken({
          'cdn_name': 'qiniu',
          'file_paths': paths
        }).then(rsp =>{
          for(var i in file){
            file[i].StaticData = {
              upload_url: rsp.data.upload_url,
              bucket_url: rsp.data.bucket_url,
              token: rsp.data.tokens[i].token,
              file_path: rsp.data.tokens[i].file_path
            }
          }
        })
      } else {
        return GetStaticToken({
          cdn_name: 'qiniu',
          file_path: file.name,
          file_mime: file.type
        }).then(rsp =>{
          file.StaticData = rsp.data
        })
      }

    },
    afterRead(files) {
      // status 属性可以标识上传状态，uploading 表示上传中，failed 表示上传失败，done 表示上传完成。
      console.log(this.images)
    },
    beforeDelete(file){
      return true
    },
    deleteImg(file,index) {
      if (file.t === 'have'){
        for(var i=0;i<this.fileList.length;i++){
          if(file.id==this.fileList[i].Id){
            this.fileList[i].t = 'del'
            this.rmlist.push(this.fileList[i])
            break
          }
        }
      }
      this.emitSave()
    },
    uploadImag(status,rsp,$index) {
      this.emitSave()
    },
    emitSave(){
      var tmp = []
      for(var i in this.images){
        if (this.images[i].status=='done'){
          if (this.images[i].t=="new"){
            tmp.push({
              name: this.images[i].file.name,
              mime: this.images[i].file.type,
              f_type: 1,
              url: this.images[i].url,
              store: 'qiniu',
            })
          }
        }
      }
      this.$emit('change',tmp,this.rmlist)
    }
  }
}
</script>
