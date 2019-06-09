# WP THEME BUILDER
WordPress theme development environment.

## Quick start
#### 1.Install VirtualBox.
[VirtualBox](https://www.virtualbox.org/)

#### 2.Install VAGRANT.
[VAGRANT](https://www.vagrantup.com/)

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

[Download ZIP](https://github.com/masatojpn/wpthemebuilder/archive/master.zip)

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

## Develop directory.
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