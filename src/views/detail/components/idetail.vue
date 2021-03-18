<template>
    <section class="detail">
        <div v-for="(obj,i) in info" :key="i" >
            <h5 class="title">{{obj.title}}</h5>
            <template v-if="obj.title!='职场搬迁'">
                <van-cell v-for="(item,k) in obj.items" :key="k" :title="item.key" :value="item.value" ></van-cell>
            </template>
            <template v-else>
                <div v-for="(subobj ,k) in obj.items" :key="k" class="subobj">
                    <h5 class="title">{{subobj.title}}</h5>
                    <van-cell v-for="(item,j) in subobj.fv" :key="j" :title="item.key" :value="item.value" ></van-cell>
                </div>
            </template>
        </div>
    </section>
</template>
<script>

export default {
  name: 'iDetail',
  props: {
    info: {
      type: Array|Object
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
.subobj{
    margin-bottom: 10px;
}
</style>
