<template>
    <div id="help-index" class="container">
        <el-container>
            <el-row class="width-full">
                <div class="action-group">
                    <h2 class="action-title">快捷访问</h2>
                </div>
                <el-row :gutter="40" class="quick-links">
                    <el-col :lg="6" :md="8" :sm="12" v-for="item in function_lists" :key="item.key">
                        <router-link :to="item.url">
                            <div class="card text-align-center color-text-secondary">
                                <div class="break-2-rem"></div>
                                <div>
                                    <span :class="item.icon" class="font-size-30"></span>
                                </div>
                                <div class="break-s2-rem"></div>
                                <div>
                                    <span v-text="item.name" class="font-size-18"></span>
                                </div>
                            </div>
                        </router-link>
                        <div class="break-2-rem clear hidden-lg-and-up"></div>
                    </el-col>
                </el-row>
                <div class="break-2-rem clear hidden-md-and-down"></div>
                <div class="action-group">
                    <h2 class="action-title">关于</h2>
                </div>
                <el-row class="common-problem">
                    <el-col :span="24">
                        <div class="card padding-2-rem" v-html="about">
                        </div>
                    </el-col>
                </el-row>
            </el-row>
        </el-container>

    </div>
</template>

<script>

    import {ALERT_MESSAGE} from "../../store/mutation-types";

    export default {
        data() {
            return {
                function_lists: [
                    {name: '帮助文档', url: '/help/readme', icon: 'fa fa-book-open'},
                ],
                about: '写这个程序最初只是为了给自己父母买张回家的票，开源是希望能帮助到更多的人，请勿用于任何商业行为。<br /><br />github: <a href="https://github.com/pjialin/py12306" target="_blank">https://github.com/pjialin/py12306</a>'
            }
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style scoped lang="scss">
    @import "../../assets/scss/variables";

    .quick-links {
        .card {
            min-width: 200px;
            min-height: 120px;
            transition: all .25s ease-out;

            &:hover {
                box-shadow: 0 0px 20px 0 $color-shadow;
                color: $color-link-hover;
            }
        }
    }

    .common-problem {
    }
</style>
