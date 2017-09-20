# FrontEnd DevTemplate
#### 前端多页开发项目模板

#### 适用范围
  适合页面展现是后端输出的项目，本模板增量更新适合php输出

  **本模板的开发理念：**

  多页开发，页面按page划分模块，整体上在JS、CSS、HTML上拆分成
  公共模块，业务无关组件，业务有关组件，第三方插件，工具等模块，
  每个page使用以上组件或者插件快速拼接，实现高内聚，低耦合
#### 主要功能

1. webpack打包
2. webpack代理不同环境

   * lcdev本地开发
   * dev代理开发环境
   * pre代理预生产环境
   * production代理线上环境

3. 可配置的环境变量和依赖包新版本查看功能
4. 支持单独的页面构建交互，使用ejs、sass、es6进行页面构建
5. 支持增量更新静态资源

#### 目录划分

```
.
├── README.md
├── config
│   ├── bin
│   │   ├── dev.js
│   │   ├── logger.js
│   │   ├── new.js
│   │   ├── prod.js
│   │   ├── remove.js
│   │   ├── utils.js
│   │   └── view.js
│   ├── buildEnv.json
│   ├── hash-map
│   ├── paths.js
│   └── webpack
│       ├── common.conf.js
│       ├── entry.js
│       ├── env.conf.js
│       ├── flame
│       ├── plugin
│       │   └── hash-map.js
│       ├── webpack.base.conf.js
│       ├── webpack.dev.conf.js
│       └── webpack.prod.conf.js
├── package.json
├── src
│   ├── css
│   │   ├── base
│   │   │   ├── _reset.scss
│   │   │   └── public.scss
│   │   ├── components
│   │   │   ├── _app.scss
│   │   │   ├── button.scss
│   │   │   ├── card.scss
│   │   │   ├── confirm.scss
│   │   │   ├── myCardList.scss
│   │   │   ├── pullToRefresh.scss
│   │   │   ├── pullToRefresher.scss
│   │   │   ├── scroll-load.scss
│   │   │   ├── sub-list.scss
│   │   │   ├── toast.scss
│   │   │   └── topTitle.scss
│   │   ├── page
│   │   │   └── index
│   │   │       └── index.scss
│   │   ├── utils
│   │   │   ├── _app.scss
│   │   │   ├── animation.scss
│   │   │   ├── border.scss
│   │   │   ├── coin.scss
│   │   │   ├── font.scss
│   │   │   ├── position.scss
│   │   │   └── shape.scss
│   │   └── widgets
│   ├── fonts
│   │   ├── icomoon.eot
│   │   ├── icomoon.svg
│   │   ├── icomoon.ttf
│   │   ├── icomoon.woff
│   │   └── selection.json
│   ├── imgs
│   └── js
│       ├── common
│       │   └── pullToRefresherExport.js
│       ├── components
│       │   ├── confirm.js
│       │   ├── pullToRefresh.js
│       │   ├── toast.js
│       │   └── updateToast.js
│       ├── io
│       │   ├── fetch.js
│       │   └── pubsub.js
│       ├── page
│       │   └── index
│       │       ├── index.js
│       │       ├── indexTpl.js
│       │       └── last.js
│       ├── plugin
│       │   ├── backTop.js
│       │   ├── dialog
│       │   │   ├── artDialog.js
│       │   │   ├── config.js
│       │   │   └── popup.js
│       │   └── jquery.cookie.js
│       ├── util
│       │   ├── GMPHelper.js
│       │   ├── common.js
│       │   ├── decodeHtml.js
│       │   ├── encodeHtml.js
│       │   ├── event-bus.js
│       │   ├── formatDate.js
│       │   ├── formatKeyword.js
│       │   ├── formatMsToDuration.js
│       │   ├── formatNumber.js
│       │   ├── fromNow.js
│       │   ├── getParamFromUrl.js
│       │   ├── isToday.js
│       │   ├── isWX.js
│       │   ├── leftpad.js
│       │   ├── msToDuration.js
│       │   ├── timeLenFormat.js
│       │   └── vconsole.min.js
│       ├── vendor
│       │   ├── fastclick.js
│       │   └── zepto.js
│       └── widgets
├── tools
│   └── portalServer.js
└── view
    ├── ejs
    │   ├── common
    │   │   ├── card.ejs
    │   │   ├── footer.ejs
    │   │   ├── head.ejs
    │   │   ├── rem.ejs
    │   │   ├── sub-list.ejs
    │   │   └── sub-mian-card.ejs
    │   └── page
    │       └── index
    │           └── index.ejs
    └── html
        └── index
            └── index.html


```

#### 使用方法

    npm run lcdev   本地开发服务
    npm run dev     本地代理dev环境
    npm run pre     本地代理pre环境
    npm run prod    本地代理prod环境
    npm run build   代码构建，运行后选择dev/pre/prod，会生成对应环境的代码和增量更新文件
    npm run sp      拉取flame（增量更新项目）的代码
    npm run publish 提交本地flame代码到remote仓库

    运行npm run lcdev后，可打开以下路径

    本地构建页面地址：
        http://localhost:7576/view/html
    本地Portal服务：
        http://localhost:7577

    flame项目地址，请自行新建一个空项目，设置一个release分支即可，配置到package.json对应的sp和publish命令中


#### 主要技术

1. zepto系列
2. GMP框架，一个极简的MV* 框架，基于jquery/zepto
3. 支持react框架
4. es6
5. sass
