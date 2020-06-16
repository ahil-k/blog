---
title: "用VS code在免费remote VM上看K8s源码"
date: 2020-06-14T20:34:30+08:00
draft: false
tags: 
  - kubernetes
  - source-code
  - free
---

不得了了！Digital Ocean搞活动免费送新用户100刀Credit。

{{< figure src="/img/20200614/free-promo.png" alt="free-promo" >}}

之前从[Github Education Pack](https://education.github.com/pack)注册才送了50刀。\
看来「早买早享受，晚买享折扣，不买免费送」也适用在云服务阿。\
希望大佬们帮个忙从[我的referral连接](https://m.do.co/c/ab866ac15ee0)注册，这样你能拿100刀，我也能拿25刀：

{{< figure src="/img/20200614/share-link.png" alt="share-link" width="50%" caption="[我的referral连接](https://m.do.co/c/ab866ac15ee0)" >}}

---

正所谓「收藏从未停止，学习从未开始」，但很多时侯不是不想开始，而是不知道要开始什么，怎么开始。免费送的Credit除了用来科学上网看看世界，好像也没啥其他用途。

其实，只要把remote VM看成隔离的计算资源，你就可以把你所有的设备当成显示器来使用。尤其在看代码时就不需本地搭环境耗费大量RAM了，于是你就有了一个看代码的借口。

这篇文章想分享一下如何用VS code在remote VM上看K8s的源码。

---

## 0. Digital Ocean上建立一个Droplet

注册账户后，需要填信用卡信息，或者使用Paypal，用完免费Credit前都不会收费，但Credit会在2个月后到期，所以不想额外付款就要注意及时destory Droplet(aka Remote VM)。\
现在可以建立一个Droplet：

{{< figure src="/img/20200614/droplet-choices.png" alt="droplet-choices" >}}

因为Credit要2个月内用完，所以推荐40刀或80刀的。而计费方式是「存在就计费，按小时收费」，所以预期3到5天不用就最好destory droplet省费，等要用时再从新建。

{{< figure src="/img/20200614/fast-region.png" alt="fast-region" >}}

地区要选Singapore，比起欧美地区延迟要低的多。这也是「免费试用的Digital Ocean」比起「免费试用的AWS」的优势，后者只能选美国的区。而且「免费试用的AWS」一直都有，大家等2个月后再去免费试用AWS就好，正所谓「白嫖一时爽，一直白嫖一直爽」。

然后有2个细节。
1. 设置连接Droplet的SSH，先跟着这个[Create SSH Keys](https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/create-with-openssh/)，然后跟着这个[Connect to your Droplet with SSH](https://www.digitalocean.com/docs/droplets/how-to/connect-with-ssh/openssh/)。
2. 在Droplet上[Add Swap Space](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-16-04)，建议设成8个G。

---

## 1. VS Code

首先下载Remote - SSH插件：

{{< figure src="/img/20200614/remote-extension.png" alt="remote-extension" caption="Remote - SSH插件" >}}

然后在VS Code连上你的Droplet：

{{< figure src="/img/20200614/ssh-connect.png" alt="ssh-connect" >}}

再于VS Code里的Droplet上装好[Go](https://github.com/golang/vscode-go)、[GitLens](https://github.com/eamodio/vscode-gitlens)等等的插件。

---

## 2. Setup Remote VM环境

首先上[Golang网站](https://golang.org/dl/)上记下最新的Go版本号，然后跟着[这篇](https://www.linode.com/docs/development/go/install-go-on-ubuntu/)下载并设置Go，其中把它里所有“1.12.9”都换成最新的版本号。再然后是下载K8s代码：
```bash
mkdir -p $GOPATH/src/k8s.io
cd $GOPATH/src/k8s.io
git clone https://github.com/kubernetes/kubernetes
cd kubernetes
```
最后跟着[这篇](https://medium.com/analytics-vidhya/the-easy-way-to-get-the-kubernetes-source-code-up-and-running-using-vs-code-and-a-remote-vm-689b0ecb9d0c)里的第3部分“3. Optimising Visual Studio Code”来优化代码环境。这步骤其实很重要，因为K8s代码文件很多，优化完后光是gopls也几乎把8G RAM都耗掉了。

{{< figure src="/img/20200614/gogls-ram.png" alt="gogls-ram" >}}

这也体现了为啥要设Swap Space，不然RAM一耗尽就只能当机了。

---

这里给个从新建环境的流程，可以参考一下：

```sh
## sudo mode
sudo -s
## config swap space
/bin/dd if=/dev/zero of=/var/swap.1 bs=1M count=8192
/sbin/mkswap /var/swap.1
chmod 600 /var/swap.1
/sbin/swapon /var/swap.1
echo "/var/swap.1   swap    swap    defaults        0   0" >> /etc/fstab
free -h
# exit sudo mode
exit

## install go
curl -O https://dl.google.com/go/go1.14.4.linux-amd64.tar.gz
tar -xvf go1.14.4.linux-amd64.tar.gz
sudo chown -R root:root ./go
sudo mv go /usr/local
rm go1.14.4.linux-amd64.tar.gz
echo "" >> ~/.profile
echo "export GOPATH=$HOME/go" >> ~/.profile
echo "export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin" >> ~/.profile
source ~/.profile
go version

## get k8s code
mkdir -p $GOPATH/src/k8s.io
cd $GOPATH/src/k8s.io
git clone https://github.com/kubernetes/kubernetes
cd kubernetes
```

最后节录[文章](https://medium.com/analytics-vidhya/the-easy-way-to-get-the-kubernetes-source-code-up-and-running-using-vs-code-and-a-remote-vm-689b0ecb9d0c)里的结尾，作为本文的结尾：

> From here, where?\
Well, now you have a Kubernetes environment up and running, you can pretty much do anything. :)

比起来到here的方法，想去where的想法或许来的更重要。

---

Inspiration from:
1. [Get Kubernetes source code up and running using VS Code and a remote VM!](https://medium.com/analytics-vidhya/the-easy-way-to-get-the-kubernetes-source-code-up-and-running-using-vs-code-and-a-remote-vm-689b0ecb9d0c)
2. [DigitalOcean](https://www.digitalocean.com/)