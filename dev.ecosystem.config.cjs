module.exports = {
    apps: [{
        name: "nodejs-api",
        script: "./build/index.js",
        max_memory_restart: "300M",
        watch: ["src", "index.ts", "build"],
        ignore_watch: ["node_modules", "log"],
        "wait_ready": true,
        // cron_restart: "1 0 * * *",
    }]
}