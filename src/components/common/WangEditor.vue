<template>
  <div class="edit">
    <div :class="{'edit-mask': disabled}"></div>
    <textarea class="editor-main"
              style="height:400px;max-height:500px;"
              ref="input"></textarea>
  </div>

</template>
<script>
import wangEditor from "wangeditor";
import $config from "@/api/config";
wangEditor.config.printLog = false;

export default {
  data() {
    return {};
  },
  props: {
    value: String,
    active: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: {
      handler(val) {
        this.$nextTick(() => {
          if (this.editor && this.editor.$txt) {
            if (val != this.editor.$txt.html()) {
              this.editor.$txt.html(val);
            }
          }
        });
      },
      immediate: true
    }
  },
  mounted() {
    var vm = this;
    var editor = new wangEditor(vm.$refs.input);
    // var uploadeOps = imageApi.getUploadImageOptios();
    var urll = "";

    if ($config.env.NODE_ENV == "development") {
      editor.config.uploadImgUrl = `${
        $config.apiUrlPrefix[$config.env.NODE_ENV]
      }admin/oss/aliyun/upload/`;
      urll = `${
        $config.apiUrlPrefix[$config.env.NODE_ENV]
      }admin/oss/aliyun/upload/`;
    } else {
      //                urll = window.location.origin + '/api/fashion/image'
      urll =
        window.location.origin +
        `${$config.apiUrlPrefix[$config.env.NODE_ENV]}admin/oss/aliyun/upload/`;
      editor.config.uploadImgUrl = urll;
    }
    editor.config.uploadImgFileName = "file";

    editor.config.uploadImgFns.onload = function(result, xhr) {
      // var json = JSON.parse(result);
      var html =
        '<img src="' +
        result +
        '" alt="' +
        this.config.uploadImgFileName +
        '" style="max-width:100%;margin-right: 5px;"/>';
      if (this.$txt.is(":focus")) {
        this.commandHooks.insertHtml(html);
      } else {
        this.$txt.append(html);
        this.$txt.focus();
      }
      this.onchange();
    };
    editor.config.uploadImgFns.ontimeout = function(xhr) {
      vm.$message.error("上传超时");
    };
    // 自定义error事件
    editor.config.uploadImgFns.onerror = function(xhr) {
      vm.$message.error("上传失败");
    };

    editor.onchange = function() {
      vm.$emit("input", this.$txt.html());
    };
    editor.create();
    this.editor = editor;
  }
};
</script>
<style>
.edit {
  position: relative;
}
.edit-main {
  height: 500px;
}
.edit-mask {
  position: absolute;
  z-index: 100;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #f5f7fe;
  opacity: 0.4;
}
</style>