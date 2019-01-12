<template>
    <div id="menus">
        <div class="user-info margin-tb-3-rem">
            <div class="text-align-center">
                <div class="avatar">
                    <img :src="user.avatar" alt=""
                         class="border-circle" width="60">
                </div>
                <div class="name">
                    <span class="font-size-18" v-text="user.name"></span>
                </div>
            </div>

        </div>
        <el-menu router :collapse="!$store.state.common.sidebar" :default-active="index">
            <template v-for="menu in menus">

                <el-menu-item :index="menu.id ? menu.id.toString(): ''" :route="{path: menu.url}">
                    <i :class="menu.icon" v-if="menu.icon"></i>
                    <span slot="title" v-text="menu.name"></span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script>

    export default {
        name: 'main-sidebar',
        data() {
            return {
                index: '0',
                loading: null,
                user: {},
                menus: []
            }
        },
        async created() {
            this.handleLoading('on')
            await this.getUserInfo()
            await this.getMenus()
            this.handleLoading('off')
        },
        watch: {
            $route(to, from) {
                this.$nextTick(_ => {
                    this.updateMenus()
                })
            }
        },
        mounted() {
        },
        methods: {
            handleLoading(type = 'on') {
                if (type == 'on')
                    this.loading = this.$loading({lock: true, text: '加载中...',});
                else
                    this.loading.close();
            },
            async getUserInfo() {
                await this.$api.get_user_info().then(res => {
                    this.user = res.data
                }).catch(error => {
                    this.handleLoading('off')
                })
            },
            async getMenus() {
                await this.$api.get_menus().then(res => {
                    this.updateMenus(res.data)
                }).catch(error => {
                    this.handleLoading('off')
                })
            },
            updateMenus(data) {
                data = data ? data : this.menus
                data.forEach((item) => {
                    if (this.$route.path.indexOf(item.url) === 0)
                        this.index = item.id.toString()
                })
                this.menus = data
            }
        }
    }
</script>
<style lang="scss">
    @import "../assets/scss/variables";

    .el-aside {
        background-color: $color-background-second;
        height: 100%;
        width: auto !important;

        .el-menu {
            height: 100%;
            border-right: 0;
            background-color: transparent;

            &:not(.el-menu--collapse) {
                width: 300px;
            }

            .el-menu-item {
                font-size: 16px;
                margin-bottom: 16px;
                color: $color-text-primary;
                padding-left: 32px !important;
                transition: all .25s ease-out;

                i {
                    color: inherit;
                    font-size: 18px;
                    margin-right: 15px;
                }

                &:focus {
                    background: transparent;
                }

                &:hover {
                    background: $color-split;
                }

                &.is-active {
                    color: $color-link-primary;
                    background: $color-split;
                }
            }
        }
    }
</style>
