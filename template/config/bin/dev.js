const path = require('path');
const opn = require('opn');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chokidar = require('chokidar');

const paths = require('../paths');
const config = require('../webpack/common.conf.js');
const env = require('../webpack/env.conf');
const webpackConfig = require('../webpack/webpack.dev.conf.js');
const { renderAll } = require('./view.js');
const hostile = require('hostile');
const portalServer = require('../../tools/portalServer');
const pkgJson = require('../../package.json');

const devServer = ()=>{
    return new Promise((resolve, reject)=> {
        const compiler = webpack(webpackConfig);

        let port = process.argv.length > 3 ? process.argv[3] : 80;

        if (env === 'production') {
            port = 443;
        }
        if (env === 'lcdev' && port === 80) {
            port = pkgJson.rocket.devPort;
        }


        if (env === 'pre' || env === 'production') {
            hostile.remove('127.0.0.1', config['hosts'][env], function (err) {
                if (err) {
                    console.error(err)
                } else {
                    console.log('remove /etc/hosts successfully!')
                    hostile.set('127.0.0.1', config['hosts'][env], function (err) {
                        if (err) {
                            console.error(err)
                        } else {
                            console.log('set /etc/hosts successfully!')
                        }
                    });
                }
            });
            process.on('SIGINT', function () {
                hostile.remove('127.0.0.1', config['hosts'][env], function (err) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('remove /etc/hosts successfully!');
                        process.exit();
                    }
                });
            });
        }

        const server = new WebpackDevServer(compiler, {
            stats: 'none',
            https: env === 'production',
            contentBase: process.cwd(),
            publicPath: config['publicPath'][env](port),
            compress: true, // 开启gzip压缩
            hot: true,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            proxy: {
                '^/{{name}}/dist/**/**': {
                    target: config[env] + ":" + port,
                    secure: false,
                    pathRewrite: function (p, req) {
                        var r = /(.*\/.*)(-.*)(\.(?:js|css))/;
                        var rimg = /(.*\/.*)(\.(?:png|gif|jpe?g))/;
                        if (r.test(p)) {
                            return p.replace(r, function (input, $1, $2, $3) {
                                return $1 + $3;
                            }).replace(/\/{{name}}/, '');
                        } else if (rimg.test(p)) {
                            return p.replace(/\/{{name}}/, '');
                        } else {
                            return p.replace(/\/{{name}}/, '');
                        }
                    }
                },
                '^/CDN*/dist/**/**': {
                    target: config[env], // 'http://js.pre.meixincdn.com'
                    secure: false,
                    pathRewrite: function (p, req) {
                        var r = /(.*\/.*)(-.*)(\.(?:js|css))/;
                        var rimg = /(.*\/.*)(\.(?:png|gif|jpe?g))/;
                        if (r.test(p)) {
                            return p.replace(r, function (input, $1, $2, $3) {
                                return $1 + $3;
                            });
                        } else if (rimg.test(p)) {
                            return p.replace(/\/CDN\d{4,5}/, '');
                        } else {
                            return p.replace(/\/CDN\d{4,5}/, '');
                        }
                    }
                }
            }
        });

        const viewPath = path.join(paths.view, 'ejs');

        if (env === 'lcdev') {
            let ck = chokidar.watch(viewPath);
            ck.on('add', filePath => renderAll()).on('change', filePath => renderAll()).on('unlink', filePath => renderAll());
            renderAll();
        }

        server.listen(port, "0.0.0.0", function () {
            console.log(`Starting server on http://localhost:${port}`);
        });

        resolve();
    })
};

devServer().then(()=>{
    portalServer();
});