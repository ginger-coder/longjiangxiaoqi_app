<template>
  <div class="home">
    <head-top></head-top>
    <van-search
      v-model="searchInfo"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @search="onSearch"
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
        @click="pickerPopup(1,showArea = true)"
      />
      <van-field
        readonly
        clickable
        label="职能"
        :value="searchAbility"
        placeholder="选择职能"
        @click="pickerPopup(2,showAbility = true)"
      />
      <van-field
        readonly
        clickable
        label="行业"
        :value="searchDomain"
        placeholder="选择行业"
        @click="pickerPopup(3,showDomain = true)"
      />
    </div>
    <!-- <job-list :list="list" @loadMore="loadMore"></job-list> -->
    <job-list :list="list"></job-list>
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
    <!-- 职能选择器 -->
    <van-popup v-model="showAbility" position="bottom">
      <van-picker
        show-toolbar
        :columns="columnsAbility"
        @cancel="onCancel"
        @confirm="onConfirmAbility"
        @change="onChangeAbility"
      />
    </van-popup>
    <!-- 行业选择器 -->
    <van-popup v-model="showDomain" position="bottom">
      <van-picker
        show-toolbar
        :columns="columnsDomain"
        @cancel="onCancel"
        @confirm="onConfirmDomain"
        @change="onChangeDomain"
      />
    </van-popup>
  </div>
</template>

<script>
import axios from "axios";
import api from "@/api";
import headTop from "../components/head";
import footNav from "../components/foot";
import jobList from "../components/jobList";
import { getHomeData } from "../service/getData";

