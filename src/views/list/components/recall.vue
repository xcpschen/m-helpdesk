<template>
    <div>
        <van-swipe-cell v-for="(item,i) in list" :key="i"  >
            <van-cell class="mlist" :title="item.PTagClass" :to="'/detail/'+item.Id" >
                <template #label>
                <div class="vc-item">
                    <label for="">工单号</label>
                    <p>{{item.Number}}</p>
                </div>
                <div class="vc-item">
                    <label for="">问题类型</label>
                    <p>{{item.TagClass}}</p>
                </div>
                <div class="vc-item">
                    <label for="">问题描述</label>
                    <p class="van-ellipsis">{{item.Content}}</p>
                </div>
                <div class="vc-item">
                    <label for="">当前状态</label>
                    <van-tag :color="item.StatusName|colorFilters" text-color="#fff" >{{item.StatusName}}</van-tag>
                </div>
                <div class="vc-item">
                    <label for="">处理人</label>
                    <p>{{item.UserName}}</p>
                </div>
                <div class="vc-item">
                    <label for="">申请时间</label>
                    <p>{{item.CreateAt}}</p>
                </div>
                <div class="vc-item" v-if="item.Status==4">
                    <label for="">完成时间</label>
                    <p>{{item.FinishAt}}</p>
                </div>
                </template>
            </van-cell>
            <template #right>
                <van-button square type="danger" text="删除" style="height:100%" @click="del(item,i)" />
            </template>
        </van-swipe-cell>
    </div>
</template>
<script>
import { Dialog } from 'vant'
import { FlowDel } from '@/api/list'
export default {
    name: 'Recall',
    filters: {
        colorFilters(StatusName) {
            switch (StatusName) {
                case '未受理': return '#ffe1e1'
                case '受理中': return '#ff976a'
                case '待评论': return '#1989fa'
                case '完成': return '#07c160'
                default: return '#909399'
            }
        }
    },
    props:['list','status'],
    data() {
        return {}
    },
    methods: {
        del(obj,$index) {
            Dialog.confirm({
                title: '删除提示',
                message: '是否彻底删除编号为`'+obj.Number+'`的工单',
            })
            .then(() => {
                // on confirm
                FlowDel({id:obj.Id}).then(rsp =>{
                    this.list.splice($index,1)
                }).catch(err=>{
                    console.log(err)
                })
            })
            .catch(() => {
                // on cancel
            });
        }
    }
}
</script>
