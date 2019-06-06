# WordPress theme dev tool.

1. Install VirtualBox.
VirtualBox[https://www.virtualbox.org/]

1. Install VAGRANT.
VAGRANT[https://www.vagrantup.com/]

1. Install plugin.
```
$ vagrant plugin install vagrant-hostsupdater
$ vagrant box add vccw-team/xenial64
```

1. Clone or Download this repository.
```
$ git clone wpthemebuilder
```

1. Run vagrant.
```
$ cd wpthemebuilder
$ vagrant up
```

1. Install Package.
```
$ cd _theme/blanktheme
$ npm install
```

1. Build blanktheme.
```
$ npm run all
```

## Deploy
1. Setting Movefile.yml

1. SSH
```
$ vagrant ssh
```

1. Deploy
```
$ cd /vagrant
$ wordmove push -t
```

## Feature
- Use VCCW.
  - Including wordmove.
- Browser-sync.