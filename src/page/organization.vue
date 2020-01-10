<template>
  <div id="organization">
    <head-top></head-top>
    <van-search
      v-model="searchInfo"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @search="onSearchInfo"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <div class="condition">
      <van-field
        readonly
        clickable
        label="地区"
        :value="searchArea"
        placeholder="选择地区"
        @click="showArea = true"
      />
      <van-field
        readonly
        clickable
        label="技能"
        :value="searchskill"
        placeholder="选择技能"
        @click="showskill = true"
      />
    </div>

    <!-- <filter-options :options="options" @requestList="requestList" class="ceshi"></filter-options> -->
    <div class="list-container" v-if="organizationList.length !== 0">
      <span
        class="options"
        v-for="(item,index) in organizationList"
        :key="index"
        @click="goDetail(item.id)"
      >
        <img :src="item.logo || ''" alt class="schoolLogo" />
        <h1 class="paddingleft">{{item.name}}</h1>
        <span class="paddingleft">机构名称:{{item.schoolName}}</span>
        <!-- <p class="description" :title="item.description">简介:{{item.description}}</p> -->
      </span>
    </div>
    <div class="list-container" v-else>
      <div class="nodata">
        <!-- <img :src="nodata" alt /> -->
      </div>
    </div>

    <foot-nav></foot-nav>
    <!-- 地区选择器 -->
    <van-popup v-model="showArea" position="bottom">
      <van-picker
        show-toolbar
        :columns="columnsArea"
        @cancel="onCancel"
        @confirm="onConfirmArea"
        @change="onChangeArea"
      />
    </van-popup>
    <!-- 技能选择器 -->
    <van-popup v-model="showskill" position="bottom">
      <van-picker
        show-toolbar
        :columns="columnsskill"
        @cancel="onCancel"
        @confirm="onConfirmskill"
        @change="onChangeskill"
      />
    </van-popup>
  </div>
</template>

<script>
import axios from "axios";
import api from "@/api/index.js";
import headTop from "../components/head";
import footNav from "../components/foot";
import jobList from "../components/jobList";
import { getHomeData } from "../service/getData";

