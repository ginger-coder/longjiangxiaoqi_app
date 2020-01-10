<template>
  <div id="login">
    <!--<head-top></head-top>-->
    <div class="new_wrapper">
      <form>
        <div class="new_register">
          <div>
            <input
              type="text"
              placeholder="手机"
              class="border_btm r_email top"
              v-model="username"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="密码"
              class="r_psw btm"
              maxlength="16"
              v-model="password"
            />
            <!-- <i class="eye"></i> -->
          </div>
          <div class="img_code_box">
            <input type="picture" placeholder="图形验证码" class="r_psw btm" maxlength="16" v-model="code" />
            <img :src="codeUrl" @click="onCode" alt="点击获取验证码" />
          </div>
        </div>
        <div>
          <input type="button" class="btn_green" value="登录" @click="login()" />
        </div>
      </form>
      <div class="register_text">还没帐号？</div>
      <a href="#/register" class="btn_green_border">注册</a>
    </div>
    <div v-html="html"></div>
  </div>
</template>

<script>
import api from "@/api/index.js";
import headTop from "../components/head";

export default {
  data() {
    return {
      username: "",
      password: "",
      accountType: 2,
      platform: 2,
      code: "",
      codeUrl: "",
      PictrueId: "",
      html: null
    };
  },
  mounted() {
    this.onCode();
  },
  methods: {
    onCode() {
      api.getCode().then(res => {
        if (res.code == 1) {
          this.codeUrl = res.data.base64String;
          this.PictrueId = res.data.id;
        } else {
          this.$toast("获取图形验证失败");
        }
      });
    },
    login() {
      let { username, password, accountType, PictrueId, platform } = this;
      api
        .loginReuest({
          username,
          password,
          accountType,
          PictrueId,
          platform
        })
        .then(res => {
          if (res.code == 1) {
            localStorage.setItem("accessToken", res.data.accessToken);
            this.$toast('登录成功');
            this.$router.replace('home');
          } else {
            // this.$message.error(res.msg);
            this.$toast('登录失败');
          }
        });
    }
  },
  components: {
    headTop
  }
};
</script>

<style lang="less">
.img_code_box{
  display: flex;
  align-content: space-between;
}
#login {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: -webkit-gradient(
    linear,
    100% 100%,
    0 0,
    from(#029253),
    to(#00887b)
  );
}
.new_wrapper {
  width: 90%;
  padding: 20px 0;
  margin: 0 auto;
}
.new_register,
.reg_pwd {
  position: relative;
}
.new_register > div,
.reg_pwd > div {
  position: relative;
}
.new_register .border_btm {
  border-bottom: 1px solid #e0e0e0;
}
.new_register input,
.reg_pwd input {
  width: 90%;
  border: 0;
  outline: 0;
  font: 1.4em "黑体";
  color: #333;
  background: #fff;
  border-radius: 0;
  padding: 6% 5%;
  margin: 0;
}
.new_register i.eye,
.reg_pwd i.eye {
  width: 20px;
  height: 13px;
  background: url(https://img.lagou.com/passport/static/mobile/modules/common/img/psweye_fdbad52.png)
    0 0 no-repeat;
  background-size: 20px 30px;
  position: absolute;
  bottom: 33%;
  right: 5%;
  transition: transform 0.3s linear 0s;
}
.btn_green {
  display: block;
  box-sizing: border-box;
  width: 100%;
  font-size: 1.8em;
  color: #fff;
  text-align: center;
  background: #0ac599;
  box-shadow: 0 2px 0 #008765;
  border-radius: 5px;
  margin: 20px 0;
  padding: 5%;
}
.register_text {
  color: #45e3be;
  font-size: 1.3em;
  line-height: 1.3;
}
.btn_green_border {
  display: block;
  width: 90%;
  font-size: 1.8em;
  color: #45e3be;
  text-decoration: none;
  text-align: center;
  border: 1px solid #45e3be;
  border-radius: 5px;
  margin: 8px 0;
  padding: 5%;
}
.top {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.btm {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>