<template>
    <div id="ranking">
        <transition name="fade">
            <div id="container" v-show="true">
                <div id="safe-area" class="w-full my-3"></div>

                <h1 style="font-size: 1.6rem">查詢排行榜</h1>
                <div class="ch">
                    <label class="ch-label">遊戲 ID</label>
                    <input class="ch-input" v-model="game_id" placeholder="abc123" />
                    <a @click="query" href="javascript:void(0)" class="w-full inline-block">查詢</a>
                </div>

                <transition name="fade">
                    <div v-if="queried" class="w-11/12 mx-auto">
                        <h2 class="text-lg">隊伍排名</h2>
                        <table class="table w-full text-right">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>隊伍</th>
                                    <th>平均時間</th>
                                    <th>完成人數</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(team, index) in team_list" :key="'team_' + index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ team.team }}</td>
                                    <td>{{ team.time }} 秒</td>
                                    <td>{{ team.count }} 人</td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <h2 class="text-lg">個人排名</h2>
                        <table class="table w-full text-right">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>名稱</th>
                                    <th>完成時間</th>
                                    <th>隊伍</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(player, index) in personal_list" :key="'personal_' + index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ player.name }}</td>
                                    <td>{{ player.time }} 秒</td>
                                    <td>{{ player.team }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script lang="ts" setup>
    import { reactive, ref } from "vue";
    import Swal from "sweetalert2";
    import { endpoint } from "../api";

    interface team_record {
        team: string;
        time: number;
        count: number;
    }

    interface personal_record {
        team: string;
        name: string;
        time: number;
    }

    function alert(title: string, text = "") {
        Swal.fire({
            title: title,
            text: text,
            icon: "error",
            confirmButtonText: "確定",
        });
    }

    const game_id = ref("");
    const team_list = reactive<team_record[]>([]);
    const personal_list = reactive<personal_record[]>([]);
    const queried = ref(false);

    if (location.search.includes("?id=")) {
        const id = location.search.split("?id=")[1];
        game_id.value = id;
    }

    async function query(evt: MouseEvent) {
        if (game_id.value.length === 0) {
            alert("請輸入遊戲 ID");
            return;
        }
        queried.value = false;
        if ((await Promise.all([query_team(), query_personal()])).some((result) => result === false)) {
            alert("查詢失敗", "也許是遊戲 ID 錯誤");
            return;
        } else {
            queried.value = true;
        }
    }

    async function query_team() {
        const res = await fetch(`${endpoint}/ranking/get?id=${game_id.value}`);
        if (res.status !== 200) {
            return false;
        }
        const data = await res.json();
        team_list.push(...data);

        return true;
    }

    async function query_personal() {
        const res = await fetch(`${endpoint}/ranking/personal?id=${game_id.value}`);
        if (res.status !== 200) {
            return false;
        }
        const data = await res.json();
        personal_list.push(...data);

        return true;
    }
</script>

<style scoped>
    #ranking {
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
    .ch {
        @apply p-2 mt-2 mb-6 w-full max-w-md mx-auto border border-gray-100 rounded shadow-md bg-opacity-80 bg-white;
    }
    .ch-input {
        @apply border-b-2 border-gray-600 px-2 py-1 mb-3 w-full;
    }
    .ch-label {
        @apply inline-block w-full text-left ml-1;
    }
    .ch > input:focus {
        @apply outline-none;
    }
</style>
