<template>
    <div>
        <van-field
          readonly
          clickable
          :name="name"
          v-model="value"
          :label="title"
          :placeholder="placeholder"
          :rules="rules"
          @click="showSelect"
        />
        <van-popup v-model="show" position="bottom"  class="popup" :close-on-click-overlay="true">
          <div class="nav">
            <span class="sub-nav" @click="reset" :class="sbt">全部</span>
            <span class="sub-nav" v-for="(item,i) in snavs" :key="i">{{item}}</span>
          </div>
          <div>
            <van-cell  v-for="(item,i) in navs" :key="i" :title="item.name" @click="select(item,i)">
              <template v-if="item.children" #right-icon>
                <div style="color:#2196F3;">
                  <van-icon name="cluster-o" style="line-height: 22px;"/>下级
                </div>
              </template>
            </van-cell>
          </div>
        </van-popup>
    </div>
</template>
<script>
import { GetQtype } from '@/api/list'
export default {
  name: 'qtype',
  props: {
    rules:{
      type:Array
    },
    fristType: {
      type: String,
      default: () => ''
    },
    name: {
      type: String,
      default: () => 'qtype'
    },
    columns: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: () => '标签'
    },
    placeholder: {
      type: String,
      default: () => '请选择'
    },
    tagClass: {
      type: Number,
      default: () => (0)
    }
  },
  model: {
    props: 'tagClass',
    event: 'change'
  },
  computed: {
    sbt () {
      let l = this.selectVal.length - 1
      if(l>=0){
        return "sbt"
      }else{
        return ""
      }
    },
    snavs () {
      let arr = []
      if (!this.nochildren) {
        let l = this.selectVal.length - 1
        if (l > 3) {
          arr[0] = this.selectVal[0].name
          arr[1] = '...'
          arr[2] = this.selectVal[l].name
        } else {
          for (let i = 0; i<= l; i++) {
            arr.push(this.selectVal[i].name)
          }
        }
      } else {
        arr.push(this.selectVal[0].name)
        this.value = this.selectVal[0].name
        this.$emit('change',this.selectVal[0].id)
        this.$emit("select",this.selectVal)
      }
      return arr
    }
  },
  watch: {
    'selectVal': function(n,o) {
      let l = n.length-1
      if (l>0){
        this.value = n[l].name
        this.$emit('change',n[l].id)
        // this.$emit('')
      }else if (this.navs.length==0){
        this.$emit('change',n[l].id)
      }
    },
    'fristType':function(n,o){
      // this.resetSelecVal(n)
    },
    'tagClass':function(n,o){
      this.id = n
    }
  },
  mounted () {
    this.getData()
  },
  data () {
    return {
      id: this.tagClass,
      ft: this.fristType,
      value:"",
      defaultNavs: [],
      navs: [],
      show: false,
      selectVal: [],
      selectKey: [],
      nochildren: false
    }
  },
  methods: {
    getData() {
      GetQtype().then(rsp =>{
        this.defaultNavs = rsp.data
        if (this.id!=0){
          var that = this
          var check = function(source,id){
            for (var i=0; i < source.length; i++) {
              if (source[i].id === id) {
                that.value = source[i].name
                that.ft = source[i].code
                that.selectVal.unshift(source[i])
                return true
              }
              if (typeof source[i].children === 'object'){
                if (check(source[i].children,id)){
                  that.ft = source[i].code
                  that.selectVal.unshift(source[i])
                  return true
                }
              }
            }
            return false
          }
          check(this.defaultNavs, this.id)
          this.$emit("select",this.selectVal)
          this.resetSelecVal(this.ft)
        }else{
          this.resetSelecVal(this.fristType)
        }
      }).catch(err =>{
        this.navs = this.defaultNavs
      })
    },
    showSelect() {
      // if(!this.nochildren){
      //   }
      this.show = true
    },
    resetSelecVal(code) {
      if (code === ''||this.defaultNavs.length==0){
        return
      }
      this.selectVal = []
      for(let i=0;i<this.defaultNavs.length;i++){
        if (this.defaultNavs[i].code==code){
          this.selectVal.push(this.defaultNavs[i])
          if (typeof this.defaultNavs[i].children === 'undefined'){
            // this.nochildren = true
            this.value = this.defaultNavs[i].name
            this.navs = []
          }else{
            // this.nochildren = false
            this.navs=this.defaultNavs[i].children
          }
        }
      }
    },
    reset () {
      // if (this.ft!=''){
      //   return
      // }
      this.navs = this.defaultNavs
      this.selectKey = []
      this.selectVal = []
    },
    showPopup () {
      this.show = true
    },
    select (obj, i) {
      let l = this.selectVal.length-1
      if (l>0){
        if(typeof this.selectVal[l].children==='undefined'){
          this.selectVal.pop()
          this.selectKey.pop()
          this.selectKey.push(i)
          this.selectVal.push(obj)
          this.show = false
          this.$emit("select",this.selectVal)
          return
        }
      }else{
        this.selectVal.push(obj)
        this.selectKey.push(i)
        if (typeof obj.children === 'undefined') {
          this.value = obj.name
          if (l==-1){
            this.navs = []
          }
          this.show = false
        } else {
          this.navs = obj.children
        }
        this.$emit("select",this.selectVal)
      }
    }
  }
}
</script>
<style>
.popup{
  padding: 10px;
  height: 30%;
  width: 95%;
}
.nav{
  widows: 100%;
  padding:10px 15px;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  border-bottom:1px solid #f7f8fa;
}
.sub-nav{
  position: relative;
  display: inline-block;
  font: normal normal normal 14px/1 vant-icon;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}
.sub-nav:first-child::before{
  content: '';
}
.sub-nav::before{
  content: '\F00A';
  display: inline-block;
}
.sbt{
  color:#03A9F4;
}
/* .sub-nav i{
  margin-left: 5px;
  padding-top: 2px;
} */
</style>
