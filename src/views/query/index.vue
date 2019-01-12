<template>
    <div id="account-index" class="container">
        <el-container>
            <el-row class="width-full">
                <div class="action-group">
                    <h2 class="action-title">查询任务</h2>
                    <div class="refresh-switch">
                        <span class="helper-text margin-right-s5-rem">自动刷新 <span v-text="retry_time"></span> 秒</span>
                        <el-switch v-model="auto_refresh"></el-switch>
                    </div>
                </div>
                <!-- Empty -->
                <el-col class="data" v-if="empty">
                    <div class="card text-align-center padding-tb-6-rem">
                        <h2 class="font-size-24 font-weight-normal color-text-secondary">没有正在运行的查询任务</h2>
                        <div class="break-3-rem"></div>
                    </div>
                </el-col>

                <!-- Have data-->
                <el-col class="data" v-else>
                    <div class="card padding-tb-1-rem padding-lr-2-rem" v-loading="loading_lists">
                        <el-table :data="lists" style="width: 100%">
                            <el-table-column prop="name" label="名称" width="150"></el-table-column>
                            <el-table-column label="出发日期">
                                <template slot-scope="scope">
                                    {{ scope.row.left_dates.join(', ') }}
                                </template>
                            </el-table-column>
                            <el-table-column label="乘客人数" width="120">
                                <template slot-scope="scope">
                                    <el-tag size="medium">{{ scope.row.member_num }}</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column label="部分提交" width="120">
                                <template slot-scope="scope">
                                    <el-switch v-model="scope.row.allow_less_member" disabled></el-switch>
                                </template>
                            </el-table-column>
                            <el-table-column label="座位">
                                <template slot-scope="scope">
                                    {{ scope.row.allow_seats.join(', ') }}
                                </template>
                            </el-table-column>
                            <el-table-column label="筛选车次">
                                <template slot-scope="scope">
                                    {{ scope.row.allow_train_numbers.join(', ') }}
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
                if (this.$route.path != '/query') return
                if (this.auto_refresh)
                    await this.getLists()
                setTimeout(this.refreshData, this.retry_time * 1000)
           },
            async getLists(loading = true) {
                if (loading) this.loading_lists = true
                await this.$api.get_query().then(res => {
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