export default {
  name: "home",
  data() {
    return {
      list: [], // 职位数据
      searchInfo: "", // 查询获取的值
      searchArea: "", // 条件 地区
      searchAbility: "", // 条件 职能
      searchDomain: "", // 条件 行业
      showArea: false, // 地区选择器 隐藏
      showAbility: false, // 职能选择器 隐藏
      showDomain: false, // 行业选择器 隐藏
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
      columnsAbility: [
        // 多列联动选择器 职能
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
      columnsDomain: [
        // 多列联动选择器  行业
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
      abilityPickerData: [], // 保存职能数据json 位置
      domainPickerData: [], // 保存行业数据json 位置

      // 查询
      Name: "",
      JobOneFunctionId: 0, //1
      JobFunctionId: -1,
      ProfessionOneId: 0, //1
      ProfessionId: -1,
      CityId: -1, // 城市
      AreaId: -1, // 区域
      total: 0,
      current: 1 //1
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

    //获取职能，职能json  --- 用的本地json (如果调用ajax 删除外出就行)
    axios.get("../../../static/json/jobfunction.json").then(res => {
      this.abilityPickerData = res.data;

      // 计算 职能转换格式 vant 提供的json格式不同 （保留）
      for (var i in this.abilityPickerData) {
        var obj = {
          text: this.abilityPickerData[i].name,
          id: this.abilityPickerData[i].id,
          parentId: this.abilityPickerData[i].parentId
        };
        this.columnsAbility[0].values.push(obj);
      }
      // for (var i in this.abilityPickerData[0].chdren) {
      //   var obj = {
      //     text: this.abilityPickerData[0].chdren[i].name,
      //     id: this.abilityPickerData[0].chdren[i].id,
      //     parentId: this.abilityPickerData[i].parentId
      //   };
      //   this.columnsAbility[1].values.push(obj);
      // }

      // 因为全部多联也是全部就手动添加
      var obj = {
        text: "全部",
        id: -1,
        parentId: -1
      };
      this.columnsAbility[1].values.push(obj);
    });

    //获取行业，行业json  --- 用的本地json (如果调用ajax 删除外出就行)
    axios.get("../../../static/json/profession.json").then(res => {
      this.domainPickerData = res.data;

      // 计算 行业转换格式 vant 提供的json格式不同 （保留）
      for (var i in this.domainPickerData) {
        var obj = {
          text: this.domainPickerData[i].name,
          id: this.domainPickerData[i].id,
          parentId: this.domainPickerData[i].parentId
        };
        this.columnsDomain[0].values.push(obj);
      }
      // for (var i in this.domainPickerData[0].chdren) {
      //   var obj = {
      //     text: this.domainPickerData[0].chdren[i].name,
      //     id: this.domainPickerData[0].chdren[i].id,
      //     parentId: this.domainPickerData[i].parentId
      //   };
      //   this.columnsDomain[1].values.push(obj);
      // }

      // 因为全部多联也是全部就手动添加
      var obj = {
        text: "全部",
        id: -1,
        parentId: -1
      };
      this.columnsDomain[1].values.push(obj);
    });

    // 计算 地区转换格式 vant 提供的json格式不同 （保留）
    // let This = this;
    // function switchData(originData, This) {
    //   for (var i in originData) {
    //     var obj = {
    //       text: originData[i].name,
    //       id: originData[i].id,
    //       parentId: originData[i].parentId
    //     };
    //     This.columns[0].values.push(obj);
    //   }
    //   for (var i in originData[0].chdren) {
    //     var obj = {
    //       text: originData[0].chdren[i].name,
    //       id: originData[0].chdren[i].id,
    //       parentId: originData[i].parentId
    //     };
    //     This.columns[1].values.push(obj);
    //   }
    // }
  },
  mounted() {
    // this.loadMore(1);
    this.onSearch(); // 触发默认查询
  },
  methods: {
    pickerPopup(val) {
      console.log(val);
    },
    // loadMore: function(pageNo) {
    //   getHomeData(pageNo).then(result => {
    //     this.list.push.apply(this.list, result.body.content.data.page.result);
    //     console.log(this.list);
    //   });
    // },
    onSearch: function() {
      //提交查询
      this.Name = this.searchInfo;
      this.getPositionlist();
    },
    getPositionlist() {
      //查询 方法
      let { JobFunctionId, Name, ProfessionId, AreaId, CityId } = this;
      let params = {
        Name,
        Days: 100,
        ProvinceId: 8587,
        CityId,
        AreaId,
        JobFunctionId,
        ProfessionId
      };

      api
        .positionList({
          ...params
        })
        .then(res => {
          if (res.code == 1) {
            this.list = [...res.data.rows];
            console.log(this.list);
            this.total = res.data.total;
          } else {
            // this.$message.error(res.msg);
          }
        });
    },
    onCancel() {
      this.showArea = false;
      this.showAbility = false;
      this.showDomain = false;
    },
    onConfirmArea(picker, value, index) {
      //选择器方法  地区
      // Toast(`当前值：${value}, 当前索引：${index}`);
      // console.log("onConfirmArea", picker, value, index);
      this.searchArea = [];
      for (var i in picker) {
        this.searchArea.push(picker[i].text + " ");
      }
      this.CityId = picker[0].id;
      this.AreaId = picker[1].id;
      this.onCancel();
      //提交查询
      this.getPositionlist();
    },
    onConfirmAbility(picker, value, index) {
      //选择器方法 职能
      // Toast(`当前值：${value}, 当前索引：${index}`);
      // console.log("onConfirmAbility", picker, value, index);
      this.searchAbility = [];
      for (var i in picker) {
        this.searchAbility.push(picker[i].text + " ");
      }

      this.JobFunctionId = picker[1].id;
      this.onCancel();
      //提交查询
      this.getPositionlist();
    },
    onConfirmDomain(picker, value, index) {
      //选择器方法 行业
      // Toast(`当前值：${value}, 当前索引：${index}`);
      // console.log("onConfirmDomain", picker, value, index);
      this.searchDomain = [];
      for (var i in picker) {
        this.searchDomain.push(picker[i].text + " ");
      }
      this.ProfessionId = picker[1].id;
      this.onCancel();
      //提交查询
      this.getPositionlist();
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
    onChangeAbility(picker, value, index) {
      //职能
      // 当选择 多列联动选择器 刷新列表
      // console.log("onChangeAbility", picker, value, index);
      if (index == 0) {
        var arr = [];
        if (value[0].id != -1) {
          for (var i in this.abilityPickerData) {
            if (value[0].id == this.abilityPickerData[i].id) {
              for (var x in this.abilityPickerData[i].chdren) {
                if (x == 0) {
                  var obj = {
                    text: "全部",
                    id: -1,
                    parentId: -1
                  };
                  arr.push(obj);
                }
                var obj = {
                  text: this.abilityPickerData[i].chdren[x].name,
                  id: this.abilityPickerData[i].chdren[x].id,
                  parentId: this.abilityPickerData[i].parentId
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
    onChangeDomain(picker, value, index) {
      //行业
      // 当选择 多列联动选择器 刷新列表
      // console.log("onChangeDomain", picker, value, index);
      if (index == 0) {
        var arr = [];
        if (value[0].id != -1) {
          for (var i in this.domainPickerData) {
            if (value[0].id == this.domainPickerData[i].id) {
              for (var x in this.domainPickerData[i].chdren) {
                if (x == 0) {
                  var obj = {
                    text: "全部",
                    id: -1,
                    parentId: -1
                  };
                  arr.push(obj);
                }
                var obj = {
                  text: this.domainPickerData[i].chdren[x].name,
                  id: this.domainPickerData[i].chdren[x].id,
                  parentId: this.domainPickerData[i].parentId
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
  // events: {
  //   loadMore: function() {
  //     console.log(arguments);
  //   }
  // },
  components: {
    headTop,
    footNav,
    jobList
  }
};
</script>

<style lang="less">
</style>