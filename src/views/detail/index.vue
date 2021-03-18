<template>
  <div class="detail">
    <section style="margin-bottom: 50px;">
        <h5 class="title">基本信息</h5>
        <van-cell title="发起人" :value="flow.create_at" title-class="vc-title" v-if="!IsCreater"> </van-cell>
        <van-cell title="工单类型" :value="flow.PTagClass|TagClass(flow.TagClass)" title-class="vc-title"> </van-cell>
        <van-cell title="等级" :value="flow.LevelName" title-class="vc-title"> </van-cell>
        <van-cell title="办公地点" :value="OfficePlace()" title-class="vc-title"> </van-cell>
        <van-cell title="处理人" :value="flow.Username" title-class="vc-title"> </van-cell>
        <van-cell title="工单状态" :value="flow.StatusName" title-class="vc-title"> </van-cell>
        <van-cell title="创建时间" :value="flow.CreateAt" title-class="vc-title"> </van-cell>
        <i-detail :info="detail"/>
        <h5 class="title" style="margin-top:-10px;">相关描述</h5>
        <div class="cont">
          {{flow.Content}}
          <van-row gutter="12">
            <van-col span="8" style="" v-for="(img,k) in Attachments" :key="k">
              <van-image width="80" height="80" fit="scale-down" :src="img.URL" @click="showImg(k)">
                <template v-slot:error>加载失败</template>
              </van-image>
            </van-col>
          </van-row>
        </div>
        <h5 class="title">回复列表</h5>
        <replay-list ref="replay" :list="replays"></replay-list>
    </section>
    <replay @add="doreplay" :FlowId="flow.Id" :status="flow.Status"/>
    <van-image-preview v-model="show" :startPosition="showIndex" :images="images" />
  </div>
</template>
<script>
import { getInfo,Recall,Comment,Finished } from '@/api/list'
import Replay from './components/replay'
import iDetail from './components/idetail'
import ReplayList from './components/replay_list'

export default {
  name: 'Info',
  props: ['id'],
  filters: {
    TagClass(tag,subtag) {
      return tag ? tag : subtag
    }
  },
  components: {Replay, iDetail, ReplayList},
  beforeRouteEnter (to, from, next) {
    getInfo({Id: to.params.id}).then(rsp => {
      next(vm => vm.setData(rsp.data))
    })
  },
  data () {
    return {
      detail:{},
      flow:{},
      replays:[],
      IsCreater:false,
      show: false,
      showIndex:0,
      images:[],
      Attachments:[]
    }
  },
  methods: {
    OfficePlace(){
      var v = [this.flow.City, this.flow.OfficePlace, this.flow.OfficeFloor]
      return v.join('-')
    },
    setData (data) {
      this.detail = data.Detail
      this.flow = data.Flow
      this.replays = data.Replys
      this.IsCreater = data.IsCreater
      this.Attachments = data.Attachments
    },
    doreplay (obj) {

      this.$refs['replay'].add(obj)
    },
    showImg(k){
      if (this.images.length<=0){
        this.images = []
        for(var i in this.Attachments) {
          this.images.push(this.Attachments[i].URL)
        }
      }
      this.showIndex = k
      this.show = true
    }
  }
}
</script>
<style scoped>
.detail{
  padding: 10px 0;
}
.title{
  text-align: left;
  margin: 0 0 10px 16px;
  color:rgba(69, 90, 100, 0.6);
}
.van-cell__title{
  text-align: left;
}
.vc-title{
  text-align: left;
}
.van-cell__value{
  text-align: right;
}
.cont{
  background: #fff;
  font-size: 14px;
  padding: 8px 16px 10px 16px;
  line-height: 1.5em;
  color: #969799;
  text-indent: 2em;
  margin-bottom: 10px;
}
</style>
