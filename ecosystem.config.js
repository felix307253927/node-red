const os = require('os')

let cpus = 1
try {
  cpus = os.cpus().length
} catch (e) {
  console.log("get cpus length error", e);
}

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'dialog-ui',
      script: 'red.js',
      cwd: "./",
      exec_mode: "cluster",
      instances: cpus,
      env: {
        // DEBUG: "*",
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        // DEBUG: "*",
        NODE_ENV: 'production'
      },
      "engines": {
        "node": ">=8"
      }
    },
  ],
};