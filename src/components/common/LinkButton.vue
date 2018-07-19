<template>
    <router-link :to="to"
                 :class="['el-button', type ? 'el-button--' + type: '', size ? 'el-button--' + size: '']">
                 <slot></slot>
                 </router-link>
</template>
<script>
export default {
  name: "LinkButton",
  props: ["type", "size", "to"]
};
</script>
