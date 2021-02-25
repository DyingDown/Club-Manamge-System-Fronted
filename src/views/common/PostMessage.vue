<template>
  <el-scrollbar>
    <el-main>
      <div content="发布新消息">发布新的消息</div>
      <el-divider></el-divider>
      <div>
        <div>
          <el-input placeholder="请输入标题" v-model="postTitle">
            <template slot="prepend">标题</template>
            <el-select
              :width="500"
              v-model="type"
              slot="append"
              placeholder="类型"
              label-width="100px"
            >
              <el-option label="任务" value="1"></el-option>
              <el-option label="通知" value="2"></el-option>
              <el-option label="活动" value="3"></el-option>
            </el-select>
          </el-input>
        </div>
        <!-- 图片上传组件辅助-->
        <el-upload
          class="avatar-uploader"
          :action="serverUrl"
          name="img"
          :headers="header"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :before-upload="beforeUpload"
        ></el-upload>
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @change="onEditorChange($event)"
        ></quill-editor>
        <br />
        <div class="buttons">
          <el-button type="primary" @click="saveMessage(1,'保存草稿')">保存草稿</el-button>
          <el-button type="success" @click="saveMessage(0,'发布消息')">发布</el-button>
        </div>
      </div>
    </el-main>
  </el-scrollbar>
</template>

<script>
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image"],
  ["clean"]
];

import { quillEditor } from "vue-quill-editor";
import { reqNewMessage, reqModifyDraft } from "../../api/index";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      isModify: false,
      type: "",
      postTitle: "",
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      content: null,
      editorOption: {
        placeholder: "",
        theme: "snow", // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      },
      serverUrl: "/api/image", // 这里写你要上传的图片服务器地址
      header: {
        // token: sessionStorage.token
      } // 有的图片服务器要求请求头需要有token
    };
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      //内容改变事件
      console.log("---内容改变事件---");
      this.content = html;
      console.log(html);
    },
    // 富文本图片上传前
    beforeUpload() {
      // 显示loading动画
      this.quillUpdateImg = true;
    },
    uploadSuccess(res, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      console.log(res);
      let quill = this.$refs.myQuillEditor.quill;
      // 如果上传成功
      if (res.code == 1) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.url为服务器返回的图片地址
        quill.insertEmbed(
          length,
          "image",
          `http://localhost:8080/api/image/${res.data}`
        );
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      // loading动画消失
      this.quillUpdateImg = false;
    },
    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false;
      this.$message.error("图片插入失败");
    },
    async myUpload() {},
    async saveMessage(isDraft, message) {
      const { type, postTitle, content } = this;
      let errmsg = "";
      if (postTitle == "") errmsg = "标题为空";
      if (content == null) errmsg += "\n内容为空";
      if (type == "") errmsg += "\n未选择类型";
      if (errmsg !== "") {
        this.$message.error(errmsg);
      } else {
        let result;
        console.log(this.isModify)
        if (this.isModify == true) {
          console.log(type)
          const typeList = { "任务": 1, "通知" : 2, "活动": 3 };
          this.type = typeList[type];
          result = await reqModifyDraft(
            this.$store.state.currentEditMessage.messageId,
            isDraft,
            postTitle,
            content,
            this.type,
            this.$store.state.userInfo.userId
          );
        } else {
          result = await reqNewMessage(
            postTitle,
            content,
            1,
            isDraft,
            type,
            this.$store.state.userInfo.userId
          );
        }
        if (result.code === 1) {
          let clubId = decodeURI(window.location.href.split("=")[1]);
          this.$message.success(message + "成功");
          if (isDraft == 0) {
            this.$router.push({ path: `/clubmessage?club_id=${clubId}` });
          } else {
            this.$router.push({ path: `/postdrafts?club_id=${clubId}` });
          }
        } else {
          this.$message.error(message + "失败：" + result.msg);
        }
      }
    }
  },
  mounted() {
    if (this.$store.state.currentEditMessage.title != undefined) {
      this.isModify = true;
      this.type = this.$store.state.currentEditMessage.type;
      this.postTitle = this.$store.state.currentEditMessage.title;
      this.content = this.$store.state.currentEditMessage.content;
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-scrollbar {
  width: 100%;
}

.buttons {
  text-align: right;
}

.el-select {
  width: 80px;
}
</style>