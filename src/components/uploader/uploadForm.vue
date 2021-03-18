<template>
    <form :id="'form_'+index" method="post" ref="upload" enctype="multipart/form-data" style="display:none;" :action="staticData.upload_url" >
      <input name="key" type="hidden" :value="staticData.file_path">
      <input name="token" type="hidden" :value="staticData.token">
      <input name="accept" type="hidden" value="application/json"/>
    </form>
</template>
<script>
import { SimpleFormUploadToQiniuWithForm } from '@/utils/upload'
export default {
    name: 'uploadForm',
    props: {
        fileData: {
            type: Object
        },
        index: {
            type: Number
        }
    },
    created(){
        if (typeof this.data.file ==='undefined'){
            this.no = true
            this.data = 'done'
        }else{
            this.staticData = this.data.file.StaticData
        }
    },
    mounted(){
        if (this.data.status==''){
            this.upload()
        }
    },
    data() {
        return {
            data: this.fileData,
            staticData: {}
        }
    },
    methods: {
        upload() {
            this.data.status = 'uploading'
            this.data.message = '上传中'
            var fromdata = new FormData(this.$refs['upload'])
            fromdata.append('file',this.data.file)
            SimpleFormUploadToQiniuWithForm(fromdata,this.staticData.upload_url).then(rsp => {
                this.data.status = 'done'
                this.data.message = '上传成功'
                this.data.url = this.staticData.bucket_url+this.staticData.file_path
                this.data.t = 'new'
                this.$emit('upload',1,rsp,this.index)
            }).catch(err =>{
                this.data.status = 'failed'
                this.data.message = '上传失败'
                this.$emit('upload',0,err,this.index)
            })
        }
    }
}
</script>
