module.exports = {
    apps: [{
        name: "nodejs-api",
        script: "./build/index.js",
        max_memory_restart: "300M",
        instances: 1,
        exec_mode: "cluster",
        wait_ready: true,
        "listen_timeout": 10000,
        "kill_timeout": 5000,
        // cron_restart: "1 0 * * *",
        "env": {
            "NODE_ENV": "development"
          },
          "env_production" : {
            "NODE_ENV": "production"
          }

    }]
}