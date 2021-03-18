<template>
  <section class="home">
      <div class="header">
        <img src="../../assets/logo.png">
      </div>
      <div class="main">
          <div class="notice-box">
              <van-cell :value="title" :title-class="vanClass" icon="shop-o" is-link to="/list/unfinish" class="nb-cell">
                <template #icon>
                    <van-icon name="fire" color="#F44336" style="line-height: 20px;"/>
                </template>
                <template #title >
                    <span class="custom-title">进行中</span>
                </template>
              </van-cell>
          </div>
          <div class="m-item">
              <h4>我的记录</h4>
              <van-divider />
              <van-grid  :column-num="3" :border="false">
                    <van-grid-item text="所有工单"  to="/list/all">
											<template #icon>
												<strong >{{all}}</strong>
											</template>
										</van-grid-item>
										<van-grid-item text="待受理" to="/list/waitting">
											<template #icon>
												<strong>{{waitting}}</strong>
											</template>
										</van-grid-item>
                    <van-grid-item text="进行中" to="/list/unfinish">
											<template #icon>
												<strong>{{unfinish}}</strong>
											</template>
										</van-grid-item>
                    <van-grid-item text="待评论" to="/list/wfc">
											<template #icon>
												<strong>{{wait_for_comment}}</strong>
											</template>
										</van-grid-item>
										<van-grid-item text="已完成" to="/list/finished">
											<template #icon>
												<strong>{{finished}}</strong>
											</template>
										</van-grid-item>
                    <van-grid-item text="已撤销" to="/list/recalled">
											<template #icon>
												<strong>{{recalled}}</strong>
											</template>
										</van-grid-item>
                </van-grid>
          </div>
          <div class="m-item">
              <h4>工单管理</h4>
              <van-divider />
                <van-grid square :border="false">
                    <van-grid-item icon="photo-o" to="/question/computer" text="计算机类" class="frist-vgi"/>
                    <van-grid-item icon="photo-o" to="/question/nocomputer" text="非计算机" />
                    <!-- <van-grid-item icon="photo-o" text="项目支持" /> -->
                    <van-grid-item icon="photo-o" to="/question/net" text="网络问题" class="last-vgi"/>
                    <van-grid-item icon="question" to="/question/ask" text="咨询问题" class="last-vgi"/>
                </van-grid>
          </div>
      </div>
  </section>
</template>
<script>
import { CheckMyFlowTJ } from "@/api/home"
export default {
	name: 'Home',
	beforeRouteEnter (to, from, next) {
    next(vm =>{
      CheckMyFlowTJ().then(rsp=>{
        vm.init(rsp.data)
      })
    })
	},
  computed: {
    title () {
      return this.unfinish + '个'
    },
    vanClass () {
      return 'van-title'
    }
  },
  data () {
    return {
      all:0,
      waitting:0,
      unfinish:0,
      wait_for_comment:0,
      finished:0,
      recalled:0
    }
	},
	methods: {
		init (data) {
      this.all = data.all
      this.waitting = data.waitting
      this.unfinish = data.unfinish
      this.wait_for_comment = data.wait_for_comment
      this.finished = data.finished
      this.recalled = data.recalled
		}
	}
}
</script>
<style scoped>
 .home{
     height: 100%;
     padding: 0 10px;
 }
 .header{
     height: 20%;
     overflow: hidden;
     background-color: beige;
     margin: 0 -10px;
 }
 .main{
    height: 80%;
    position: relative;
    margin-top: -30px;
 }
 .notice-box{
     /* position: absolute; */
     /* top: -20px;
     left: 10px;
     right: 10px; */
 }
 .nb-cell{
		padding: 15px 10px;
		border-radius: 5px;
 }
 .van-title{
    text-align: left;
    padding-left: 8px;
 }
 .m-item{
    border-radius: 8px;
    margin-top: 10px;
		padding-bottom: 10px;
    background-color: #fff;
 }
 .m-item h4{
     text-align: left;
     margin: 0px;
     padding: 5px 20px;
     font-size: 14px;
 }
 .m-item .van-divider{
     margin: 1px;
 }
</style>