export default {
  name: "organization",
  data() {
    return {
      organizationList: [], // 查询条件
      selectedCityId: -1,
      selectedZoneId: -1,
      selectedZoneAu1: -1,
      selectedZoneAu2: -1,
      Name: "",

      list: [], // 职位数据
      searchInfo: "", // 查询获取的值
      searchArea: "", // 条件 地区
      searchskill: "", // 条件 技能
      showArea: false, // 地区选择器 隐藏
      showskill: false, // 技能选择器 隐藏
      columnsArea: [
        // 多列联动选择器 地区
        {
          values: [{ text: "全部", id: -1, parentId: -1 }],
          className: "column1"
        },
        {
          values: [],
          className: "column2",
          defaultIndex: 0
        }
      ],
      columnsskill: [
        // 多列联动选择器 地区
        {
          values: [{ text: "全部", id: -1, parentId: -1 }],
          className: "column1"
        },
        {
          values: [],
          className: "column2",
          defaultIndex: 0
        }
      ],
      areaPickerData: [], // 保存地区数据json 位置
      killPickerData: [] // 保存技能数据json 位置
    };
  },
  created() {
    //获取城市，地区json  --- 用的本地json (如果调用ajax 删除外出就行)
    axios.get("../../../static/json/area.json").then(res => {
      this.areaPickerData = res.data;

      // 计算 地区转换格式 vant 提供的json格式不同 （保留）
      for (var i in this.areaPickerData) {
        var obj = {
          text: this.areaPickerData[i].name,
          id: this.areaPickerData[i].id,
          parentId: this.areaPickerData[i].parentId
        };
        this.columnsArea[0].values.push(obj);
      }
      // for (var i in this.areaPickerData[0].chdren) {
      //   var obj = {
      //     text: this.areaPickerData[0].chdren[i].name,
      //     id: this.areaPickerData[0].chdren[i].id,
      //     parentId: this.areaPickerData[i].parentId
      //   };
      //   this.columnsArea[1].values.push(obj);
      // }

      // 因为全部多联也是全部就手动添加
      var obj = {
        text: "全部",
        id: -1,
        parentId: -1
      };
      this.columnsArea[1].values.push(obj);
    });

    //获取技能，技能json  --- 用的本地json (如果调用ajax 删除外出就行)
    axios.get("../../../static/json/authentication.json").then(res => {
      this.killPickerData = res.data;

      // 计算 技能转换格式 vant 提供的json格式不同 （保留）
      for (var i in this.killPickerData) {
        var obj = {
          text: this.killPickerData[i].name,
          id: this.killPickerData[i].id,
          parentId: this.killPickerData[i].parentId
        };
        this.columnsskill[0].values.push(obj);
      }
      // for (var i in this.killPickerData[0].chdren) {
      //   var obj = {
      //     text: this.killPickerData[0].chdren[i].name,
      //     id: this.killPickerData[0].chdren[i].id,
      //     parentId: this.killPickerData[i].parentId
      //   };
      //   this.columnsskill[1].values.push(obj);
      // }

      // 因为全部多联也是全部就手动添加
      var obj = {
        text: "全部",
        id: -1,
        parentId: -1
      };
      this.columnsskill[1].values.push(obj);
    });
  },
  mounted() {
    this.requestList();
  },
  methods: {
    requestList() {
      //将获取的数据传给机构培训列表
      let selectCity = this.selectedCityId;
      let selectZone = this.selectedZoneId;
      this._getNoticeList(
        selectCity,
        selectZone,
        this.selectedZoneAu1,
        this.selectedZoneAu2
      );
      console.log(this._getNoticeList);
    },
    _getNoticeList(selectCity, selectZone, id1, id2) {
      //机构培训列表
      let { Name } = this;
      api
        .AuthenticationList({
          ProvinceId: 8587,
          CityId: selectCity,
          AreaId: selectZone,
          Name,
          AuthenticationLv1Id: id1,
          AuthenticationLv2Id: id2
        })
        .then(res => {
          if (res.code == 1) {
            this.organizationList = res.data.rows;
            this.total = res.data.total;
          }
        });
    },
    goDetail(id) {
      // 路由跳转详细页
      this.$router.push(`/firmdetail?id=${id}&name=${"jgpx"}`);
    },
    onCancel() {
      this.showArea = false;
      this.showskill = false;
    },
    onSearchInfo: function() {
      // 检测输入
      console.log("事件触发:");
    },
    onSearch: function() {
      //提交查询
      this.Name = this.searchInfo;
      this.requestList();
    },
    onConfirmArea(picker, value, index) {
      //选择器方法  地区
      // Toast(`当前值：${value}, 当前索引：${index}`);
      // console.log("onConfirmArea", picker, value, index);
      this.searchArea = [];
      for (var i in picker) {
        this.searchArea.push(picker[i].text + " ");
      }
      this.selectedCityId = picker[0].id;
      this.selectedZoneId = picker[1].id;

      this.onCancel();
      //提交查询
      this.requestList();
    },
    onConfirmskill(picker, value, index) {
      //选择器方法  地区
      // Toast(`当前值：${value}, 当前索引：${index}`);
      // console.log("onConfirmArea", picker, value, index);
      this.searchskill = [];
      for (var i in picker) {
        this.searchskill.push(picker[i].text + " ");
      }

      this.selectedZoneAu1 = picker[0].id;
      this.selectedZoneAu2 = picker[1].id;

      this.onCancel();
      //提交查询
      this.requestList();
    },
    onChangeArea(picker, value, index) {
      //地区
      // 当选择 多列联动选择器 刷新列表
      // console.log("onChangeArea", picker, value, index);
      if (index == 0) {
        var arr = [];
        if (value[0].id != -1) {
          for (var i in this.areaPickerData) {
            if (value[0].id == this.areaPickerData[i].id) {
              for (var x in this.areaPickerData[i].chdren) {
                if (x == 0) {
                  var obj = {
                    text: "全部",
                    id: -1,
                    parentId: -1
                  };
                  arr.push(obj);
                }
                var obj = {
                  text: this.areaPickerData[i].chdren[x].name,
                  id: this.areaPickerData[i].chdren[x].id,
                  parentId: this.areaPickerData[i].parentId
                };
                arr.push(obj);
              }
            }
          }
        } else {
          var obj = {
            text: "全部",
            id: -1,
            parentId: -1
          };
          arr.push(obj);
        }
        picker.setColumnValues(1, arr);
      } else if (index == 1) {
      }
    },
    onChangeskill(picker, value, index) {
      //地区
      // 当选择 多列联动选择器 刷新列表
      // console.log("onChangeskill", picker, value, index);
      if (index == 0) {
        var arr = [];
        if (value[0].id != -1) {
          for (var i in this.killPickerData) {
            if (value[0].id == this.killPickerData[i].id) {
              for (var x in this.killPickerData[i].chdren) {
                if (x == 0) {
                  var obj = {
                    text: "全部",
                    id: -1,
                    parentId: -1
                  };
                  arr.push(obj);
                }
                var obj = {
                  text: this.killPickerData[i].chdren[x].name,
                  id: this.killPickerData[i].chdren[x].id,
                  parentId: this.killPickerData[i].parentId
                };
                arr.push(obj);
              }
            }
          }
        } else {
          var obj = {
            text: "全部",
            id: -1,
            parentId: -1
          };
          arr.push(obj);
        }
        picker.setColumnValues(1, arr);
      } else if (index == 1) {
      }
    }
  },
  watch: {
    $route(to, from) {
      //console.log(to, from)
    }
  },
  components: {
    headTop,
    footNav,
    jobList
  }
};
</script>

<style lang="less">
@import "../style/mixin";

.consult-container {
  width: 1080px;
  min-height: calc(100vh - 125px);
  margin: 0 auto;
  background: #ffffff;
}
.nodata {
  width: 400px;
  margin: 0 auto;
  padding: 40px;
  img {
    width: 100%;
  }
}
.search_box {
  padding: 20px 0 20px 20px;
  .ant-input {
    border: 1px solid #dd0101 !important;
  }
  .ant-btn {
    border: #dd0101 !important;
    background: #dd0101 !important;
    color: #fff;
  }
  .ant-input-group-addon {
    border: 1px solid #dd0101;
    border-right: none;
  }
}
.list-container {
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .options {
    position: relative;
    width: 100%;
    height: 86px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 20px;
    cursor: pointer;
    .schoolLogo {
      position: absolute;
      top: 20px;
      left: 10px;
      width: 120px;
      height: 40px;
    }
    .paddingleft {
      padding-left: 130px;
    }
    h1 {
      margin-bottom: 0;
    }
    p.description {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.filter-container {
  padding: 0 20px 20px;

  margin-bottom: 40px;
  .item-opt {
    display: flex;
    .opt-name {
      width: 95px;
      flex: 0 0 95px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        padding: 0 4px;
        margin-right: 10px;
        cursor: pointer;
        &.active {
          color: #ffffff;
          background: #dc0101;
        }
      }
    }
  }
}
.ceshi {
  margin-bottom: 0;
  padding-top: 20px;
  padding-bottom: 0px;
}
</style>