---
title: "Migrate to Hugo"
date: 2020-06-13T16:38:14+08:00
draft: false
tags: 
  - migrate-to-hugo
---

前阵子了解了下[Hugo](https://gohugo.io/)，一直想从hexo转过来，\
直到今天看到这个theme实在没忍住，终于治好了多月以来的拖延症。

---

## How to migrate?
{{< figure src="/img/20200613/cap-steps.png" alt="step" caption="Step-by-step Instructions" >}}

很简单，只要你跟着Hugo官网上的[Step-by-step Instructions](https://gohugo.io/hosting-and-deployment/hosting-on-github/#step-by-step-instructions)，你就会遇到以下天坑。

{{< figure src="/img/20200613/cap-error.png" alt="error" caption="your repository is empty!!" >}}

因为你的库没branch，你的public/也没commit，所以创建submodule失败。\
What you really need to do is
```bash
# deploy to public/
hugo
cd public
git init && git add .
# commit
git commit -m "deploy $(date)"
cd ..
# now you can add submodule, without error
git submodule add -b master github.com/<yourname>/<yourname>.github.io.git public
```

## Why to migrate?
从hexo到hugo其实只是分分钟的事情，\
主要是想treat this migration as a watershed, 转换一下blog的风格。

1. 正经化。之前写blog觉得正经写没啥意思，而且当时作为老二次元和重度b站用户，就整了很多网络用语。但最近看了不少好书，也follow了很多大神级bloggers，现在觉得硬用网络用语是种低级趣味，只能图个乐。所以现在正经化了，真正想学习还是要来看我写的blog。
2. 主题化。之前写的啥leetcode思路啥笔记整理的只能算是水文章，因为没有中心主题。作为读者谁得空没事放着top voted solution不看，来看我的解提思路。所以需要围绕主题来写文章，最好能自成一个系列。
3. 频繁化。希望可以持续输入，持续输出。
4. 国际化。我的意思是English的运用。因为很多信息，用English来传达会更精确，毕竟很多概念都构思自国外大神，原文就是English，硬翻不如引用。 

话说这个[Theme Hermit](https://github.com/Track3/hermit)是真的好看。