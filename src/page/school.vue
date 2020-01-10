<template>
  <div id="school">
    <head-top></head-top>
    <!-- <van-search
      v-model="searchInfo"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @search="onSearchInfo"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>-->
    <div class="condition">
      <van-field
        readonly
        clickable
        label="地区"
        :value="searchArea"
        placeholder="选择地区"
        @click="showArea = true"
      />
    </div>
    <!-- <filter-options @requestList="requestList"></filter-options> -->
    <div class="list-container" v-if="schoolsList.length !== 0">
      <span
        class="options"
        v-for="school in schoolsList"
        :key="school.id"
        @click="goDetail(school.id,school.schoolID)"
      >
        <img :src="school.logo || ''" alt class="schoolLogo" />
        <h1 class="paddingleft">{{school.name}}</h1>
        <span class="paddingleft">学校名称:{{school.schoolName}}</span>
        <!-- <p class="description" :title="school.description">简介:{{school.description}}</p> -->
      </span>
    </div>
    <div class="list-container" v-else>
      <div class="nodata">
        <!-- <img src="nodata" alt /> -->
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
  </div>
</template>

<script>
import axios from "axios";
import api from "@/api/index.js";
import headTop from "../components/head";
import footNav from "../components/foot";
import jobList from "../components/jobList";
import citiesData from "../service/citiesData";
import { getHomeData } from "../service/getData";

export default {
  name: "school",
  data() {
    return {
      list: [], // 职位数据
      searchInfo: "", // 查询获取的值
      searchArea: "", // 条件 地区
      showArea: false, // 地区选择器 隐藏
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
      areaPickerData: [], // 保存地区数据json 位置

      selectedCityId: -1,
      selectedZoneId: -1,
      schoolsList: [],
      total: []
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
  },
  mounted() {
    this.requestList();
  },
  methods: {
    onCancel() {
      this.showArea = false;
    },
    onSearchInfo: function() {
      // 检测输入
      console.log("事件触发:");
    },
    onSearch: function() {
      //提交查询
      // console.log(this.searchInfo);
      // this.Name = this.searchInfo;
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
    requestList() {
      //将获取的数据传给机构培训列表
      let selectCity = this.selectedCityId;
      let selectZone = this.selectedZoneId;
      this._getNoticeList(selectCity, selectZone);
      console.log(this._getNoticeList);
    },
    _getNoticeList(selectCity, selectZone) {
      api
        .schoolList({
          Days: 90,
          ProvinceId: 8587,
          CityId: selectCity,
          AreaId: selectZone
        })
        .then(res => {
          if (res.code == 1) {
            this.schoolsList = res.data.rows;
            this.total = res.data.total;
            console.log(this.schoolsList);
          }
        });
    },
    goDetail(id, schoolID) {
      this.$router.push(
        `/firmdetail?id=${id}&schoolId=${schoolID}&name=${"yxzs"}`
      );
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
</style>