# WP THEME BUILDER
WordPress theme development environment.

## Quick start
### 1.Install VirtualBox.
[VirtualBox](https://www.virtualbox.org/)

### 2.Install VAGRANT.
[VAGRANT](https://www.vagrantup.com/)

### 3.Install plugin vagrant-hostupdater(optional)
```
$ vagrant plugin install vagrant-hostsupdater
```

### 4.Install Vagrant Box.
```
$ vagrant box add vccw-team/xenial64
```

### 5.Clone this repository
```
$ git clone https://github.com/masatojpn/wpthemebuilder.git
```

or download.
[Download ZIP](https://github.com/masatojpn/wpthemebuilder/archive/master.zip)

### 6.Run vagrant.
```
$ cd wpthemebuilder
$ vagrant up
```

### 7.Install packages.
```
$ npm install
```

### 8.Build theme file.
```
$ npx gulp
```

## Development directory.
`_theme/`

## Usage
If there are any changes in wordpress.sql on remote repository, run the below commands.

```
vagrant ssh
wp db import /vagrant/wordpress.sql
exit
```

If you make any changes in WodrPress DB, run the below commands.
```
vagrant ssh
wp db export /vagrant/wordpress.sql
exit
```

## Feature
- Browser-sync.
- node-sass
- stylelint
- imagemin