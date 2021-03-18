<template>
	<section class="main" >
    <van-search
      v-model="number"
      placeholder="请输入单号"
      input-align="center"
      @search="search"
      @cancel="cancel"
      @clear="cancel"
    />
    <van-tabs v-model="status">
      <van-tab title="所有"  ></van-tab>
      <van-tab title="待受理" ></van-tab>
      <van-tab title="进行中" ></van-tab>
      <van-tab title="待评论" ></van-tab>
      <van-tab title="已完成" ></van-tab>
      <van-tab title="已撤回" ></van-tab>
    </van-tabs>
    <list ref="list"/>
	</section>
</template>
<script>
import List from "@/views/list/components/list"
export default {
  name: 'FbList',
  components:{List},
  props:{
    statusName:{
      type:String,
      default:()=>("all")
    },
  },
  beforeRouteEnter (to, from, next) {
    next(vm=>vm.init(to.params.statusName))
  },
  watch: {
    'status':function(n,o){
      console.log(n)
      this.$refs.list.init(n,this.number)
    }
  },
  data () {
    return {
      status:0,
      number: ''
    }
  },
  methods: {
    init(statusName){
      switch (statusName){
        case 'waitting':
          this.status = 1
          this.$refs.list.init(this.status,this.number)
          break
        case 'unfinish':
          this.status = 2
          this.$refs.list.init(this.status,this.number)
          break
        case 'wfc':
          this.status = 3
          this.$refs.list.init(this.status,this.number)
          break
        case 'finished':
           this.status = 4
           this.$refs.list.init(this.status,this.number)
          break
        case 'recalled':
           this.status = 5
           this.$refs.list.init(this.status,this.number)
          break
        default:
          this.status = 0
          this.$refs.list.init(this.status,this.number)
      }
    },
    cancel(){
      this.$refs.list.init(this.status)
    },
    search(val){
      this.$refs.list.init(this.status,val)
    }
  }
}
</script>
<style >
.main{
   width: 100%;
   height: 100%;
 }
</style>
