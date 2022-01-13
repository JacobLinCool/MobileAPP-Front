<template>
    <div id="app-home">
        <transition name="fade">
            <div id="container" v-show="true">
                <div id="safe-area" class="w-full my-3"></div>
                <div id="fast-action" ref="fastAction" class="bg-white w-full my-2 py-3 px-2 shadow rounded">
                    <h1 ref="facGreeting" class="text-2xl">你好，歡迎使用 RPG+！</h1>
                    <p ref="facMessage">
                        已有遊戲代碼想要開始玩？ <router-link to="/play">點我加入遊戲！</router-link> <br />
                        或是想要製作新的遊戲？ <router-link to="/create">點我製作遊戲！</router-link>
                    </p>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import router from "../router/index";

    export default defineComponent({
        name: "home",
        data() {
            return {};
        },
        methods: {},
        setup() {},
        async mounted() {},
    });
</script>

<style scoped>
    #app-home {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        overflow: hidden;
    }
    #container {
        position: fixed;
        top: 0;
        left: 0;
        width: calc(100% - 16px);
        height: calc(100% - 50px);
        margin: 0 8px;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        overflow: hidden auto;
    }
</style>
