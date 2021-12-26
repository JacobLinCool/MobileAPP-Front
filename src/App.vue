<script setup>
    import { reactive } from "vue";

    const endpoint = "https://mobile-app-server.jacoblincool.repl.co";
    const modes = ["GPS 定位挑戰", "通關密碼挑戰"];

    class Challenge {
        name = "";
        description = "";
        points = 0;
        mode = 0;
        secret = null;
        gps = null;

        constructor(name = "", description = "", points = 10, mode = 0) {
            this.name = name;
            this.description = description;
            this.points = points;
            this.mode = mode;

            this.secret = Math.floor(36 ** 5 + 1 + Math.random() * (36 ** 5 * 35 - 1)).toString(36);
        }
    }

    const game = reactive({
        name: "",
        description: "",
    });
    const challenges = reactive([new Challenge()]);

    function new_challenge() {
        challenges.push(new Challenge());
        console.log(challenges);
    }

    function del_challenge(index) {
        challenges.splice(index, 1);
        console.log(challenges);
    }

    async function save_game(evt) {
        evt.target.disabled = true;

        const is_valid = validate_data();

        console.log("validation: ", is_valid);

        if (is_valid) {
            for (const challenge of challenges) {
                if (challenge.gps) {
                    challenge.gps = challenge.gps
                        .split(",")
                        .map((x) => parseFloat(x.trim()))
                        .splice(0, 2)
                        .join(",");
                }
            }

            console.log(
                JSON.stringify(
                    {
                        name: game.name,
                        description: game.description,
                        challenges,
                    },
                    null,
                    2
                )
            );

            const res = await fetch(endpoint + "/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: game.name,
                    description: game.description,
                    challenges: challenges,
                }),
            });

            const data = await res.json();
            if (data.error) {
                alert(data.msg);
            } else {
                alert("遊戲已建立！ ID: " + data.id);
            }
        }

        evt.target.disabled = false;
    }

    function validate_gps_location(location) {
        try {
            // 123.456, 123.456
            const [lat, lng] = location.split(",").map((x) => parseFloat(x.trim()));
            if (isNaN(lat) || isNaN(lng)) {
                return false;
            }
            if (lat < -90 || lat > 90) {
                return false;
            }
            if (lng < -180 || lng > 180) {
                return false;
            }
            return true;
        } catch (err) {
            return false;
        }
    }

    function check_gps(input) {
        if (!validate_gps_location(input.target.value)) {
            input.target.classList.add("error");
        } else {
            input.target.classList.remove("error");
        }
    }

    function validate_data() {
        try {
            if (game.name.length === 0 || game.name.length > 30) {
                alert("遊戲名稱長度需介於 1 ~ 30 字元");
                return false;
            }
            if (game.description.length === 0 || game.description.length > 1000) {
                alert("遊戲描述長度需介於 1 ~ 1000 字元");
                return false;
            }
            if (challenges.length === 0 || challenges.length > 100) {
                alert("關卡總數需介於 1 ~ 100 個");
                return false;
            }

            for (const challenge of challenges) {
                if (challenge.name.length === 0 || challenge.name.length > 30) {
                    alert(`關卡 ${challenge.name} 名稱長度需介於 1 ~ 30 字元`);
                    return false;
                }
                if (challenge.description.length === 0 || challenge.description.length > 1000) {
                    alert(`關卡 ${challenge.name} 描述長度需介於 1 ~ 1000 字元`);
                    return false;
                }
                if (challenge.points < 0 || challenge.points > 1e9) {
                    alert(`關卡 ${challenge.name} 獎勵分數需介於 0 ~ 1000000000`);
                    return false;
                }
                if (challenge.mode < 0 || challenge.mode >= modes.length) {
                    alert(`關卡 ${challenge.name} 模式錯誤`);
                    return false;
                }
                if (challenge.mode === 0) {
                    if (!validate_gps_location(challenge.gps)) {
                        alert(`關卡 ${challenge.name} GPS 位置錯誤`);
                        return false;
                    }
                }
                if (challenge.mode === 1) {
                    if (challenge.secret.length === 0) {
                        alert(`關卡 ${challenge.name} 通關密碼不可為空`);
                        return false;
                    }
                }
            }
            return true;
        } catch (err) {
            alert("資料錯誤，請重新填寫");
            return false;
        }
    }
