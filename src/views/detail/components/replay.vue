<template>
    <div class="rp-bar">
        <div class="bar-item reply-box" v-if="status<=2">
          <van-cell @click="showPopup" @click-overlay="reset">
            <template #title>
              <van-icon name="chat-o" class="ticon" />
              <span>回复</span>
            </template>
          </van-cell>
          <van-popup v-model="show" position="bottom" :style="{ height: '70%' }" >
            <div class="rp-bax">
              <div>
                <span @click="reset">取消</span></div>
              <div class="rpb-h">回复</div>
              <div>
                <span @click="doReplay">确定</span>
              </div>
            </div>
            <div class="reply-main">
              <van-field v-model="content" placeholder="请输入回复" rows="5" type="textarea" show-word-limit maxlength="500" />
              <div class="show-attach">
                <van-grid :gutter="10" :clickable="true">
                  <van-grid-item  v-for="(file, k) in attchments" :key="k" >
                    <div class="van-uploader__preview-delete" @click="rmoveConfirm(k)">
                      <i class="van-icon van-icon-cross van-uploader__preview-delete-icon"></i>
                    </div>
                    <van-image fit="cover" :src="file.url"/>
                  </van-grid-item>
                </van-grid>
              </div>
              <div class="reply-footer">
                <van-form>
                  <van-field name="uploader">
                    <template #input>
                      <uploader v-model="attchments" :max-count="8" :multiple="true" size="small" class="rf-icon"/>
                    </template>
                  </van-field>
                </van-form>
              </div>
            </div>
          </van-popup>
        </div>
        <div :class="btbclass">
          <van-button icon="clock-o" type="primary" size="normal" @click="doRecall" v-if="status==1">撤回</van-button>
          <van-button icon="aim" type="primary" size="normal" @click="doFinish" v-if="status==2">完结</van-button>
          <van-button icon="todo-list" type="primary" size="normal" :to="'/question/edit/'+this.FlowId" v-if="status==5">重新编辑</van-button>
          <template v-else-if="status==3">
            <van-button icon="smile" type="primary" size="normal" @click="showPopup" @click-overlay="reset" >给个好评吧</van-button>
            <van-popup v-model="show" round position="bottom" :style="{ height: '60%' }">
              <div class="rp-bax">
                <div>
                  <span @click="reset">取消</span></div>
                <div class="rpb-h">对本次工单服务打分</div>
                <div>
                  <span @click="doComment" style="color:#07c160">确定</span>
                </div>
              </div>
              <div class="van-hairline--top"></div>
              <div class="comment-box">
                <van-rate v-model="score" size="30px" void-icon="star" void-color="#eee" :color="rhcolor"/>
                <div class="van-ellipsis" style="color:red" v-if="err">请评分</div>
                <h4 :class="rhcolor">{{scoreText}}</h4>
                <van-field 
                  v-model="content" 
                  rows="4"
                  autosize
                  maxlength="140"
                  show-word-limit
                  type="textarea"
                  class="comment"
                  placeholder="请输入评价" />
              </div>
            </van-popup>
          </template>
          <span v-else></span>
        </div>
    </div>
</template>
<script>
import {DoReply, Recall,Comment,Finished } from '@/api/list'
import uploader from '@/components/uploader/index'
import { Dialog } from 'vant'
export default {
  name: 'Replay',
  components: { uploader },
  props:['FlowId','status'],
  data () {
    return {
      show: false,
      isSend: false,
      attchments:[],
      content: '',
      score:0,
      err:false
    }
  },
  computed:{
    btbclass:function(){
      if(this.status==5||this.status==5){
        return "haopin"
      }else{
        return "bar-item"
      }
    },
    scoreText:function(){
      this.err = false
      if(this.score==1){
        return "非常差"
      }else if(this.score==2){
        return "差"
      }else if(this.score==3){
        return "一般"
      }else if(this.score==4){
        return "满意"
      }else if(this.score==5){
        return "超级赞"
      }else{
        return ""
      }
    },
    rhcolor:function(){
      if(this.score<3){
        return "#c8c9cc"
      }else if (this.score>=3||this.score<5){
        return "#ffd21e"
      }else if(this.score>=5){
        return "#FF9800"
      }else{
        return "#c8c9cc"
      }
    }
  },
  methods: {
    rmoveConfirm(index){
      this.attchments.splice(index,1)
    },
    showPopup () {
      this.show = true
    },
    reset () {
      this.show = false
      this.content = ''
      this.score = 0
    },
    doFinish(){
      Dialog.confirm({
        title: '完结工单',
        message: '完结工单后则无法在追问！是否完结？',
      }).then(() => {
        // on confirm
        Finished({Id:this.FlowId}).then(rsp =>{
          location.reload()
        })
      })
    },
    doRecall(){
      Dialog.confirm({
        title: '撤回工单',
        message: '是否撤回？',
      }).then(() => {
        // on confirm
        Recall({Id:this.FlowId}).then(rsp =>{
          location.reload()
        })
      })
    },
    doComment(){
      if (this.score<=0){
        this.err = true
        return false
      }
      Comment({
        FlowId:this.FlowId,
        Score:this.score,
        Content:this.content,
      }).then(rsp=>{
        location.reload()
      })
    },
    doReplay () {
      DoReply({
        FlowId: this.FlowId,
        Content: this.content,
        Attachments: JSON.stringify(this.attchments)
      }).then(rsp=>{
        this.$emit('add', rsp.data)
        this.show = false
        this.content = ''
        this.attchments = []
      })
    }
  }
}
</script>
<style scoped>
.rp-bar{
  text-align: center;
  position:fixed;
  left: 0;
  bottom: 0;
  right: 0; 
  box-shadow: 3px 5px 8px 1px black; 
  display: flex;
  display: -webkit-flex;
  flex-direction:row;
  justify-content:space-around;
  align-items:stretch;
}
.haopin{
  flex-grow: 1;
}
.bar-item{
  flex-grow: 1;
}
.reply-box{
  flex-grow: 2;
}
.haopin .van-button{
  width: 100%;
}
.bar-item .van-button{
  height: 100%;
  width: 100%;
}
.ticon{
  line-height: 14px;
  font-size: 18px;
  vertical-align: sub;
}
.rp-bax{
  padding: 10px 0;
  display: flex;
  display: -webkit-flex;
}
.rp-bax::after{
  display: block;
  content: '';
  border-bottom: 1px solid #eee;
  clear: both;
}
.rp-bax div{
  flex-grow: 1;
}
.rp-bax div:first-child{
  text-align: left;
}
.rp-bax div:first-child span{
  padding: 0 10px;
}
.rp-bax div:last-child{
  text-align: right;
}
.rp-bax div:last-child span{
  padding: 0 10px;
}
.rpb-h{
  display: block;
  flex-grow: 2;
}
.comment-box{
  margin-top: 5px;
}
.comment{
  width: 98%;
  margin: 10px auto;
  background: rgb(247, 248, 250);
  border-radius: 5px;
  text-indent: 1em;
}
.reply-main{
  position: relative;
  height: 80%;
}
.reply-footer{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: left;
  background: #f7f8fa;
}
.rf-icon{
  margin: 0 10px;
}
</style>
