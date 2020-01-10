<template>
  <div id="login">
    <!--<head-top></head-top>-->
    <div class="new_wrapper">
      <form>
        <div class="new_register">
          <div>
            <input type="text" placeholder="手机" class="border_btm r_email top" v-model="Phone" />
          </div>
          <div class="img_code_box">
            <input
              type="picture"
              placeholder="图形验证码"
              class="r_psw btm"
              maxlength="16"
              v-model="Code"
            />
            <img :src="codeUrl" @click="onCode" alt="点击获取验证码" />
          </div>
          <div class="img_code_box">
            <input
              type="picture"
              placeholder="短信验证码"
              class="r_psw btm"
              maxlength="16"
              v-model="MobileCode"
            />
            <div class="code-btn" v-html="btnTitle" @click="validateBtn"></div>
          </div>
          <div>
            <input
              type="password"
              placeholder="密码"
              class="r_psw btm"
              maxlength="16"
              v-model="Password"
            />
            <!-- <i class="eye"></i> -->
          </div>
          <div>
            <input
              type="password"
              placeholder="再输一次密码"
              class="r_psw btm"
              maxlength="16"
              v-model="RePassword"
            />
            <!-- <i class="eye"></i> -->
          </div>
        </div>
        <div>
          <input type="button" class="btn_green" value="注册" @click="onRegister()" />
        </div>
      </form>
      <div class="register_text">已有帐号？</div>
      <a href="#/login" class="btn_green_border">去登录</a>
    </div>
  </div>
</template>

<script>
import api from "@/api/index.js";
import headTop from "../components/head";

export default {
  data() {
    return {
      Phone: "",
      MobileCode: "",
      Code: "",
      codeUrl: "",
      Password: "",
      RePassword: "",
      btnTitle: "获取验证码",
      disabled: false,
      PictureId: ""
    };
  },
  mounted() {
    this.onCode();
  },
  methods: {
    validateBtn() {
      if (!this.disabled) {
        let { Phone, Code, PictureId } = this;
        if (Phone == "") {
          this.$toast("手机号不能为空");
          return false;
        }
        if (Code == "") {
          this.$toast("请输入图形验证码");
          return false;
        }
        api
          .sendCode({
            Phone,
            Code,
            PictureId
          })
          .then(res => {
            if (res.code == 1) {
              this.$toast("发送成功");
              //倒计时
              let time = 60;
              let timer = setInterval(() => {
                if (time == 0) {
                  clearInterval(timer);
                  this.disabled = false;
                  this.btnTitle = "获取验证码";
                } else {
                  this.btnTitle = time + "秒后重试";
                  this.disabled = true;
                  time--;
                }
              }, 1000);
            } else {
              this.$toast(res.msg);
            }
          });
      }
    },
    onCode() {
      api.getCode().then(res => {
        if (res.code == 1) {
          this.codeUrl = res.data.base64String;
          this.PictureId = res.data.id;
        } else {
          this.$toast("获取图形验证失败");
        }
      });
    },
    onRegister() {
      let { Phone, MobileCode, Password, RePassword } = this;
      if (Phone == "") {
        this.$toast("手机号不能为空");
        return false;
      }
      if (this.checkPhone(Phone)) {
        this.$toast("手机号格式不正确");
        return false;
      }
      if (MobileCode == "") {
        this.$toast("手机验证码不能为空");
        return false;
      }
      if (Password == "") {
        this.$toast("密码不能为空");
        return false;
      }
      if (RePassword == "") {
        this.$toast("请再次输入新密码");
        return false;
      }
      if (Password !== RePassword) {
        this.$toast("两次密码输入不一致");
        return false;
      }
      api
        .register({
          Phone,
          MobileCode,
          Password,
          RePassword
        })
        .then(res => {
          if (res.code == 1) {
            this.$toast("注册成功，快去登录吧");
            setTimeout(e => {
              this.$router.push("login");
            }, 1000);
          } else {
            this.$toast(res.msg);
          }
        });
    },
    checkPhone(phone) {
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)) {
        return true;
      } else {
        return false;
      }
    }
  },
  components: {
    headTop
  }
};
</script>

<style lang="less">
.code-btn{
    display: flex;
    align-items: center;
    width: 150px;
    font-size: 16px;
    // color: #fff;
    justify-content: center;
    background-color: #fff;
}
.img_code_box {
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