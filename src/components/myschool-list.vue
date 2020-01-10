<template>
  <ul v-if="list.length">
    <router-link
      tag="li"
      :to="{path: 'schooldetail', query:{id: item.needId, schoolId: item.schoolId}}"
      v-for="item in list"
      :key="item.id"
      class="list-item"
    >
      <img class="item-logo" :src="item.logo" />
      <div class="item-desc">
        <div class="item-top">
          <h3 class="item-title">{{ item.companyName }}</h3>
          <p class="time">{{ item.createdTime }}</p>
        </div>
      </div>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "delivery-list",
  data: () => ({
    pageNo: 1
  }),
  props: ["list"],
  mounted() {
    this.dataList();
  },
  methods: {
    // loadMore: function() {
    //   this.$emit("loadMore", ++this.pageNo);
    // },
    dataList() {
      // console.log(this.list);
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";

.list-item {
  .activeBg;
  padding: 14px;
  border-bottom: 1px solid #e8e8e8;
}
.item-logo {
  display: inline-block;
  float: left;
  width: 60px;
  height: 60px;
}
.item-desc {
  margin-left: 70px;
  height: 62px;
  color: #333;
}
.item-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .time {
    text-align: right;
    color: #999;
    font-size: 1rem;
  }
}
.item-title {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 6px;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item-info {
  margin-bottom: 6px;
  width: 100%;
  height: 15px;
  line-height: 15px;
}
.item-pos {
  margin-top: 0.5rem;
  color: #666;
  font-size: 1.1rem;
  width: 80%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item-salary {
  font-size: 1.2rem;
  color: #00b38a;
  float: right;
}
.item-time {
  font-size: 0.9rem;
  color: #888;
}
.list-more {
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 1.2rem;
  &:active {
    background-color: #f0f0f0;
  }
}
</style>
