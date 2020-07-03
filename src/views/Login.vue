<template>
    <div class="login">
        <div class="login-container">
            <h3 class="login-title">Welcome!</h3>
            <p class="login-subtitle">We will Provide you exact weather information based on forecast by NASA</p>
            <el-form class="login-form" status-icon :rules="loginRules" :model="loginForm" ref="loginForm">
                <el-form-item prop="phone">
                    <a class="item-title"><span>Phone</span><span>Sign up</span></a>
                    <el-input prefix-icon="el-icon-mobile-phone" type="type" placeholder="Enter your phone" autocomplete="off" v-model="loginForm.phone"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <a class="item-title"><span>Password</span></a>
                    <el-input prefix-icon="el-icon-lock" placeholder="Enter password" show-password clearable type="password"  autocomplete="off" v-model="loginForm.password"></el-input>
                </el-form-item>
            </el-form>
            <p class="forget-password">Forgot Password?</p>
            <el-button class="sign-in">Sign in</el-button>
        </div>
    </div>
</template>
<script>
import { login } from './../http/api'
export default {
    name: 'login',
    data() {
        let validatePhone = (rule, value, callback) => {
            if(!value.trim()) {
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
                phone: '',
                password: ''
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
    methods: {
        async handleLogin() {
            let phone = this.loginForm.phone
            let password = this.loginForm.password
            const res = await login(phone, password)
            if(res.code == 200) {
                this.$message({
                    type: 'success',
                    message: '登录成功！'
                })
            } else {
                this.$message({
                    type: 'error',
                    message: res.message
                })
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
        >.login-container {
            width: 95%;
            min-height: 75%;
            height: auto;
            background-color: #fff;
            position: absolute;
            margin: auto;
            left: 0;right: 0;
            top: 25%;
            border-radius: 30px 30px 0 0;
            >.login-title {
                font-family: PangMenZhengDao, Arial, sans-serif;
                font-size: 1.3rem;
                font-weight: 600;
                margin: 2rem 0 1rem;
                color: #111;
            }
            >.login-subtitle {
                padding: 0 15px;
                color: rgb(167,178,199);
                font-size: 1.05rem;
                line-height: 1.3;

            }
            >.login-form {
                padding: 0 15px;
                text-align: left;
                .item-title {
                    display: flex;
                    justify-content: space-between;
                    >span {
                        color: rgb(164,178,200);
                    }
                }
            }
            >.forget-password {
                padding: 0 15px;
                text-align: right;
                font-size: .95rem;
                color: rgb(85,96,118)
            }
            >.sign-in {
                background-color: rgb(83,205,222);
                color: #fff;
                width: 95%;
                height: 3.5rem;
                border-radius: 15px;
                border: none;
                font-size: .9rem;
                box-shadow: 2px 2px 10px rgb(83,205,222);
            }
        }
    }
</style>