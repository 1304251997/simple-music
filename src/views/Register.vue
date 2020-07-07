<template>
    <div class="login">
        <div class="login-container">
            <div class="register-roll">
                <h3 class="login-title">Welcome!</h3>
                <p class="login-subtitle">We will Provide you exact weather information based on forecast by NASA</p>
                <el-form class="login-form" status-icon :rules="loginRules" :model="loginForm" ref="loginForm">
                    <el-form-item prop="nickname">
                        <a class="item-title"><span>Full Name</span><a href="/login">Sign in</a></a>
                        <el-input prefix-icon="el-icon-user-solid" type="type" placeholder="Your name" autocomplete="off" v-model="loginForm.nickname"></el-input>
                    </el-form-item>
                    <div style="display: flex;position: relative">
                        <el-form-item prop="phone" style="width: 52%;margin-right: 10px">
                            <a class="item-title"><span>Mobile No.</span></a>
    <!--                            <el-select v-model="countryType" prefix="el-icon-lock" style="width: 20%;margin-right: 20px">-->
    <!--                                <el-option v-for="item in countryAlias" :key="item.value" :label="item.value" :value="item.value"></el-option>-->
    <!--                            </el-select>-->
                            <el-input prefix-icon="el-icon-mobile-phone" type="type" placeholder="Enter your phone card" autocomplete="off" v-model="loginForm.phone"></el-input>
                        </el-form-item>
                        <el-form-item prop="captcha" style="width: 48%">
                            <a class="item-title"><span>Code</span></a>
                            <el-input type="type" placeholder="Enter code" autocomplete="off" v-model="loginForm.captcha"></el-input>
                            <a class="send-code" @click.prevent="sentCaptcha(loginForm.phone)">发送验证码</a>
                        </el-form-item>
                    </div>
<!--                    <el-form-item prop="email">-->
<!--                        <a class="item-title"><span>Email</span></a>-->
<!--                        <el-input prefix-icon="el-icon-message" type="type" placeholder="Enter your email id" autocomplete="off" v-model="loginForm.email"></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item prop="password">
                        <a class="item-title"><span>Password</span></a>
                        <el-input prefix-icon="el-icon-lock" placeholder="Enter 6 to 8 length password" show-password clearable type="password"  autocomplete="off" v-model="loginForm.password"></el-input>
                    </el-form-item>
                </el-form>
                <el-button class="sign-in" @click.native.prevent="getLoginSubmit('loginForm')">Sign up</el-button>
                <div class="dividing-line"><span>OR</span></div>
                <div class="third-mode">
                    <a class="google-btn" @click="thirdLogin">
                        <img src="../assets/image/google-icon.png" alt="Google登录">
                        <span>Google</span>
                    </a>
                    <a class="facebook-btn" @click="thirdLogin">
                        <img src="../assets/image/facebook-icon.png" alt="Facebook登录">
                        <span>Facebook</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { getCaptcha, checkCaptcha, register } from './../http/api'
    import {Toast} from "vant";
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
                    nickname: '',
                    // email: '',
                    captcha: '',
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
                },
                countryAlias: [     // 国家列表
                    {value: '+91', urlImage: ''},
                    {value: '+86', urlImage: ''},
                    {value: '+1', urlImage: ''},
                    {value: '+0086', urlImage: ''},
                    {value: '+23', urlImage: ''}
                ],
                countryType: ''     //
            }
        },
        created() {
            this.checkLoginCode = async (phone, captcha) => {
                return await checkCaptcha(phone, captcha)
            }
        },
        methods: {
            // async checkLoginCode(phone, captcha) {
            //     return await checkCaptcha(phone, captcha)
            // },
            async checkTestCode(phone, captcha) {
                return await checkCaptcha(phone, captcha)
            },
            async signupLoad(phone, password, captcha, nickname) {
                return await register(phone, password, captcha, nickname)
            },
            // 点击发送验证码，获取验证码
            async sentCaptcha(val) {
                // 检验手机号是否已经注册过
                if(!(/^1[3456789]\d{9}$/.test(val))) {
                    this.$message({
                        type: 'error',
                        message: 'Please enter the correct Phone'
                    })
                    return false
                } else {
                    // const res = await checkPhone(val)
                    // if(res.exist != '-1') {
                    //     this.$message({
                    //         type: 'error',
                    //         message: '该手机号已经注册过，请您重新填写手机号!'
                    //     })
                    //     return false
                    // } else {
                    //     this.$message({
                    //         type: 'success',
                    //         message: '该手机号尚未注册过，请放心使用!'
                    //     })
                        const res = await getCaptcha(val)
                        if(res.code == '200') {
                            this.$message({
                                type: 'success',
                                message: '验证码已发送至您的手机，请注意查收!'
                            })
                        }
                    // }
                }
            },
            async getLoginSubmit(loginForm) {
                this.$refs[loginForm].validate((valid) => {
                    if(valid) {
                        let phone = this.loginForm.phone;
                        let password = this.loginForm.password
                        let captcha = this.loginForm.captcha
                        let nickname = this.loginForm.nickname
                        this.checkTestCode(phone, captcha).then(res => {
                            if(res.code == '200') {
                                this.checkLoginCode(phone, captcha).then(data => {
                                    if(data == null) {
                                        this.$message({
                                            type: 'error',
                                            message: '验证码已过期，请重新获取验证码!'
                                        })
                                    }
                                    if(data.code == '200') {
                                        this.signupLoad(phone, password, captcha, nickname).then(res => {
                                            if(res.code == '200') {
                                                Toast.success('注册成功，预祝您玩的愉快!!!')
                                            }
                                        })
                                    }
                                })
                            }
                        }).catch(error => {
                            Toast.fail('验证码错误!!!')
                        })
                    }
                })
            },
            // 第三方登录
            thirdLogin() {
                this.$message({
                    type: 'error',
                    message: '暂未开通第三方登录，敬请期待...'
                })
                return false
            }
        }
    }
</script>
<style lang="scss" scoped>
    .login {
        height: 100%;
        width: 100%;
        position: absolute;
        background: linear-gradient(to bottom, rgb(92, 208, 221), rgb(188, 226, 228));
        text-align: center;
        >.login-container {
            width: 100%;
            min-height: 79%;
            /*height: 100%;*/
            background-color: rgba(255,255,255,.85);
            position: absolute;
            margin: auto;
            left: 0;right: 0;
            top: 21%;
            border-radius: 30px 30px 0 0;
            >.register-roll {
                /*height: 100%;*/
                overflow-y: scroll;
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
                    font-size: 1.05rem;
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
                    .send-code {
                        display: inline-block;
                        height: auto;
                        line-height: 1;
                        font-size: .8rem;
                        position: absolute;
                        right: 8px;bottom: 8px;
                        padding: 5px 10px;
                        color: #939ba7
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
                    margin: 0 auto 2rem;
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
    }
</style>