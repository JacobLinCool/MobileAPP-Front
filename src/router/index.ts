import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: () => import("../pages/Home.vue"),
    },
    {
        path: "/create",
        name: "create",
        component: () => import("../pages/Create.vue"),
    },
    {
        path: "/play",
        name: "play",
        component: () => import("../pages/Play.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
