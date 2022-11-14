<template>
  <div class="File">
    <el-row :gutter="20" style="margin: 20px 0 20px">
      <el-col :span="12">
        <div :class="styleClass + ' icon-btn'" @click="SET_ISCOLLAPSE(!isCollapse)"></div>
        <input type="file" ref="fileEle" @change="upload" multiple="true" style="display: none" />
        <el-button type="primary" @click="$refs.fileEle.click()" style="margin-right: 15px"><i
            class="el-icon-upload el-icon--left"></i>上传</el-button>

        <el-popover placement="top" trigger="click" class="popover">
          <el-button slot="reference"><i class="el-icon-plus el-icon--left"></i>新建</el-button>
          <ul class="menu">
            <li @click="centerDialogVisible = true">
              <i class="el-icon-folder-add el-icon--left"></i>新建文件夹
            </li>
            <li><i class="el-icon-document-add el-icon--left"></i>新建文件</li>
          </ul>
        </el-popover>
        <!-- <el-button @click="selectAllFile" v-model="checkAll" style="margin-left: 15px"><i
            class="el-icon-finished el-icon--left"></i>{{ checkAllShowValue }}
        </el-button> -->
      </el-col>
      <el-col :span="3" :offset="1">
        <el-switch v-model="searchType" active-color="#13ce66" inactive-color="#ff4949" active-text="用户"
          inactive-text="文件" :active-value="1" :inactive-value="2">
        </el-switch>
      </el-col>
      <el-col :span="5" :offset="2">
        <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="searchWord"
          @keydown.enter.native="searchFile"></el-input>
      </el-col>
    </el-row>

    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item, index) in routers" :key="index">
          <span class="nav_link" @click="goBack(item, index)">{{ item.file_name }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="fileList">
      <Folder ref="folder" :searchFileItem="searchFileItem"></Folder>
    </div>

    <div class="file-page">
      <el-pagination background layout="prev, pager, next" :page-size="pageLimit" :page-count="totalPage"
        :current-page="currentPage" @prev-click="prevClick" @next-click="nextClick" @current-change="nextClick" />
    </div>

    <transition name="slide-fade">
      <div class="footerMenu" v-show="footerMenuShow" @click="footerMenuShow = !footerMenuShow">
        <div class="footItem">
          <el-tooltip class="item" effect="dark" content="下载" placement="top-start">
            <el-button icon="el-icon-download"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="收藏" placement="top-start">
            <el-button icon="el-icon-star-off"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="转发" placement="top-start">
            <el-button icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button icon="el-icon-delete"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="更多" placement="top-start">
            <el-button icon="el-icon-more"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="取消选择" placement="top-start">
            <el-button icon="el-icon-circle-close"></el-button>
          </el-tooltip>
        </div>
      </div>
    </transition>

    <div class="mkdir">
      <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
        <el-input placeholder="请输入文件夹名" v-model="dirParams.dir_name"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="mkdir_btn">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="nickname">
      <el-dialog title="搜索用户" :visible.sync="searchUserDialog" width="30%" center>
        <div class="PersonTop">
          <div class="PersonTop_img">
            <img v-if="searchUserInfo.headImg" :src="searchUserInfo.headImg.downloadUrl" />
          </div>
          <div class="PersonTop_text">
            <div class="user_text">
              <div class="user_name">
                <span> {{ searchUserInfo.nickname }} </span>
              </div>
              <!-- <div class="user-v" v-if="v === 3">
                <img src="" class="user-v-img" />
                <span class="user-v-font">优质媒体作者</span>
              </div> -->
              <div class="user_qianming">
                <span> {{ searchUserInfo.phone }}</span>
              </div>
              <div class="user_anniu">
                <el-button v-model="isfollow" v-if="this.searchUserInfo.id != this.userInfo.id" @click="follow"
                  type="primary" size="medium" icon="el-icon-check" v-text="isfollow ? '已关注' : '关注'">
                </el-button>
              </div>
            </div>
            <div class="user_num">
              <div style="cursor: pointer">
                <div class="num_number" v-if="searchUserInfo.fanCounts">{{ searchUserInfo.fanCounts.length }}</div>
                <div class="num_number" v-else>0</div>
                <span class="num_text">粉丝</span>
              </div>
              <div style="cursor: pointer">
                <div class="num_number" v-if="searchUserInfo.followCounts">{{ searchUserInfo.followCounts.length }}
                </div>
                <div class="num_number" v-else>0</div>
                <span class="num_text">关注</span>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mkdir, getSearch } from "../api/file";
