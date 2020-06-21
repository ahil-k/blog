---
title: "Jenkins in 30s"
date: 2020-06-21T19:56:45+08:00
draft: false
tags: 
  - course
  - free
  - devops
---

这篇文章记录了在edx上由Linux Foundation提供的[Intro to Jenkins](https://www.edx.org/course/introduction-to-jenkins)课程的内容。

如果你跟我一样只是audit的话，你将会体验到什么是比学校里最水的水课还要水的水课。所有有价值的内容都收费观看，反白嫖机制拉满。

{{< figure src="/img/20200621/upgrade-to-unlock.png" alt="upgrade-to-unlock" >}}

> Linux 基金會是一家非营利性技术贸易协会，致力于促进，保护和推进Linux和协同开发，并支持“历史上最大的共享技术资源" --- Wiki

不愧是你，Linux Foundation。

---

## Overview
Anyway, 我们先来看一下课表：

{{< figure src="/img/20200621/content-list.png" alt="content-list" >}}

嗯，好像还行？ Chapter 1 确实还行，它成功让我决定跟进这门课程。到了第2天，先是花了30秒看完了手把手教你在 Linux, Windows, Mac 等各环境上安装Jenkins的第2章。然后看第3章简单介绍 Jenkin 界面上的按钮，第4章告诉你可以装很多 plugins。第5章介绍一些按了会安全一些的按钮。第6-9章介绍了有关 Job 的按钮 (下面会讲啥是Job)。第10章告诉你可以去贡献 Jenkins 代码，或是试着用一些好用的 plugins (好用你不教)，或是试着用 LDAP 等更安全的设置 (安全你不教)。总结就是，讲了个寂寞。

## Content
不寂寞的第1章的总结：

According to Martin Fowler,
>"Continuous Integration (CI) is a software development practice where members of a team integrate their work frequently; usually each person integrates at least daily - leading to multiple integrations per day. Each integration is verified by an automated build (including test) to detect integration errors as quickly as possible".

According to Martin Fowler again, who coined the term Continuous Delivery,
>"Continuous Delivery is a software development discipline where you build software in such a way that the software can be released to production at any time. 

CD can be referred to **Continuous Delivery** or **Continuous Deployment**, they are slightly different although we usually use them interchangeably.

{{< figure src="/img/20200621/delivery-vs-deployment.png" alt="delivery-vs-deployment" caption="delivery(产品预备全自动+上线手动) vs deployment(产品上线全自动)" >}}

The **deployment pipeline** run starts with a developer committing source code change into a version control repository. The CI server detects the new commit, compiles the code, and runs unit tests. The next stage is deploying the artifacts (files generated from a build) to staging or a feature test environment where you run additional functional, regression, and acceptance tests. Once all the tests are successful, you are ready to deploy into production. In case of failure during any stage, the workflow stops and an immediate feedback is sent back to the developer.

{{< figure src="/img/20200621/basic-deployment-pipeline.png" alt="basic-deployment-pipeline" >}}

寂寞的第6-9章的总结：

A **Jenkins job** is a sequential set of tasks that are defined by a user. Typical steps include retrieving the latest source code from version control (better by [Webhooks](https://developer.github.com/webhooks/creating/)), compiling it, running unit tests, building and storing the artifacts, and notifying the end users of the outcome of the build (e.g. email notification).

就这？