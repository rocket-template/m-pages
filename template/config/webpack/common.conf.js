const buildEnv = require('../buildEnv.json');

module.exports = {
    project: buildEnv.project,
    hosts: {
        dev: buildEnv.hosts.dev,
        pre: buildEnv.hosts.pre,
        production: buildEnv.hosts.production
    },
    urls: {
        lcdev: buildEnv.urls.lcdev,
        dev: buildEnv.urls.dev,
        pre: buildEnv.urls.pre,
        production: buildEnv.urls.production
    },
    lcdev: 'http://localhost',
    dev: `http://${buildEnv.hosts.dev}`,
    pre: `http://${buildEnv.hosts.pre}`,
    production: `https://${buildEnv.hosts.production}`,
    publicPath: {
        lcdev: (port)=>`http://localhost:${port}/${buildEnv.project}/dist`,
        dev: ()=>`http://${buildEnv.hosts.dev}/m/${buildEnv.project}/dist`,
        pre: ()=>`http://${buildEnv.hosts.pre}/m/${buildEnv.project}/dist`,
        production: ()=>`https://${buildEnv.hosts.production}/m/${buildEnv.project}/dist`
    }
};
