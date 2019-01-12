<template>
    <el-container id="body">
        <!--Header -->
        <el-header>
            <main-header></main-header>
        </el-header>

        <!-- Content Area -->
        <el-container id="content">
            <!-- Side bar-->
            <el-aside>
                <main-sidebar></main-sidebar>
            </el-aside>
            <!-- Content body -->
            <el-main id="content-body">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    import MainHeader from "../../components/header.vue";
    import MainSidebar from "../../components/sidebar.vue";

    export default {
        components: {
            MainSidebar,
            MainHeader,
        },
        mounted() {
        },
        data() {
            return {}
        },
    }
</script>
<style lang="scss">
    @import "../../assets/scss/app";
    // UP el style
    .el-container {
        height: inherit;
    }

    // Table
    .el-table:before {
        height: 0;
    }

    .el-table, .el-table th, .el-table tr {
        background: inherit;
    }

    .el-table, .el-table thead {
        color: inherit;
    }

    .el-table td, .el-table th {
        padding: 18px 0;
    }

    .el-table td, .el-table th.is-leaf {
        // border-color: $color-border;
    }

    .el-table tr:last-child td {
        border: none;
    }

    .el-message {
        top: 80px
    }


    .el-collapse-item__header, .el-collapse-item__wrap {
        background: inherit;
    }
    .el-collapse-item__header, .el-collapse-item__content{
        font-size: $font-size;
    }
    .el-collapse-item__content {
        color: $color-text-secondary;
    }
</style>
