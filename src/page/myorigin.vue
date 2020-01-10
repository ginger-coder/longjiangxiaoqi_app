<template>
  <div>
    <head-top go-back="true" title="报名机构"></head-top>
    <myorigin :list="list"></myorigin>
  </div>
</template>

<script>
import headTop from "../components/head";
import api from "@/api/index";
import myorigin from "../components/myorigin-list";

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
        Type: 2,
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
    myorigin
  }
};
</script>

<style>
</style>