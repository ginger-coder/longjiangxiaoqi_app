<template>
  <div>
    <head-top go-back="true" title="我的院校"></head-top>
    <myschoolist :list="list"></myschoolist>
  </div>
</template>

<script>
import headTop from "../components/head";
import api from "@/api/index";
import myschoolist from "../components/myschool-list";

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
        Type: 1,
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
    myschoolist
  }
};
</script>

<style>
</style>