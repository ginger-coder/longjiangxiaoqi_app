<template>
  <div>
    <head-top go-back="true" :title="titleNname"></head-top>
    <div id="firmDetail">
      <div class="infoplank">
        <div class="info-title">
          <h2 class="title">{{zhuanyelInfo.name}}</h2>
        </div>
        <div class="info-text">
          <p>{{zhuanyelInfo.description}}</p>
        </div>
      </div>
      <div class="contactplank">
        <dl>
          <dt>机构地址：</dt>
          <dd>{{schoolInfo.province}} {{schoolInfo.city}} {{schoolInfo.area}}</dd>
        </dl>
        <dl>
          <dt>联系人：</dt>
          <dd>{{schoolInfo.name}}</dd>
        </dl>
        <dl>
          <dt>联系电话：</dt>
          <dd>{{schoolInfo.phone}}</dd>
        </dl>
      </div>
      <div class="funplank">
        <h3>报名</h3>
        <img :src="schoolInfo.logo" alt />
        <!-- <p>{{schoolInfo.name}}</p> -->
        <van-button type="primary" @click="gobaoming" size="large">免费报名申请</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import headTop from "@/components/head";
// import { getPostDetails } from "@/service/getData";

export default {
  name: "firmDetail",
  data() {
    return {
      schoolInfo: {},
      zhuanyelInfo: {},
      titleNname: ""
    };
  },
  created() {},
  mounted() {
    this._getInfoData();
  },
  methods: {
    _getInfoData() {
      let { id, name } = this.$route.query;
      this.titleNname = "";
      if (name == "zy") {
        this.titleNname = "职业详情";
      } else if (name == "py") {
        this.titleNname = "企业详情";
      } else if (name == "yxzs") {
        this.titleNname = "院校招生详情";
      } else if (name == "jgpx") {
        this.titleNname = "机构培训详情";
      }
      // api.majorDetail({ id }).then(r => {
      //   if(r.code == 1){
      //     this.zhuanyelInfo = r.data;
      api.jigouDetail({ id }).then(res => {
        if (res.code != 0) {
          this.zhuanyelInfo = {
            name: res.data.name,
            description: res.data.description
          };
          this.schoolInfo = res.data;
        }
        // this.schoolInfo.typeName = "机构";
      });
      // }
      // })
    },
    gobaoming() {
      let { id, type } = this.schoolInfo;
      api
        .baoming({
          CompanyId: id,
          Type: type
        })
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            this.$toast("报名成功");
          } else {
            this.$toast("报名失败");
          }
        });
    }
  },

  components: {
    headTop
  }
};
</script>

<style lang="">
.info-title {
  height: 48px;
  line-height: 48px;
  padding: 0 15px;
  border-bottom: 1px solid #e8e8e8;
  text-align: right;
}
.info-title h2 {
  color: #333;
  font-size: 1.4rem;
  font-weight: bold;
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  float: left;
}
.info-text {
  word-break: break-all;
  padding: 15px;
  color: #555;
  font-size: 1rem;
  line-height: 22px;
}
.contactplank dl {
  padding: 5px 15px;
}
.contactplank dl dt,
.contactplank dl dd {
  display: inline-block;
  color: #333;
  font-size: 1.2rem;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 11px;
}
.funplank h3 {
  background-color: #00b38a;
  height: 36px;
  line-height: 36px;
  padding-left: 15px;
  color: #00b38a;
  font-size: 1.4rem;
  background-color: #d2f9f0;
}
</style>