import Folder from "./Folder.vue";
import { mapMutations, mapState } from "vuex";
import uploadFileMixin from "./mixins/file";
import { follow, getFansById, getUserInfo, isFollow, searchUser } from '../api/users';
export default {
  data() {
    return {
      checked: null,
      searchWord: null,
      checkAll: false,
      checkAllShowValue: "全选",
      fileList: [],
      isIndeterminate: true,
      menuShow: false,
      footerMenuShow: false,
      menuEle: null,
      clickIndex: null,
      centerDialogVisible: false,
      dirParams: {
        dir_name: "新建文件夹",
      },
      searchFileItem: [],
      searchType: 2,
      searchUserDialog: false,
      searchUserInfo: {},
      isfollow: false
    };
  },
  components: {
    Folder,
  },
  computed: {
    ...mapState("user", ["userInfo"]),
    ...mapState("file", [
      "routers",
      "parent_file_id",
      "fileTotal",
      "currentPage",
      "totalPage",
      "pageLimit",
      "parent_folder",
    ]),
    ...mapState("sideBar", ["isCollapse", "styleClass"]),
  },
  mixins: [uploadFileMixin],
  methods: {
    // 创建文件夹
    mkdir_btn() {
      let { dir_name } = this.dirParams;
      let parent_file_id = this.parent_file_id;
      mkdir({
        parentFileId: parent_file_id,
        name: dir_name,
      }).then(() => {
        this.$refs.folder.getUserFile();
      });
      this.centerDialogVisible = false;
    },

    // 下载文件
    download_url() {
      let { download_url, name } = this.fileList[this.clickIndex];
      var eleLink = document.createElement("a");
      eleLink.download = name;
      eleLink.style.display = "none";
      eleLink.href = download_url;
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
    },

    follow() {
      follow({ id: this.searchUserInfo.id, isFollow: !this.isfollow ? '关注' : '取消关注' }).then(res => {
        let { code, message } = res;
        if (code == 200) {
          this.isfollow = !this.isfollow;
          this.$message.success(message, "success");
        }
      })
    },

    // 搜索文件
    searchFile() {
      if (this.searchType == 1) {
        getUserInfo().then(res => {
          let { data, code } = res;
          if (code == 200) {
            this.userInfo = data;
          }
        })
        searchUser(this.searchWord).then(res => {
          let { code, message, data } = res;
          if (code == 200) {
            this.searchUserInfo = res.data;
            this.$message.success(message, "success");
            this.searchUserInfo = data;
            isFollow(this.searchUserInfo.id).then(res => {
              this.isFollow = res.data
            })
            getFansById(this.searchUserInfo.id).then(res => {
              let { code, data } = res;
              if (code == 200) {
                this.searchUserInfo.fanCounts = data;
              }
            })

          }
          this.searchUserDialog = true;
        })
        this.searchWord = "";
      } else {
        this.SET_ROUTER({
          file_name: `${this.searchWord}的搜索结果`,
          path: Date.now(),
        });
        getSearch(
          this.searchWord,
        ).then((res) => {
          this.searchWord = "";
          this.searchFileItem = res.data;
        });
      }

    },

    // 导航后退
    goBack(item, index) {
      this.SET_PARENT_FILE_ID({ parent_file_id: item.path });
      this.REMOVE_ROUTER(index + 1);
      this.$refs.folder.getUserFile();
    },
    prevClick(page) {
      this.SET_CURRENT_PAGE(page);
      this.$refs.folder.getUserFile();
    },
    nextClick(page) {
      this.SET_CURRENT_PAGE(page);
      this.$refs.folder.getUserFile();
    },

    selectAllFile() {
      this.checkAll = !this.checkAll;
      let fileItems = this.$refs.folder.$refs.fileItem;
      fileItems.forEach(item => {
        if (this.checkAll) {
          item.classList.add("active")
          this.checkAllShowValue = "取消全选"
        } else {
          item.classList.remove("active")
          this.checkAllShowValue = "全选"
        }
      });

    },

    ...mapMutations("file", [
      "REMOVE_ROUTER",
      "SET_PARENT_FILE_ID",
      "SET_FAVORITE",
      "SET_ROUTER",
      "SET_CURRENT_PAGE",
    ]),
    ...mapMutations("sideBar", ["SET_ISCOLLAPSE"]),
  },
  created() {
    this.SET_FAVORITE("file");
  },
  mounted() {
    this.menuEle = this.$refs.fileMenu;
    // this.$alert(
    //   "<div>文件不会长期存储，请注意进行文件备份或下载。</div>",
    //   "消息提醒",
    //   {
    //     dangerouslyUseHTMLString: true,
    //   }
    // );
  },
};
</script>

