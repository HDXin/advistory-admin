<template>
    <el-dialog title="文章预览" :visible.sync="dialogVisible">
        <div class="list">
            <div class="list-item" v-for="(item,index) in itemList" :key="index">
                <div v-if="item.type == 'IMAGE'">
                    <images :src="item.content" style="width: 100%"></images>
                </div>
                <div v-else>
                    {{item.content}}
                </div>
            </div>
        </div>
    </el-dialog>
</template>
<script>

export default {
    props:{
        visible:{
            type: Boolean,
            default: false
        },
        itemList:{
            type: Array,
            default: () => []
        }
    },
    computed:{
        dialogVisible:{
            get(){
                return this.visible
            },
            set(val){
                this.$emit('update:visible', val)
            }
        }
    }
}
</script>

