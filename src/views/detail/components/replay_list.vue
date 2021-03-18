<template>
    <div>
      <div class="rep-item" v-for="(item,i) in list" :key="i">
        <div class="repi-h">
          <van-image width="25" round fit="cover" height="25" src="" >
            <template v-slot:error>{{item.Username}}</template>
          </van-image>
          <span class="name">{{item.Username}}</span>
          <span>{{item.CreateAt}}</span>
        </div>
        <p>{{item.Content}}</p>
        <van-row gutter="20">
          <van-col span="8" v-for="(img,k) in item.Attachments" :key="k">
            <van-image :src="img.URL" fit="cover" @click="showImg(item.Attachments,k)">
              <template v-slot:error>加载失败</template>
            </van-image>
          </van-col>
        </van-row>
      </div>
      <van-image-preview v-model="show" :startPosition="showIndex" :images="images" />
    </div>
</template>
<script>
export default {
  name: 'ReplayList',
  props: {
    id:{
      type:Number
    },
    list:{
      type:Array,
      default:()=>({})
    }
  },
  data () {
    return {
      show: false,
      showIndex:0,
      images:[]
    }
  },
  methods: {
    add (obj) {
      this.list.push(obj)
    },
    showImg(imgs,k){
      this.images = []
      this.showIndex = k
      for(var i in imgs) {
        this.images.push(imgs[i].URL)
      }
      this.show = true
    }
  }
}
</script>
<style>
.rep-item{
    position: relative;
    padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    background-color: #fff;
}
.rep-item::after{
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 16px;
  bottom: 0;
  left: 16px;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(.5);
  transform: scaleY(.5);
}
.rep-item:last-child::after{
  border:0;
}
.repi-h{
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  flex-direction: row;
  justify-content:space-between;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
}
.name{
  position: absolute;
  left: 40px;
}
.van-image__error, .van-image__loading{
  text-align: center;
}
</style>
