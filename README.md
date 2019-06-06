# WP THEME BUILDER
WordPress theme development environment.

## Quick start
#### 1.Install VirtualBox.
VirtualBox[https://www.virtualbox.org/]

#### 2.Install VAGRANT.
VAGRANT[https://www.vagrantup.com/]

#### 3.Install vagrant plugin and box.
```
$ vagrant plugin install vagrant-hostsupdater
$ vagrant box add vccw-team/xenial64
```

#### 4.Clone or Download.
```
$ git clone https://github.com/masatojpn/wpthemebuilder.git
```
or

Download[https://github.com/masatojpn/wpthemebuilder/archive/master.zip]

#### 5.Run vagrant.
```
$ cd wpthemebuilder
$ vagrant up
```

#### 6.Install packages.
```
$ cd _theme/blanktheme
$ npm install
```

#### 7.Watch and build.
```
$ npm run all
```

## Directory for development.
`/_theme/blanktheme/`

## Deploy

#### 1.Setting Movefile.yml

#### 2.Login VAGRANT SSH
```
$ vagrant ssh
$ cd /vagrant
```

#### 3.Deploy production theme.
```
$ wordmove push -t
```

## Feature
- Browser-sync.
- node-sass
- stylelint
- imagemin


## How to customize for new project.
#### 1.Fixed site.yml on your environment.
```
// site.yml
hostname: vccw.test <--- unique hostname
ip: 192.168.33.10   <--- change last two number.
```

#### 2.Run vagrant.
```
$ vagrant up
```

## How change theme name?
#### 1.Change directory name
`/_themes/****/`

#### 2.Fixed npm script
```
// _themes/****/package.json
"license": "MIT",
"scripts": {
  "clean": "rimraf ../../wordpress/wp-content/themes/customname/**",
  "stylelint": "stylelint --config __stylelintrc.js --syntax scss _scss/** --fix",
  "compile": "node-sass -w --include-path scss ./_scss/main.scss ./assets/css/main.css --output-style expanded",
  "minify": "node-sass -w --include-path scss ./_scss/main.scss ./assets/css/main.min.css --output-style compressed",
  "build": "postcss -w --config __postcss.config.js ./_scss/main.scss -o ./assets/css/main.min.css",
  "babel": "watchify -t babelify ./_js/script.js -o 'uglifyjs -c -m > ./assets/js/bundle.js' -v",
  "imagemin": "node __imagemin.js -w",
  "php": "cpx \"./**/*.php\" ../../wordpress/wp-content/themes/customname/ --watch",
  "css": "cpx  \"./assets/css/main.min.css\" ../../wordpress/wp-content/themes/customname/assets/css/ --watch",
  "themecss": "cpx \"./style.css\" ../../wordpress/wp-content/themes/customname/ --watch",
  "themeimage": "cpx \"./screenshot.png\" ../../wordpress/wp-content/themes/customname/ --watch",
  "js": "cpx \"./assets/js/*.js\" ../../wordpress/wp-content/themes/customname/assets/js/ --watch",
  "images": "cpx \"./assets/images/{*.jpg, *.png, *.svg, *.gif}\" ../../wordpress/wp-content/themes/customname/assets/images/ --watch",
  "serve": "browser-sync --proxy 'http://vccw.test' start --files './*.php, ./assets/**, ../../var/www/wordpress'",
  "all": "npm-run-all -p imagemin images stylelint compile minify build babel php css js themecss themeimage serve"
},
"devDependencies": {
```

#### 3.Run npm script.
```
$ npm run all.
```