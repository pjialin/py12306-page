<template>
    <div id="readme-index" class="container">
        <el-container>
            <el-row class="width-full">
                <div class="action-group">
                    <h2 class="action-title">帮助文档</h2>
                </div>
                <el-row class="" v-loading="loading_readme">
                    <el-col :span="24">
                        <div class="card padding-2-rem">
                            <article v-html="info" class="markdown-body"></article>
                        </div>
                    </el-col>
                </el-row>
            </el-row>
        </el-container>

    </div>
</template>

<script>

    import {Converter} from "showdown";

    export default {
        data() {
            return {
                loading_readme: false,
                info: ''
            }
        },
        mounted() {
            this.getReadme()
        },
        methods: {
            async getReadme() {
                this.loading_readme = true
                await this.$api.get_readme().then(res => {
                    let converter = new Converter()
                    this.info = converter.makeHtml(res.data)
                })
                this.loading_readme = false
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/scss/variables";
    @import "../../assets/scss/markdown";

</style>
<style lang="scss">
    @import "../../assets/scss/markdown";
</style>
