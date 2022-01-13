<template>
    <div id="main-view">
        <router-view v-slot="{ Component }">
            <transition name="page-switch" mode="out-in">
                <component :is="Component" :key="route.path"></component>
            </transition>
        </router-view>
    </div>
    <div id="fixed-background"></div>
    <transition name="fade">
        <BottomNav></BottomNav>
    </transition>
</template>

<script lang="ts" setup>
    import { useRoute } from "vue-router";
    import BottomNav from "./components/BottomNav.vue";

    const route = useRoute();
</script>

<style>
    * {
        position: relative;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    html,
    body {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;

        overflow: hidden;

        @apply bg-purple-400;

        transition: background 0.3s;
    }
    #app {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;

        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;

        overflow: hidden;

        @apply bg-purple-50;
    }
    a {
        @apply text-purple-600;
        text-decoration: none;
    }
    #main-view {
        z-index: 10;
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;

        overflow: hidden;
    }
    #fixed-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        overflow: hidden;

        @apply bg-purple-50;
    }

    .page-switch-enter-active,
    .page-switch-leave-active {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.3s;
    }

    .page-switch-enter-from,
    .page-switch-leave-to {
        opacity: 0;
        transform: translateY(-16px);
    }

    .fade-enter-active,
    .fade-leave-active {
        opacity: 1;
        transition: all 0.3s;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
    .button {
        @apply transition-all duration-300 shadow bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 m-2 rounded focus:ring focus:outline-none;
    }
    .button:disabled {
        @apply bg-gray-400;
    }
</style>