<style lang="less" scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.File {
  height: calc(100vh - 60px);

  .breadcrumb {
    margin: 15px 15px;
  }

  .breadcrumb /deep/ .nav_link {
    cursor: pointer;
  }

  div.icon-btn {
    font-size: 25px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-right: 10px;
    cursor: pointer;
    vertical-align: middle;
  }

  .fileList {
    padding: 15px 0 0 0px;
    margin-left: 10px;
    height: 500px;
    overflow: hidden;
    overflow-y: auto;
    border-radius: 5px;

    &::-webkit-scrollbar-button {
      display: none;
    }

    &::-webkit-scrollbar {
      width: 10px;
      border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background: #409eff;
    }
  }

  .file-page {
    padding-top: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .footerMenu {
    padding: 10px;
    width: calc(100% - 250px);
    height: 10vh;
    position: absolute;
    left: 250px;
    bottom: 0;

    .footItem {
      position: absolute;
      bottom: 30px;
      left: 50%;
      padding: 10px 15px;
      border-radius: 10px;
      transform: translateX(-50%);
      background-color: #000;

      button {
        padding: 5px;
        background-color: transparent;
        border: 1px solid transparent;

        &:hover {
          background-color: #545459;
        }

        /deep/ i {
          font-size: 17px;
          color: #ddd;
        }
      }
    }
  }

  .upload_file_state {
    .box-card {
      width: 420px;
      position: absolute;
      right: 10px;
      bottom: 20px;

      .item {
        padding: 10px 0;

        .file_name {
          width: 130px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      p {
        font-size: 13px;
        color: #aaa;
      }
    }
  }
}

.tui-checkbox:checked {
  background: #1673ff;
}

.tui-checkbox {
  width: 15px;
  height: 15px;
  background-color: #ffffff;
  border: solid 1px #dddddd;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  font-size: 0.8rem;
  margin: 0;
  padding: 0;
  position: relative;
  display: inline-block;
  vertical-align: top;
  cursor: default;
  -webkit-appearance: none;
  -webkit-user-select: none;
  user-select: none;
  -webkit-transition: background-color ease 0.1s;
  transition: background-color ease 0.1s;
  margin-bottom: 30px;

  &:hover {
    border: #1673ff 1px solid;
  }
}

.tui-checkbox:checked::after {
  content: "";
  top: 2px;
  left: 1px;
  position: absolute;
  background: transparent;
  border: #fff solid 2px;
  border-top: none;
  border-right: none;
  height: 4px;
  width: 8px;
  transform: rotate(-45deg);
}

.me-video-player {
  background-color: transparent;
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: block;
  position: fixed;
  left: 0;
  z-index: 0;
  top: 0;
}

.PersonTop {
  // height: 140px;
  // padding-top: 20px;
  width: 100%;
  background-color: white;
  // margin-top: 30px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  border-radius: 5px;
}

.PersonTop_img {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #8c939d;
  margin-right: 24px;
  margin-left: 20px;
  overflow: hidden;
  border-radius: 20px;
}

.PersonTop_img img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

.PersonTop_text {
  // height: 120px;
  width: 380px;
  display: flex;
}

.user_text {
  width: 60%;
  height: 100%;
  line-height: 30px;
}

.user_name {
  font-weight: bold;
}

.user-v {
  margin-bottom: -5px;
}

.user-v-img {
  width: 15px;
  height: 15px;
}

.user-v-font {
  font-size: 15px;
  color: #00c3ff;
}

.user_qianming {
  font-size: 14px;
  color: #999;
}

.user_num {
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
}

.user_num>div {
  text-align: center;
  border-right: 1px dotted #999;
  box-sizing: border-box;
  width: 80px;
  height: 40px;
  line-height: 20px;
}

.num_text {
  color: #999;
}

.num_number {
  font-size: 20px;
  color: #333;
}

.el-menu-item>span {
  font-size: 16px;
  color: #999;
}

/*下面部分样式*/
.person_body {
  width: 1000px;
  margin-top: 210px;
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
}

.person_body_left {
  width: 27%;
  height: 600px;
  border-radius: 5px;
  margin-right: 3%;
  text-align: center;
}

.person_body_list {
  width: 100%;
  height: 50px;
  margin-top: 25px;
  font-size: 22px;
  border-bottom: 1px solid #f0f0f0;
  background-image: -webkit-linear-gradient(left,
      rgb(42, 134, 141),
      #e9e625dc 20%,
      #3498db 40%,
      #e74c3c 60%,
      #09ff009a 80%,
      rgba(82, 196, 204, 0.281) 100%);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-background-size: 200% 100%;
  -webkit-animation: masked-animation 4s linear infinite;
}

.el-menu-item {
  margin-top: 22px;
}

.person_body_right {
  width: 70%;
  /* height: 500px; */
  border-radius: 5px;
  background-color: white;
}

.box-card {
  height: 300px;
}

/*ui样式*/
.el-button {
  width: 84px;
}
</style>