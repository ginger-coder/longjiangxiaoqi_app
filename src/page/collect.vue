<template>
  <div>
    <head-top go-back="true" title="我的收藏"></head-top>
    <collect-list :list="list"></collect-list>
  </div>
</template>

<script>
import headTop from "../components/head";
import api from "@/api/index";
import CollectList from '../components/collect-list'

export default {
  name: "collect",
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      api.collectList().then(res=>{
        this.list = res.data.rows || []
      },err=>{
        console.log(err)
      })
    }
  },
  components:{
    headTop,
    CollectList
  }
};
</script>

<style>
</style>