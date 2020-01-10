<template>
  <div>
    <div class="list-container" v-if="list.length !== 0">
      <span class="options" v-for="item in list" :key="item.id" @click="goDetail(item.companyID)">
        <img :src="item.logo || ''" alt class="schoolLogo" />
        <h1 class="paddingleft">{{item.companyName}}</h1>
        <!-- <span class="paddingleft">开设专业:</span> -->
        <!-- <p class="description paddingleft" :title="item.address">{{item.address}}</p> -->
      </span>
    </div>
    <div class="list-container" v-else>
      <div class="nodata">
        <!-- <img :src="nodata" alt /> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "collect-list",
  data: () => ({
    pageNo: 1
  }),
  props: ["list"],
  mounted() {
    // this.dataList();
  },
  methods: {
    // loadMore: function() {
    //   this.$emit("loadMore", ++this.pageNo);
    // },
    goDetail(id) {
      this.$router.push({
        path: '/cpdetail',
        query:{
          id
        }
      })
      // console.log(this.list);
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
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

</style>
