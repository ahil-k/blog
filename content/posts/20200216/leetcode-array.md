---
title: leetcode上4道array相关的medium题
date: 2020-02-16T12:32:20+08:00
draft: false
images: 
  - https://picsum.photos/1024/768/?random
tags: 
  - leetcode
  - migrate-to-hugo
---

go 一下 leetcode 上4道 array 相关的 medium 题\
话说中文和 English 之间的 spaces，打着是真的累\
下次所有 English 直接打成カタカナ (#`Д´)ﾉ

---

## Q215 kth largest element in an array
有听过 quick sort 的应该都不想做这道题，因为思路很容易想到，实现却很麻烦，很多细节。
1. 求第 k 大，也就是求第 len(nums) - k 小, 设 k := len(nums) - k
2. quick sort 的步骤:\
选个 pivot, 把 nums 分为 2份,\
1份为 nums[ <= pivot]. 另 1份为 nums[ > pivot]
3. | nums[ <= pivot] | == k, 即 nums[k] 为答案\
| nums[ <= pivot] | < k, 即第 k 大的数在 nums[ > pivot] 内\
| nums[ <= pivot] | > k, 即第 k 大的数在 nums[ <= pivot] 内

最烦是第2步，而且 go 没有 [prefix increment](https://golang.org/doc/faq#inc_dec)，更麻烦了 ¯\\_(ツ)_/¯
```go
// split is a func that splits 
// nums[lo:hi+1] subject to pivot := nums[lo]
// it returns the last idx of nums [ <= pivot ], 
// i.e. the idx of the pivot after the split
func split(nums []int, lo int, hi int) int {
	i, j := lo, hi+1
	for {
		for i < hi {
			i++
			if !(nums[i] < nums[lo]) {
				break
			}
		}
		for lo < j {
			j--
			if !(nums[lo] < nums[j]) {
				break
			}
		}
		if i >= j {
			break
		}
		nums[i], nums[j] = nums[j], nums[i]
	}
	nums[lo], nums[j] = nums[j], nums[lo]
	return j
}

```

---

## Q209 minimum size subarray sum
这道用 2 ptrs 可解。
```go
// sum 不够大就增加 j, sum 够大了就增加 i,
// 要注意每次增加完 i 或 j 都康康能不能 update 一下 min
func minSubArrayLen(s int, nums []int) int {
	min := len(nums) + 1
	sum := 0
	for i, j := 0, 0; i < len(nums); {
		if sum < s && j < len(nums) {
			sum += nums[j]
			j++
		} else {
			sum -= nums[i]
			i++
		}
		if sum >= s && min > j-i {
			min = j - i
		}
	}
	if min == len(nums)+1 {
		return 0
	} else {
		return min
	}
}
```

## Q3 longest substring without repeating characters
同样的 2ptrs, 但当 j 向前走遇到 repeating char 'c' 时,\
i 要跟着向前移动来消去一个'c', 使 j 上的 'c' 不再 repeated.
```go
// 同样的 2ptrs
// 配合上 map 记录 running char sequences 的 index
func lengthOfLongestSubstring(s string) int {
	m := make(map[byte]int)
	l := 0
	for i, j := 0, 0; j < len(s); j++ {
		if previ, seen := m[s[j]]; seen && i <= previ {
			i = previ + 1
		}
		m[s[j]] = j
		if l < j-i+1 {
			l = j - i + 1
		}
	}
	return l
}
```

---

## Q438 find all anagrams in a string
先整个频率表 t, 数下 p 的字符的频率,\
再对每个i, 看 s[i : i+len(p)] 的字符的频率 和 p 的是否相同
```go
func findAnagrams(s string, p string) []int {
	res := make([]int, 0)
	if len(s) < len(p) {
		return res
	}
	const a = int('a')
	var t [26]int
	for i := 0; i < len(p); i++ {
		t[int(p[i])-a] += 1
		t[int(s[i])-a] -= 1
	}
	if isAna(&t) {
		res = append(res, 0)
	}
	for i := len(p); i < len(s); i++ {
		t[int(s[i])-a] -= 1
		t[int(s[i-len(p)])-a] += 1
		if isAna(&t) {
			res = append(res, i-len(p)+1)
		}
	}
	return res
}

func isAna(t *[26]int) bool {
	for i := 0; i < 26; i++ {
		if (*t)[i] != 0 {
			return false
		}
	}
	return true
}

```

---

总体来说，[Q215](#q215-kth-largest-element-in-an-array) 属于有 idea 写不出来那种类型，其他就属于想到就能写好。\
除 [Q215](#q215-kth-largest-element-in-an-array) 外，array 排序相关的题型有 idea 但写不出来还挺多，例如突然需要你写个 min heap 什么的，所以还是得熟悉实现细节。\
复习材料的话推荐

1. [剑指Offer](https://book.douban.com/subject/25910559/)
2. [MisterBooo/LeetCodeAnimation](https://github.com/MisterBooo/LeetCodeAnimation)
3. [算法（第4版）](https://book.douban.com/subject/19952400/)
4. [自引 - playhing/leetcode](https://github.com/playHing/leetcode)