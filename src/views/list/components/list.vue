<template >
    <van-list  v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
      <van-empty description="还没有申请记录" v-if="nolist"/>
      <component :list="list" :status="status" :is="key" v-else></component>
    </van-list>
</template>
<script>
import Normal from './normal'
import Recall from './recall'
import {getList} from '@/api/list'
const components = { Normal, Recall }
export default {
  name: 'List',
  components: components,
  props: {
    fbFinished: {
      type: Boolean,
      default: ()=>(false)
    }
  },
  computed: {
    key () {
      if (this.status==5){
        return components['Recall']
      }else{
        return components['Normal']
      }
    }
  },
  data () {
    return {
      status:0,
      page:1,
      size:20,
      nolist: false,
      loading: false,
      finished: false,
      list: []
    }
  },
  methods: {
    init(status,number){
      this.status = status
      this.number = number
      this.page = 1
      this.size = 20
      this.nolist = false
      this.loading = false
      this.finished = false
      this.list = []
      // this.onLoad()
    },
    onLoad: function () {
      getList({
        Page:this.page,
        Size:this.size,
        Number:this.number,
        Status:this.status
      }).then(rsp=>{
        this.loading = false
        if (rsp.data.length>0){
          this.nolist = false
          this.page++
          if (rsp.data.length!=this.size){
            this.finished = true
          }
          this.list.push(...rsp.data)
        }else{
          this.finished = true
          if (this.page==1){
            this.nolist = true
          }
        }
      })
    }
  }
}
</script>
<style >
.list{
  width: 100%;
  height: 95%;
}
.van-list{
  width: 100%;
  height: 100%;
  background: #fff;
}
.van-cell__title{
  text-align: left;
}
.vc-item{
  margin: 5px 0;
}
.vc-item label{
    width: 20%;
    float: left;
    text-align: left;
}
.vc-item p{
    width: 80%;
    float: left;
    margin: 0;
    text-align: left;
    color: #000;
}
.vc-item::after{
  display:block;
  content: '';
  clear: both;
}
</style>
