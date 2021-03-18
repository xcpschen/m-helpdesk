<template>
    <section>
      <template v-if="code[0]=='computer'">
        <template  v-if="code[1]=='hardware'">
          <h6 class="title" >硬件</h6>
          <fpicker 
            v-model="detail.hardware" 
            title="问题"  
            name="hardware" 
            :columns="['蓝屏','电池故障','显示器问题','键盘/鼠标','其他']" 
            :rules="[{ required: true, message: '请选择问题配件' }]"
            />
        </template>
        <template  v-else>
          <h6 class="title">软件</h6>
          <fpicker 
          v-model="detail.software" 
          title="问题" name="software" 
          :rules="[{ required: true, message: '请选择问题软件' }]"
          :columns="['windows C盘满载','系统卡顿','其他']" />
        </template>
      </template>
      <template v-else-if="code[0]=='nocomputer'">
        <template  v-if="code[1]=='ts'">
          <h6 class="title" >投影/扫描仪</h6>
          <van-field 
            v-model="detail.room" 
            name="room" label="会议室编号" 
            :rules="[{ required: true, message: '请填写会议室' }]"
            placeholder="请输入会议室编号" />
        </template>
        <template  v-else-if="code[1]=='printer'">
          <h6 class="title">打印机</h6>
          <van-field 
            v-model="detail.floor" 
            name="floor" 
            :rules="[{ required: true, message: '请填写楼层' }]"
            label="楼层" 
            placeholder="请输入楼层" />
        </template>
        <template  v-else-if="code[1]=='nas'">
          <h6 class="title">NAS</h6>
          <van-field v-model="detail.nas_account" 
            :rules="[{ required: true, message: '申请账号不能为空' }]"
            name="nas_account" label="申请账号" placeholder="请输入申请账号" />
        </template>
        <template  v-else-if="code[1]=='videomeeting'">
          <h6 class="title">视频会议</h6>
          <van-field 
            v-model="detail.vedio_software" 
            :rules="[{ required: true, message: '会议软件名称不能为空' }]"
            name="vedio_software" label="会议软件名称" placeholder="请输入会议软件名称" />
        </template>
        <template  v-else>
          <h6 class="title">其他</h6>
        </template>
      </template>
      <template v-else-if="code[0]=='net'">
        <template v-if="code[1]=='internet'">
          <h6 class="title">有线网络</h6>
          <van-field v-model="detail.version" name="version" label="电脑型号" placeholder="请输入电脑型号" />
          <van-field v-model="detail.ip" name="ip" label="电脑当前ip地址" placeholder="请输入电脑当前ip地址" />
        </template>
        <template v-else-if="code[1]=='wifi'">
          <h6 class="title">无线网络</h6>
          <van-field  v-model="detail.version" name="version" label="电脑型号" placeholder="请输入电脑型号" />
          <van-field v-model="detail.ip"  name="ip" label="电脑当前ip地址" placeholder="请输入电脑当前ip地址" />
        </template>
        <template v-else>
           <h6 class="title">VPN账号</h6>
        </template>
      </template>
      <template v-else-if="code[0]=='projectSupport'">
        <template v-if="code[1]=='relocate'">
          <h5 class="title">职场搬迁</h5>
          <h6 class="title">旧职场</h6>
          <van-field v-model="detail.value" label="地址" placeholder="请输入地址" />
          <van-field v-model="detail.value" label="上网线路大小" placeholder="请输入多少M" />
          <van-field name="stepper"  label="工位数量">
            <template #input>
              <van-stepper v-model="detail.stepper1" input-width="100px" />
            </template>
          </van-field>
          <h6 class="title">新职场</h6>
          <van-field v-model="detail.value" label="地址" placeholder="请输入地址" />
          <van-field name="stepper" label="卡位数量">
            <template #input>
              <van-stepper v-model="detail.stepper2" input-width="100px"/>
            </template>
          </van-field>
          <van-field v-model="detail.value" label="职场面积" placeholder="请输入职场面积" />
          <van-field name="uploader" label="请上传职场平面图">
            <template #input>
              <van-uploader v-model="detail.value2" />
            </template>
          </van-field>
        </template>
        <template v-else-if="code[1]=='dilatation'">
          <h6 class="title">职场扩容</h6>
          <van-field name="stepper" label="扩容卡位数量">
            <template #input>
              <van-stepper v-model="stepper" />
            </template>
          </van-field>
          <van-field v-model="detail.value" label="使用部门对网络要求" placeholder="" />
        </template>
        <template v-else-if="code[1]=='extrent'">
          <h6 class="title">职场扩租</h6>
          <van-field v-model="detail.value" label="地址" placeholder="请输入地址" />
          <van-field name="stepper" label="卡位数量">
            <template #input>
              <van-stepper v-model="stepper" />
            </template>
          </van-field>
          <van-field v-model="detail.value" label="职场面积" placeholder="请输入职场面积" />
          <van-field name="uploader" label="请上传职场平面图">
            <template #input>
              <van-uploader v-model="detail.value2" />
            </template>
          </van-field>
          <van-field name="switch" label="是否同一栋">
            <template #input>
              <van-switch v-model="switchChecked" size="20" />
            </template>
          </van-field>
          <van-field v-model="detail.value" label="距离原职场多远" placeholder="" />
        </template>
        <template v-else>
          <h6 class="title">大型活动直播支持</h6>
          <van-field v-model="detail.value" label="举行地点" placeholder="请输入地址" />
          <van-field name="stepper" label="参与人数">
            <template #input>
              <van-stepper v-model="stepper" />
            </template>
          </van-field>
          <van-field name="switch" label="产地是否有带宽">
            <template #input>
              <van-switch v-model="switchChecked" size="20" />
            </template>
          </van-field>
          <van-field v-model="detail.value" label="是否使用第三方直播平台" placeholder="是否使用第三方直播平台" />
        </template>
      </template>
    </section>
</template>
<script>
import fpicker from './fpicker'
export default {
  name: 'ifield',
  components: {fpicker},
  props: {
    code: {
      type: Array
    },
    value: {
      type: String,
      default: () => ''
    }
  },
  model:{
    props: 'value',
    event: 'change'
  },
  watch: {
    'code':function(n,o){
      if (o.length>0){
        this.detail = {}
      }
    },
    'detail':{
      handler(n,o){
        this.$emit('change',JSON.stringify(n))
      },
      immediate: true,
      deep: true
    },
    'value':function(n,o) {
      try {
        this.setDetail(JSON.parse(n))
      } catch (error) {}
    }
  },
  created () {
  },
  data () {
    return {
      // val: this.value,
      detail:{}
    }
  },
  methods:{
    clear (){
      this.detail = {}
    },
    setDetail(val) {
      this.detail = val
    }
  }
}
</script>
<style>
.title{
  margin: 10px 16px;
  color:rgba(69, 90, 100, 0.6);
}
</style>
