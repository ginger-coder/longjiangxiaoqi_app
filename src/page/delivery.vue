<template>
  <div>
    <head-top go-back="true" title="我的投递"></head-top>
    <delivery-list :list="list"></delivery-list>
  </div>
</template>

<script>
import headTop from "../components/head";
import api from "@/api/index";
import deliveryList from "../components/delivery-list";

export default {
  name: "delivery",
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
      const params = {
        StartTime: "1990-01-01",
        EndTime: "2025-01-01",
        Type: 0,
        Status: -1
      };
      api.deliveryList(params).then(res=>{
        this.list = res.data.rows || []
      },err=>{
        console.log(err)
      })
    }
  },
  components:{
    headTop,
    deliveryList
  }
};
</script>

<style>
</style>