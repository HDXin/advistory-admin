<template>
  <img :src="url"
       :class="[avatar?'user-avatar': '']"
       alt="">
</template>
<script>
import $config from "@/api/config";
export default {
  name: "images",
  props: {
    src: String,
    avatar: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    url() {
      if (/(http:\/\/)|(https:\/\/)/.test(this.src)) {
        return this.src;
      } else {
        return `${$config.imageUrl[$config.env.NODE_ENV]}download${this.src}`;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>


