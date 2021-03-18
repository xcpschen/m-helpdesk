<template>
    <section>
        <van-form @submit="onSubmit">
            <van-field
              :value="userName"
              name="man"
              label="申请人"
              placeholder="请输入用户名"
              disabled/>
            <fpicker 
              v-model="form.Level" 
              title="等级" 
              name="Level"
              @change="selectLevel"
              :rules="[{ validator: checkLevel, message: '请设置等级',trigger:'onChange' }]"
              :columns="['','普通','紧急','非常紧急']" />
            <fpicker 
              v-model="form.CityOffice" 
              title="办公地点" 
              name="City" 
              :rules="[{ required: true, message: '请选择所在城市-办公地点' }]"
              :columns="citysOffice" @change="changeCO"/>
            <qtype
              v-model="form.TagClassId"
              :tag-class="form.TagClassId"
              name="TagClassId"
              title="分类"
              :fristType="ft"
              :rules="[{ required: true, message: '请选择分类' }]"
              @select="select"/>
            <ifield ref="ifield" :code="code" v-model="form.Detail"/>
            <van-field name="uploader" label="图片上传">
              <template #input>
                <uploader v-model="attachments" :max-count="8" :multiple="true" @change="hanldeImg"/>
              </template>
            </van-field>
            <h6 class="title">请简单用不超过250字符描述一下问题</h6>
            <van-field
              :rules="[{ required: true, message: '请简单描述问题' }]"
              v-model="form.Content"
              name="Content"
              rows="4"
              autosize
              label="问题描述"
              type="textarea"
              maxlength="250"
              placeholder="请输入留言"
              show-word-limit
              style="margin-bottom:100px"
            />
          <van-button type="primary" block class="submitbtn" :disabled="sub">重提</van-button>
        </van-form>
    </section>
</template>
<script>
import qtype from './components/qtype'
import ifield from './components/ifield'
import fpicker from './components/fpicker'
import uploader from '@/components/uploader/index'
import { getInfo, Edit } from '@/api/list'
import { CityList } from '@/api/city'
import { mapGetters } from 'vuex'

export default {
  name: 'question',
  components: {qtype, ifield, fpicker, uploader},
  computed: {
    ...mapGetters([
      'GetUser'
    ]),
    userName() {
      return this.GetUser.Nickname
    }
  },
  data () {
    return {
      form: {
        Detail: "",
        Level:1,
        CityOffice: '',
        TagClassId: 0,
      },
      attachments:[],
      sub:false,
      code: [],
      ft:'',
      citysOffice:[],
    }
  },
  beforeRouteEnter (to, from, next) {
    getInfo({Id: to.params.id}).then(rsp => {
        next(vm => vm.init(rsp.data))
    })
  },
  created(){
  },
  methods: {
    init(data){
        this.form = {
            Id: data.Flow.Id,
            Level: data.Flow.Level,
            Level: data.Flow.Level,
            TagClassId: data.Flow.TagClassId,
            Content: data.Flow.Content,
            OfficeFloor: data.Flow.OfficeFloor,
            OfficePlace: data.Flow.OfficePlace,
            City: data.Flow.City,
            Number: data.Flow.Number,
            CityOffice: [data.Flow.City,data.Flow.OfficePlace,data.Flow.OfficeFloor].join('-'),
            Detail: data.Flow.Detail
        }
        if (data.Attachments instanceof Array) {
            this.attachments = data.Attachments
        }
        CityList().then(rsp => {
            this.citysOffice = rsp.data
        })
    },
    changeCO(val){
      if (val.length>0){
        this.form.CityOffice = val.join('-')
        this.form.City = val[0]
        this.form.OfficePlace = val[1]
        this.form.OfficeFloor = val[2]
      }else{
        this.form.CityOffice = ''
      }
    },
    select (obj) {
      //切换类型，展示不同的组件
      this.code = []
      for (let i = 0;i< obj.length;i++){
        this.code[i] = obj[i].code
      }
    },
    selectLevel(val,index){
      this.form.Level = index
    },
    checkLevel(val,rule){
      if (val==""){
        return false
      }
      return true
    },
    hanldeImg(save,remove){
        var tmp = []
        for(var i in remove){
            tmp.push(remove[i].Id)
        }
        this.form.EditRemoveImgs = tmp
    },
    onSubmit (values) {
      this.sub = true
      if (this.attachments.length>0){
        this.form.Attachments = JSON.stringify(this.attachments)
      }
      Edit(this.form).then(rsp=>{
        this.$router.push({name:'detail',params:{id:rsp.data}})
        this.sub = false
      }).catch(err=>{
        this.sub = false
      })
    }
  }
}
</script>
<style>
.title{
  margin: 10px 16px;
  color:rgba(69, 90, 100, 0.6);
}
.submitbtn{
  position:fixed;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
