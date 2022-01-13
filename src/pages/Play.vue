<template>
    <div id="play">
        <div id="container" v-show="true">
            <div id="safe-area" class="w-full my-3"></div>
            <div id="wrapper">
                <transition name="fade" mode="out-in">
                    <div>
                        <div v-if="state === 0">
                            <h1 style="font-size: 1.6rem">加入遊戲</h1>
                            <div class="ch">
                                <label class="ch-label">遊戲 ID</label>
                                <input class="ch-input" v-model="game.id" placeholder="abc123" />
                                <button @click="join">加入</button>
                            </div>
                        </div>
                        <div v-if="state === 1">
                            <h1 style="font-size: 1.6rem">遊戲資訊</h1>
                            <div class="ch">
                                <p class="ch-label text-lg">{{ game.name }}</p>
                                <p class="ch-label text-md">{{ game.description }}</p>
                            </div>
                            <div class="ch">
                                <p class="ch-label text-lg">關卡數： {{ game.challenges.length }}</p>
                            </div>
                            <div class="ch">
                                <label class="ch-label">輸入玩家名稱</label>
                                <input class="ch-input" v-model="player.name" placeholder="player" />
                                <label class="ch-label">選擇隊伍名稱</label>
                                <select class="ch-input" v-model="player.team">
                                    <option v-for="team in game.teams" :value="team">{{ team }}</option>
                                </select>
                                <button @click="start">開始遊戲</button>
                            </div>
                        </div>
                        <div v-if="state === 2">
                            <h1 class="text-3xl">{{ game.challenges[player.challenge].name }}</h1>
                            <div class="ch">
                                <p class="ch-label text-lg">{{ game.challenges[player.challenge].description }}</p>
                            </div>
                            <div class="ch" v-if="game.challenges[player.challenge].mode === 0">
                                <p class="ch-label text-lg">請移動至指定位置： {{ game.challenges[player.challenge].gps }}</p>
                                <p class="ch-label text-lg">現在位置： {{ position || "取得位置中..." }}</p>
                            </div>
                            <div class="ch" v-if="game.challenges[player.challenge].mode === 1">
                                <p class="ch-label text-lg">請輸入指定密碼</p>
                                <input class="ch-input" v-model="password" placeholder="password" />
                            </div>
                            <div class="ch">
                                <button @click="next">下一關</button>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { reactive, ref } from "vue";
    import Swal from "sweetalert2";

    function alert(title: string, text = "") {
        Swal.fire({
            title: title,
            text: text,
            icon: "error",
            confirmButtonText: "確定",
        });
    }

    function success(title: string, text = "") {
        Swal.fire({
            title: title,
            text: text,
            icon: "success",
            confirmButtonText: "確定",
        });
    }

    const endpoint = "https://mobile-app-server.jacoblincool.repl.co";

    const state = ref(0);

    const game: any = reactive({
        id: "",
    });

    if (location.search.includes("?id=")) {
        const game_id = location.search.split("?id=")[1];
        game.id = game_id;
    }

    const player: any = reactive({
        name: "",
        team: "",
        challenge: 0,
    });

    const password = ref("");

    const position = ref("");
    const pos_interval = ref(0);

    function join() {
        if (game.id.length === 0) {
            alert("請輸入遊戲 ID");
            return;
        }

        const url = `${endpoint}/get?id=${game.id}`;
        fetch(url)
            .then((res) => res.json())
            .then(async (g) => {
                if (g.name) {
                    for (const key in g) {
                        game[key] = g[key];
                    }
                    console.log(game);
                    state.value = 1;
                } else {
                    alert("加入失敗", "請確認遊戲 ID 是否正確");
                }
            });
    }

    function start() {
        console.log(game, player);
        state.value = 2;

        pos_interval.value = setInterval(async () => {
            const data = await current_location();
            console.log(data);
            position.value = `${data.coords.latitude}, ${data.coords.longitude}`;
        }, 3_000);
    }

    function next() {
        if (game.challenges[player.challenge].mode === 0) {
            const lat1 = +game.challenges[player.challenge].gps.split(",")[0].trim();
            const lng1 = +game.challenges[player.challenge].gps.split(",")[1].trim();
            const lat2 = +position.value.split(",")[0].trim();
            const lng2 = +position.value.split(",")[1].trim();

            const dist = Math.floor(calc_dist(lat1, lng1, lat2, lng2));
            console.log(dist);

            if (dist <= 200) {
                player.challenge++;
                if (player.challenge >= game.challenges.length) {
                    success("遊戲結束", "恭喜你過關了");
                    state.value = 0;
                }
            } else {
                alert("不在指定位置附近", `目前距離 ${dist} 公尺`);
            }
        } else {
            if (password.value === game.challenges[player.challenge].secret) {
                player.challenge++;
                password.value = "";
                if (player.challenge >= game.challenges.length) {
                    success("遊戲結束", "恭喜你過關了");
                    state.value = 0;
                }
            } else {
                alert("密碼錯誤");
            }
        }
    }

    function current_location(): Promise<GeolocationPosition> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve(position);
                },
                (error) => {
                    reject(error);
                },
                {
                    enableHighAccuracy: false,
                    timeout: 5_000,
                    maximumAge: 0,
                }
            );
        });
    }

    function calc_dist(lat1: number, lon1: number, lat2: number, lon2: number) {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1); // deg2rad below
        const dLon = deg2rad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d * 1000;
    }

    function deg2rad(deg: number) {
        return deg * (Math.PI / 180);
    }
</script>

<style scoped>
    #play {
        width: 100%;
        height: 100%;
    }
    #container {
        position: absolute;
        top: 0;
        left: 0;
        width: calc(100% - 16px);
        height: calc(100% - 50px);
        margin: 0 8px;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    #wrapper {
        @apply w-11/12 h-full m-auto;
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
