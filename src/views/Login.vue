<template>
    <div class="login">
        <div class="login-container">
            <h3 class="login-title">Welcome!</h3>
            <p class="login-subtitle">We will Provide you exact weather information based on forecast by NASA</p>
            <el-form class="login-form" status-icon :rules="loginRules" :model="loginForm" ref="loginForm">
                <el-form-item prop="phone">
                    <a class="item-title"><span>Phone</span><a href="/register">Sign up</a></a>
                    <el-input prefix-icon="el-icon-mobile-phone" type="type" placeholder="Enter your phone" autocomplete="off" v-model="loginForm.phone"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <a class="item-title"><span>Password</span></a>
                    <el-input prefix-icon="el-icon-lock" placeholder="Enter password" show-password clearable type="password"  autocomplete="off" v-model="loginForm.password"></el-input>
                </el-form-item>
            </el-form>
            <p class="forget-password">Forgot Password?</p>
            <el-button class="sign-in" @click.native.prevent="handleLogin" @keyup.enter="handleLogin">Sign in</el-button>
            <div class="dividing-line"><span>OR</span></div>
            <div class="third-mode">
                <a class="google-btn">
                    <img src="../assets/image/google-icon.png" alt="Google登录">
                    <span>Google</span>
                </a>
                <a class="facebook-btn">
                    <img src="../assets/image/facebook-icon.png" alt="Facebook登录">
                    <span>Facebook</span>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import { login } from './../http/api'
import { mapActions } from 'vuex'
import { SIGNIN } from "../store/user";
import { Toast } from 'vant'
import axios from 'axios'
export default {
    name: 'login',
    data() {
        let validatePhone = (rule, value, callback) => {
            if(!(/^1[3456789]\d{9}$/.test(value))) {
                return callback(new Error('Please enter the correct Phone'))
            } else {
                callback()
            }
        }
        let validatePassword = (rule, value, callback) => {
            if(value.length < 6) {
                return callback(new Error('The password can not be less than 6 digits'))
            } else {
                callback()
            }
        }
        return {
            loginForm: {
                phone: '13716974540',
                password: 'xzl19970116'
            },
            loginRules: {
                phone: [
                    {validator: validatePhone, trigger: 'blur'}
                ],
                password: [
                    {validator: validatePassword, trigger: 'blur'}
                ]
            }
        }
    },
    computed: {

    },
    methods: {
        ...mapActions([SIGNIN]),
        async handleLogin() {
            let phone = this.loginForm.phone
            let password = this.loginForm.password
            let self = this
            if(!(/^1[3456789]\d{9}$/.test(phone))) {
                this.$message({
                    type: 'error',
                    message: '请您正确填写手机号...'
                })
                return false
            }
            if(password.length < 6) {
                this.$message({
                    type: 'error',
                    message: '请您正确填写密码...'
                })
                Toast.success('登录成功!')
                return false
            }
            await login(phone, password).then(res => {
                if(res.code == '200') {
                    Toast.success('登录成功!')
                    window.localStorage.setItem("music_account", JSON.stringify(res.account));
                    window.localStorage.setItem("music_profile", JSON.stringify(res.profile));
                    window.localStorage.setItem("music_token", res.token);
                    this.SIGNIN = res.profile
                    setTimeout(() => {
                        self.$router.push('/home')
                    }, 1000 * 1)
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message
                    })
                }
            })
        }
    },
    created() {
        document.onkeydown = () => {
            let e = event || window.e
            let keyCode = e.keyCode || e.which
            switch (keyCode) {
                case 13:
                    this.handleLogin()
                    break
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .login {
        height: 100%;
        position: relative;
        background: linear-gradient(to bottom, rgb(92, 208, 221), rgb(188, 226, 228));
        text-align: center;
        >.login-container {
            width: 100%;
            min-height: 79%;
            height: auto;
            background-color: rgba(255,255,255,.85);
            position: absolute;
            margin: auto;
            left: 0;right: 0;
            top: 21%;
            border-radius: 30px 30px 0 0;
            >.login-title {
                font-family: sans-serif;
                font-size: 1.3rem;
                font-weight: 600;
                margin: 2rem 0 1rem;
                color: #111;
            }
            >.login-subtitle {
                padding: 0 15px;
                color: rgb(167,178,199);
                font-size: .95rem;
                line-height: 1.3;
                font-family: PangMenZhengDao, Arial, sans-serif;
            }
            >.login-form {
                padding: 0 15px;
                text-align: left;
                .item-title {
                    display: flex;
                    justify-content: space-between;
                    >span, >a {
                        color: rgb(164,178,200);
                        text-decoration: none;
                    }
                    >a {
                        font-family: PangMenZhengDao;
                    }
                }
            }
            >.forget-password {
                padding: 0 15px;
                text-align: right;
                font-size: .95rem;
                color: rgb(85,96,118);
                font-weight: 500;
            }
            >.sign-in {
                background-color: rgb(83,205,222);
                color: #fff;
                font-weight: 600;
                width: 95%;
                height: 3.5rem;
                border-radius: 15px;
                border: none;
                font-size: .9rem;
                border: none;
                box-shadow: 2px 2px 10px rgb(83,205,222);
                margin-top: .95rem;
                outline: none;
            }
            >.dividing-line {
                width: 95%;
                height: 1px;
                position: relative;
                background-color: #e8e0e0;
                margin: 2rem auto;
                >span {
                    display: inline-block;
                    width: 4rem;
                    font-size: .75rem;
                    font-weight: 600;
                    letter-spacing: 1px;
                    background-color: rgba(255,255,255,.85);
                    position: absolute;
                    margin: auto;
                    left: 0;right: 0;
                    top: -6px
                }
            }
            >.third-mode {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-template-rows: 1fr;
                grid-column-gap: 10px;
                width: 95%;
                margin: 0 auto;
                >.google-btn {
                    grid-area: 1/1/2/2;
                    background-color: rgb(228,70,56);
                    border-radius: 10px;
                    border: none;
                    color: #fff;
                    padding: 13px 35px;
                    font-weight: 600;
                    display: flex;
                    justify-content: space-between;
                    box-shadow: 0px 1px 7px rgb(228,70,56);
                    >img {
                        width: 30px;
                        height: 30px;
                    }
                    >span {
                        line-height: 30px;
                    }
                }
                >.facebook-btn {
                    grid-area: 1/2/2/3;
                    background-color: rgb(57,85,159);
                    border-radius: 10px;
                    border: none;
                    color: #fff;
                    padding: 13px 25px;
                    font-weight: 600;
                    display: flex;
                    justify-content: space-between;
                    box-shadow: 0px 1px 7px rgb(57,85,159);
                    >img {
                        width: 30px;
                        height: 30px;
                    }
                    >span {
                        line-height: 30px;
                    }
                }
            }
        }
    }
</style>