<template>
    <div id="account-index" class="container">
        <el-container>
            <el-row class="width-full">
                <div class="action-group">
                    <h2 class="action-title">用户管理</h2>
                    <div class="refresh-switch">
                        <span class="helper-text margin-right-s5-rem">自动刷新 <span v-text="retry_time"></span> 秒</span>
                        <el-switch v-model="auto_refresh"></el-switch>
                    </div>
                </div>
                <!-- Empty -->
                <el-col class="data" v-if="empty">
                    <div class="card text-align-center padding-tb-6-rem">
                        <h2 class="font-size-24 font-weight-normal color-text-secondary">没有正在运行的用户任务</h2>
                        <div class="break-3-rem"></div>
                    </div>
                </el-col>

                <!-- Have data-->
                <el-col class="data" v-else>
                    <div class="card padding-tb-1-rem padding-lr-2-rem" v-loading="loading_lists">
                        <el-table :data="lists" style="width: 100%">
                            <el-table-column prop="key" label="KEY"></el-table-column>
                            <el-table-column prop="user_name" label="账号"></el-table-column>
                            <el-table-column prop="name" label="姓名"></el-table-column>
                            <el-table-column prop="is_loaded" label="是否加载成功">
                                <template slot-scope="scope">
                                    <el-tag type="success" v-if="scope.row.is_loaded">成功</el-tag>
                                    <el-tag type="danger" v-else>失败</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column prop="is_ready" label="可用状态">
                                <template slot-scope="scope">
                                    <el-tag type="success" v-if="scope.row.is_ready">成功</el-tag>
                                    <el-tag type="danger" v-else>失败</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column prop="login_num" label="登录次数">
                                <template slot-scope="scope">
                                    <el-tag size="medium">{{ scope.row.login_num }}</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column prop="last_heartbeat" label="最后心跳">
                                <template slot-scope="scope">
                                    <span v-text="scope.row.last_heartbeat" class="time"></span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>
        </el-container>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                empty: false,
                lists: [],
                loading_lists: false,
                retry_time: 5,
                auto_refresh: true
            }
        },
        mounted() {
            this.refreshData()
        },
        methods: {
            async refreshData() {
                if (this.$route.path != '/user') return
                if (this.auto_refresh)
                    await this.getLists()
                setTimeout(this.refreshData, this.retry_time * 1000)
            },
            getLists(loading = true) {
                if (loading) this.loading_lists = true
                this.$api.get_users().then(res => {
                    if (!res.data || res.data.length <= 0) this.empty = true
                    else this.empty = false
                    this.lists = res.data
                    this.loading_lists = false
                }).catch(error => {
                    this.loading_lists = false
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/scss/variables";

</style>
