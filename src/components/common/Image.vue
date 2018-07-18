<template>
    <img :src="url"
         alt="">
</template>
<script>
import $config from "@/api/config";
export default {
  name: "images",
  props: ["src"],
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

