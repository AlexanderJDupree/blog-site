---
title: "Writing A Unix Shell in Haskell - 0"
categories:
    - Blog 
    - Guide
    - Tutorial
    - Projects
header:
    teaser: /assets/images/teaser2.jpg
tags:
    - haskell
    - unix
    - linux
    - functional
---

I've been reading the book [Real World Haskell](http://book.realworldhaskell.org/) for a few weeks now and have been following along with the exercises in an attempt to learn functional programming (FP) and the Haskell language. Functional programming, and Haskell, has been of interest to me ever since I've heard of the concept, the mathematical nature of FP really appealed to me. On the surface, functional programming can be very intimidating, with vocabularly like monads, monoids, functors, and algebraic data types, it's easy to feel overwhelmed. However, I've found the experience to be more accessible than I originally thought. A lot of functional concepts are natural extensions of clean code paradigms, as such, practicing FP is mostly an exercise in cleaning up your code. I'm still an initiate to Haskell and FP, however, I've found the experience to be very rewarding and if you're thinking about learning FP as well, I encourage you to follow this blog and undertake this journey with me. 

Over the next few weeks I will be implementing a basic Unix Shell in Haskell. I've found that the best way to learn something is to just dive right in. As such, this project is designed to surround myself with the Haskell ecosystem and learn the in/outs of managing and building a Haskell project. But why choose a Unix shell as my first project? A Unix shell provides some interesting learning opportunites. A proper shell will have to manage IO, concurrency, implement signal handlers and a variety of other features. As such, a Unix shell provides a high-level of challenge while providing multiple problems to solve. This complexity appealed to me, so I will be documenting my successes, failures, and lessons learned throughout this project.

### What is a Unix Shell?

Other sources can probably explain it much better than I can, but here is a pretty succint quote from Wikipedia:

> A Unix shell is a command-line interpreter or shell that provides a command line user interface for Unix-like operating systems

In essence, a shell is the users interface for the operating system proper. 

### Project Goals

The first step in writing a shell is deciding how far down the rabbit hole I want to go. So here are the features and functionality I plan on implementing. 
    
* Shell initialization with a configuration file
* Environment variable expansion
* Command piping
* IO redirection
* wildcard (glob) expansions
* Built-in utilities (cd, kill, etc.)
* Command history
* Job control

These will be the priority features for the project. If I have the time, and ability I would also like to add the following extra features. 

* Tab autocomplete
* Fuzzy file search. 
* Modal editing (Vim)
* Shell scripting in Haskell

Of course, all of this is subject to change throughout the project. If you have any feature suggestions or general guidance for this project, please share them in the comments below!

<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-8670667935520247",
    enable_page_level_ads: true
  });
</script>

