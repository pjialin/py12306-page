<template>
    <div id="home-index" class="container">
        <el-container>
            <el-row class="width-full">
                <h2 class="action-title">接入状态</h2>
                <el-row :gutter="40" class="system-state">
                    <el-col :lg="6" :md="8" :sm="12" v-for="item in dashboard_lists" :key="item.key">
                        <div class="card">
                            <div class="left">
                                <div class="name" v-text="item.name"></div>
                                <div class="value"
                                     v-text="dashboard[item.key] != undefined ? dashboard[item.key] : '-'"></div>
                            </div>
                            <div class="right">
                                <span :class="item.icon" v-if="item.icon"
                                      :style="item.icon_color ? 'background: ' + item.icon_color : ''"></span>
                            </div>
                        </div>
                        <div class="break-2-rem clear hidden-lg-and-up"></div>
                    </el-col>
                </el-row>
                <div class="break-2-rem clear hidden-md-and-down"></div>
            </el-row>
        </el-container>
        <el-container v-if="cluster.count">
            <el-row class="width-full">
                <h2 class="action-title">集群状态</h2>
                <el-row :gutter="40" class="system-state">
                    <el-col :lg="6" :md="8" :sm="12" v-for="item in cluster_lists" :key="item.key">
                        <div class="card">
                            <div class="left" :class="{'width-full': !item.icon}">
                                <div class="name" v-text="item.name"></div>
                                <div class="value" :class="{'node-list': item.key == 'node_lists'}"
                                     v-text="cluster[item.key] != undefined ? cluster[item.key] : '-'"></div>
                            </div>
                            <div class="right">
                                <span :class="item.icon" v-if="item.icon"
                                      :style="item.icon_color ? 'background: ' + item.icon_color : ''"></span>
                            </div>
                        </div>
                        <div class="break-2-rem clear hidden-lg-and-up"></div>
                    </el-col>
                </el-row>
                <div class="break-2-rem clear hidden-md-and-down"></div>
            </el-row>
        </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dashboard_lists: [
                    {name: '用户', key: 'user_job_count', icon: 'fa fa-user', icon_color: '#7DD43B'},
                    {name: '任务', key: 'query_job_count', icon: 'fa fa-infinity', icon_color: '#F5A623'},
                    {name: '查询次数', key: 'query_count', icon: 'fa fa-search', icon_color: '#4A90E2'},
                ],
                cluster_lists: [
                    {name: '节点数量', key: 'count', icon: 'fa fa-globe-asia', icon_color: '#7DD43B'},
                    {name: '主节点', key: 'master'},
                    {name: '节点列表', key: 'node_lists'},
                ],
                dashboard: {},
                cluster: {},
                real_time_message_colors: ['#18D4AD'],
                real_time_message_data: {
                    columns: ['Date', '实时消息'],
                    rows: []
                },
                real_time_message_last_time: 0,
                week_message_colors: ['#fb7e70'],
                week_message_data: {
                    columns: ['Date', '处理消息'],
                    rows: []
                },
                week_message_last_time: 0,
                dataEmpty: true,
                refreshTime: 2
            }
        },
        mounted() {
            this.refreshData();
        },
        methods: {
            async refreshData() {
                if (this.$route.path != '/') return
                await this.getDashboard()
                await this.getCluster()
                setTimeout(this.refreshData, this.refreshTime * 1000)
            },
            async getDashboard() {
                await this.$api.get_dashboard().then(res => {
                    this.dashboard = res.data
                })
            },
            async getCluster() {
                await this.$api.get_stat_cluster().then(res => {
                    this.cluster = res.data
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/scss/variables";

    .system-state {
        .card {
            min-width: 200px;
            min-height: 120px;
            /*width: 22.75%;*/
            /*margin-right: 3%;*/

            &:last-child {
                margin-right: 0;
            }

            .left {
                float: left;
                width: 70%;
                min-width: 140px;

                .name {
                    font-size: 14px;
                    color: $color-text-secondary;
                    margin: 10px 0 0 20px;
                }

                .value {
                    font-size: 36px;
                    text-align: center;
                    padding: 0 5px;
                    overflow: scroll;
                }

                .node-list {
                    font-size: 24px;
                    padding-top: 15px;
                    height: 50px;
                }
            }

            .width-full{
                width: 100% !important;
            }

            .right {
                float: left;
                width: 30%;
                min-width: 50px;
                text-align: center;

                span {
                    background: #9a9a9a;
                    color: white;
                    margin-top: 16px;
                    font-size: 19px;
                    width: 38px;
                    height: 38px;
                    text-align: center;
                    line-height: 38px;
                    border-radius: 50%;
                    box-shadow: 0 0 2rem 0 rgba(136, 152, 170, .15);
                }
            }

        }
    }
</style>
