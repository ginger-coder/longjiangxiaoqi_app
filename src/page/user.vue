<template>
  <div id="user">
    <head-top></head-top>
    <div id="content">
      <div class="logininfo">
        <div class="nologin center" v-if="!isLogin">
          <router-link :to="'login'" class="loginbut">登录 / 注册</router-link>
        </div>
        <div class="haslogin center" v-else>
          <div class="headcon">
            <img class="headpic" :src="(headImg == null || headImg == '')? defaultImg : headImg "/>
          </div>
          <div class="name">{{userName}}</div>
        </div>
      </div>
      <div class="buttons">
        <!-- :to="{path: 'jobs', query:{id: item.id}}" -->
        <router-link to="/delivery" class="button deliver">
          <span>职位投递</span>
        </router-link>
        <!-- <a class="button deliver" href="/user/deliverlist.html">
          
        </a>-->
        <router-link to="/myorigin" class="button interview">
          <span>报名机构</span>
        </router-link>
        <router-link to="/myschool" class="button invitation">
          <span>我的院校</span>
        </router-link>
        <router-link to="/collect" class="button collect">
          <span>收藏</span>
        </router-link>
        <!-- <a class="" href="/user/collectlist.html">收藏</a> -->
      </div>
      <a
        v-if="isLogin"
        class="logout"
        @click="outLogin"
        href="javascript:;"
        style="display: block;"
      >退出登录</a>
    </div>
    <foot-nav></foot-nav>
  </div>
</template>

<script>
import headTop from "../components/head";
import footNav from "../components/foot";
import api from "@/api/index.js";
import hd from '@/assets/default_head.png';
export default {
  data() {
    return {
      headImg: "",
      userName: "",
      isLogin: false,
      defaultImg:hd,
    };
  },
  components: { headTop, footNav },
  mounted() {
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken == null || accessToken == "null") {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
    this.getBaseInfo();
  },
  methods: {
    getBaseInfo() {
      api.getBaseInfo({}).then(res => {
        if (res.code == 1) {
          this.headImg = res.data.headImg;
          this.userName = res.data.name;
        }
      });
    },
    outLogin() {
      window.localStorage.removeItem("accessToken");
      this.isLogin = false;
    }
  }
};
</script>

<style lang="less">
#user {
  margin-bottom: 45px;
  padding: 0 15px;
}
#user .center {
  text-align: center;
  width: 125px;
  margin: 0 auto;
}
#user .logininfo {
  margin: 10px 0;
}
#user .nologin {
  height: 111px;
}
#user .nologin .loginbut {
  font-size: 1.2rem;
  color: #fff;
  display: block;
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  margin: 0 auto;
  background-color: #1fc8a1;
  position: relative;
  top: 33px;
}
#user .buttons {
  margin-bottom: 10px;
}
#user .buttons .deliver {
  float: left;
}
#user .buttons .button {
  display: block;
  width: 48%;
  height: 86px;
  line-height: 86px;
  background-color: #1fc8a1;
  text-align: center;
  color: #fff;
  font-size: 1.4rem;
  margin-top: 10px;
  position: relative;
}
#user .buttons .interview {
  float: right;
}
#user .buttons .invitation {
  float: left;
}
#user .buttons .collect {
  float: right;
}
#user .buttons:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
#user:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

#content .haslogin {
  position: relative;
  width: 100%;
  top: 10px;
  height: 111px;
}

#content .haslogin .headcon {
  height: 81px;
  width: 81px;
  margin: 0 auto;
  -webkit-border-radius: 40.5px;
  -moz-border-radius: 40.5px;
  border-radius: 40.5px;
  -moz-background-clip: padding;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  overflow: hidden;
  background-color: #f6f6f6;
}

#content .haslogin .button {
  position: absolute;
  color: #00b38a;
  font-size: 1.4rem;
  right: 0;
}

#content .haslogin .headpic {
  width: 72px;
  height: 72px;
  margin: 4px 0 0 1px;
  -webkit-border-radius: 36px;
  -moz-border-radius: 36px;
  border-radius: 36px;
  -moz-background-clip: padding;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
}

#content .haslogin .name {
  font-size: 1.4rem;
  color: #333333;
  height: 22px;
  line-height: 22px;
}
#content .logout {
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #1fc8a1;
  color: #fff;
  font-size: 1.6rem;
  margin-bottom: 10px;
}
</style>