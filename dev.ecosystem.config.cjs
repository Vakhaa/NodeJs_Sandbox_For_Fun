module.exports = {
    apps: [{
        name: "nodejs-api",
        script: "./index.js",
        max_memory_restart: "300M",
        watch: ["src", "index.js"],
        ignore_watch: ["node_modules", "log"],
        // cron_restart: "1 0 * * *",
    }]
}