</script>

<template>
    <div id="challenge-creator">
        <h1 class="text-xl">建立遊戲</h1>
        <p></p>
        <div class="ch game">
            <label class="ch-label">遊戲名稱</label>
            <input class="ch-input" v-model="game.name" placeholder="我的超酷遊戲" />
            <label class="ch-label">遊戲說明</label>
            <input class="ch-input" v-model="game.description" placeholder="遊戲的說明" />
            <label class="ch-label">關卡總數</label>
            <input class="ch-input" :value="challenges.length" disabled />
            <label class="ch-label">關卡總分</label>
            <input class="ch-input" :value="challenges.reduce((acc, cur) => acc + cur.points, 0)" disabled />
        </div>
        <div id="save-game" class="ch" @click="save_game">
            <button>儲存</button>
        </div>
        <div>
            <div v-for="(challenge, index) in challenges" :key="index" class="ch">
                <label class="ch-label">關卡名稱</label>
                <input type="text" class="ch-input" v-model="challenge.name" :placeholder="'超酷的第 ' + (index + 1) + ' 關'" title="關卡名稱" />
                <label class="ch-label">關卡說明</label>
                <input type="text" class="ch-input" v-model="challenge.description" placeholder="關於這關的前情提要？或是內容說明？" title="關卡說明" />
                <label class="ch-label">關卡分數</label>
                <input type="number" class="ch-input" v-model="challenge.points" :placeholder="'第 ' + (index + 1) + ' 關的分數'" title="關卡分數" />
                <label class="ch-label">關卡模式</label>
                <select class="ch-input" v-model="challenge.mode">
                    <option v-for="(mode, i) in modes" :value="i">{{ mode }}</option>
                </select>
                <!-- if mode is 0, show GPS location selector -->
                <label class="ch-label" v-if="challenge.mode == 0">目的地 GPS 座標</label>
                <input
                    type="text"
                    class="ch-input"
                    v-if="challenge.mode == 0"
                    v-model="challenge.gps"
                    placeholder="25.0275, 121.5282"
                    title="GPS"
                    @input="check_gps"
                />
                <!-- if mode is 1, show secret -->
                <label class="ch-label" v-if="challenge.mode == 1">通關密碼</label>
                <input
                    type="text"
                    class="ch-input"
                    v-if="challenge.mode == 1"
                    v-model="challenge.secret"
                    :placeholder="'第 ' + (index + 1) + ' 關的通關密碼'"
                    title="通關密碼"
                />
                <button class="ch-del" @click="del_challenge(index)" tabindex="-1">刪除</button>
            </div>
            <!-- Create New Challenge -->
            <div id="add-challenge" class="ch" @click="new_challenge">
                <button>新增</button>
            </div>
        </div>
    </div>
</template>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .ch {
        @apply p-2 mt-2 mb-6 w-full max-w-md mx-auto border border-gray-100 rounded shadow-md bg-opacity-80 bg-white;
    }

    .ch-input {
        @apply border-b-2 border-gray-600 px-2 py-1 mb-3 w-full;
    }

    .ch-del {
        @apply text-red-600 border rounded border-red-300 px-2 py-1 m-2 transition-all duration-200;
    }

    .ch-del:hover {
        @apply bg-red-500 text-white border-transparent;
    }

    .ch-label {
        @apply inline-block w-full text-left ml-1;
    }

    .ch > input:focus {
        @apply outline-none;
    }

    #add-challenge {
        @apply text-green-500 border-2 border-green-300 rounded shadow-md shadow-green-100 transition-all duration-200 cursor-pointer;
    }

    #add-challenge:hover {
        @apply bg-green-500 text-white border-transparent;
    }

    .game {
        @apply shadow-amber-100 rounded border-2 border-amber-100;
    }

    #save-game {
        @apply shadow-violet-100 rounded border-2 border-violet-100 transition-all duration-200 cursor-pointer;
    }

    #save-game:hover {
        @apply bg-violet-500 text-white border-transparent;
    }

    .error {
        @apply border-red-500;
    }
</style>
