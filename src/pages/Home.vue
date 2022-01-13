<template>
    <div id="home">
        <transition name="fade">
            <div id="container" v-show="true">
                <div id="safe-area" class="w-full my-3"></div>
                <div id="fast-action" class="w-11/12 m-auto bg-white my-2 py-3 px-2 shadow rounded">
                    <h1 class="text-2xl">你好，歡迎使用 RPG+！</h1>
                    <p>
                        已有遊戲代碼想要開始玩？ <router-link to="/play">點我加入遊戲！</router-link> <br />
                        或是想要製作新的遊戲？ <router-link to="/create">點我製作遊戲！</router-link>
                    </p>
                </div>
                <h2 class="text-xl">{{ fetched ? "加入以下遊戲" : "查詢遊戲列表..." }}</h2>
                <transition name="fade">
                    <div v-if="fetched" class="w-11/12 m-auto">
                        <div v-for="game in list" class="bg-white w-full my-2 py-3 px-2 shadow rounded">
                            <h1 class="text-lg">{{ game.name }}</h1>
                            <p class="text-md">{{ game.description }}</p>
                            <p class="text-md">ID: {{ game.id }}</p>
                            <router-link :to="'/play?id=' + game.id" class="w-full inline-block">加入遊戲</router-link>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script lang="ts" setup>
    import { reactive, ref } from "vue";
    import { endpoint } from "../api";

    interface game_meta {
        id: string;
        name: string;
        description: string;
    }

    const fetched = ref(false);
    const list = reactive<game_meta[]>([]);

    (async () => {
        const response = await fetch(`${endpoint}/list`);
        const data = await response.json();
        list.push(...data);
        fetched.value = true;
    })();
</script>

<style scoped>
    #home {
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
