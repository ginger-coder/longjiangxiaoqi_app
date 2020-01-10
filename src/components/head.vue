<template>
  <header class="header">
    <!-- <span class="go-back" v-show="goBack" @click="$router.go(-1)"></span> -->
    <van-icon class="go-back" size="26" name="arrow-left" @click="$router.go(-1)" />
    <span>{{ title }}</span>
  </header>
</template>

<script>
export default {
  props: {
    'title': {default: '龙江校企人才网'},
    'goBack': String
  }
}
</script>

<style lang="less" scoped>
@import '../style/mixin';

.header {
  .fixed;
  top: 0;
  font-size: 18px;
  text-align: center;
  color: #fff;
  background-color: #00b38a;
}
.go-back {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0px;
  padding: 0 10px;
  // width: 50px;
  // height: 100%;
  //background-size: 350px 350px;
}
</style>