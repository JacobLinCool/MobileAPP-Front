<template>
    <div id="bottom-navigation" v-if="true">
        <router-link class="bnv-item" to="/home" @click="activePage(0)">
            <div>
                <i class="fas fa-home text-2xl"></i>
                <span>首頁</span>
            </div>
        </router-link>
        <router-link class="bnv-item" to="/play" @click="activePage(1)">
            <div>
                <i class="fas fa-play text-2xl"></i>
                <span>遊玩</span>
            </div>
        </router-link>
        <router-link class="bnv-item" to="/ranking" @click="activePage(1)">
            <div>
                <i class="fas fa-list-ul text-2xl"></i>
                <span>排名</span>
            </div>
        </router-link>
        <router-link class="bnv-item" to="/create" @click="activePage(2)">
            <div>
                <i class="fas fa-plus text-2xl"></i>
                <span>建立</span>
            </div>
        </router-link>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    export default defineComponent({
        name: "BottomNav",
        methods: {
            activePage(n = 0) {
                const tabs = document.querySelectorAll(".bnv-item");

                for (let i = 0; i < tabs.length; i++) tabs[i].classList.remove("active");
                tabs[n].classList.add("active");
            },
        },
        setup() {},
    });
</script>

<style scoped>
    #bottom-navigation {
        z-index: 3000;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        border: 1px solid #ccc;
        border-radius: 6px 6px 0 0;
        box-shadow: 0px 0px 6px 0px lightgrey;
        transition: all 0.3s;

        @apply bg-purple-50;
    }
    .bnv-item {
        width: 25%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 12px;

        @apply text-purple-500 transition duration-300 hover:bg-purple-100 hover:text-purple-600;
    }
    .bnv-item > div {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .bnv-item > div > * {
        top: 2px;
    }
</style>
