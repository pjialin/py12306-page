<template>
    <div class="height-full vertical-center">
        <div id="login" class="container width-full">
            <el-container>
                <el-row class="width-full" type="flex" justify="center">
                    <el-col :lg="10" :md="12" :sm="16">
                        <!-- Form -->
                        <div class="card padding-2-rem padding-lr-3-rem text-align-center">
                            <h2 class="card-title font-size-28">PY 12036</h2>
                            <el-form :model="info" :rules="rules" ref="form" @submit.native.prevent="doAdd">
                                <el-form-item label="用户名" prop="username">
                                    <el-input v-model="info.username"></el-input>
                                </el-form-item>
                                <el-form-item label="密码" prop="password">
                                    <el-input type="password" v-model="info.password"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <div class="break-2-rem"></div>
                                    <el-button type="primary" @click="doLogin" :loading="loading_login" plain>登录
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-col>
                </el-row>
            </el-container>

        </div>
    </div>
</template>

<script>

    import {LOGIN_SUCCESS} from "../../store/mutation-types";

    export default {
        data() {
            return {
                info: {},
                loading_login: false,
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                }
            }
        },
        mounted() {
        },
        methods: {
            doLogin() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.loading_login = true
                        this.$api.login(this.info).then(res => {
                            this.loading_login = false
                            this.$store.dispatch(LOGIN_SUCCESS, res.data)
                            this.$router.push('/')
                        }).catch(error => {
                            this.loading_login = false
                        })
                    }
                })
            }
        }
    }
</script>


<style lang="scss">
    @import "../../assets/scss/app";
</style>
