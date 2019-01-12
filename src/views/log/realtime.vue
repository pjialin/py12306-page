<template>
    <div id="log-realtime" class="container">
        <el-container>
            <el-row class="width-full">
                <div class="action-group">
                    <h2 class="action-title">实时日志</h2>
                    <div class="refresh-switch">
                        <span class="helper-text margin-right-s5-rem">自动刷新 <span v-text="retry_time"></span> 秒</span>
                        <el-switch v-model="auto_refresh"></el-switch>
                    </div>
                </div>

                <!-- Have data-->
                <el-col class="data height-full">
                    <div class="card padding-tb-1-rem padding-lr-2-rem height-full log-area" v-loading="loading_lists"
                         @mouseover="able_to_scroll=false" @mouseout="able_to_scroll=true">
                        <div class="logs" ref='logs'>
                            <span v-for="line in lists" v-text="line" class="display-block"> </span>
                        </div>
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
                lists: [],
                loading_lists: false,
                line: -1,
                // limit: 200,
                limit: 10,
                retry_time: 1,
                is_first_time: true,
                auto_refresh: true,
                able_to_scroll: true
            }
        },
        mounted() {
            this.refreshData()
        },
        methods: {
            async refreshData() {
                if (this.$route.path != '/log/realtime') return
                if (this.is_first_time || this.auto_refresh)
                    await this.getLists(this.is_first_time)
                this.is_first_time = false
                setTimeout(this.refreshData, this.retry_time * 1000)
            },
            async getLists(loading = true) {
                if (loading) this.loading_lists = true
                await this.$api.get_log_realtime({
                    line: this.line,
                    limit: this.limit
                }).then(res => {
                    if (res.data.data && res.data.data.length) {
                        this.lists = this.lists.concat(res.data.data)
                        this.$nextTick(() => {
                            if (this.able_to_scroll) {
                                var log_dom = this.$refs.logs
                                log_dom.scrollTop = log_dom.scrollHeight;
                            }
                        })
                        this.line = res.data.last_line
                    }
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

    #log-realtime {
        height: 85%;
    }

    .log-area {
        background: $color-background-primary;
        border: 1px dashed $color-text-primary;

        .logs {
            height: 100%;
            overflow: auto;
            white-space: pre;
            scroll-behavior: smooth;
        }
    }
</style>
