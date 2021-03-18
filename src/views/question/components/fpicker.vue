<template>
    <div>
      <van-field
      readonly
      clickable
      :name="name"
      :value="val"
      :label="title"
      :placeholder="placeholder"
      @click="showPicker = true"
      :rules="rules"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
            ref="picker"
            show-toolbar
            :default-index="defaultIndex"
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
        />
      </van-popup>
    </div>
</template>
<script>
export default {
  name: 'fpicker',
  props: {
    rules:{
      type:Array
    },
    defaultIndex: {
      type: String|Number
    },
    name: {
      type: String,
      default: () => 'fpicker'
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    title: {
      type: String,
      default: () => '标签'
    },
    placeholder: {
      type: String,
      default: () => '请选择'
    },
    value:{
      type: String|Number
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  computed: {
    val(){
      if(typeof this.value === "string"){
        return this.value
      }else{
        return this.columns[this.value]
      }
    }
  },
  watch:{
    'value':function(n,o){
      console.log(n)
    },
    'defaultIndex':function(n,o){
      if (n>0){
        this.onConfirm(this.columns[n],n)
      }
    }
  },
  created () {
    if ((typeof this.value === 'string') && this.value!='') {
      this.setInit()
    }
  },
  data () {
    return {
      showPicker: false
    }
  },
  methods: {
    setInit(){
      let arr = this.value.split('-')
      var check = function(source, $index) {
        for(var i=0;i<source.length;i++){
          if(source[i].text==arr[$index]){
            source[i].defaultIndex = i
            if (typeof source[i].children ==='object'){
              check(source[i].children,$index+1)
            }
          }
        }
      }
      check(this.columns,0)
    },
    onConfirm (val,index) {
      // this.value = val
      this.showPicker = false
      this.$emit('change',val,index)
    }
  }
}
</script>
