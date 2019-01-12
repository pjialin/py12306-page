<template>
    <div class="nav-bar">
        <el-row>
            <el-col :span="10">
                <div class="logo-area vertical-center">
                    <h2 class="no-margin vertical-center">PY 12306</h2>
                </div>
            </el-col>

            <el-col :span="14">
                <div class="actions float-right margin-right-1-rem">
                    <ul class="list-style-none">
                        <li class="float-left margin-left-3-rem" v-for="action in actions">
                            <a :href="action.link" class="color-white vertical-center"
                               @click.prevent="handleAction(action)">
                                <i :class="action.icon" class="font-size-14 margin-right-s5-rem" v-if="action.icon"></i>
                                <span v-text="action.text"></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import {ALERT_MESSAGE, LOGOUT_SUCCESS} from "../store/mutation-types";

    export default {
        name: 'main-header',
        data() {
            return {
                app: {},
                actions: []
            }
        },
        created() {
            this.getActions()
        },
        methods: {
            getActions() {
                this.$api.get_actions().then(res => {
                    this.actions = res.data
                })
            },
            handleAction(action) {
                if (action.key == 'logout') {
                    this.$store.dispatch(LOGOUT_SUCCESS)
                    this.$store.dispatch(ALERT_MESSAGE, {text: '退出成功', type: 'success'})
                    this.$router.push('/login')
                }
            }
        }
    }
</script>
<style lang="scss">
    @import "../assets/scss/app";

    .el-header {
        background: $color-background-dark;
        color: white;

        .nav-bar {
            height: 100%;

            .el-row, .el-col {
                height: inherit;
            }
        }

        .logo-area {
            height: inherit;

            h2 {
                height: inherit;
                font-size: 20px;
                font-weight: $font-weight;
            }
        }

        .actions {
            a {
                color: gray;
            }
        }
    }
</style>
