---
title: "How to Do Recursive Find and Replace in the Command Line With `sed`"
permalink: /find-and-replace/
---

I get it. It was 2 a.m. and you needed a name for a placeholder variable, but for some reason the only name you could think of was "`dicks`." 

So you typed `public int dicks = 5;`, and kept going and everything was golden...until the next day when you realize that you're a full-grown adult with a paycheck and a degree and you just wrote the word `dicks` in a dozen different files, like a child.

This is never going to pass code review.

The good news: with a simple recursive find and replace operation, you can take all those `dicks` in all those files and turn them into something more socially acceptable like `foobar`. 

The bad news: it's almost impossible to do recursive find and replace in Vim[^1], and you're too proud to use a point-and-click editor.

In moments like this you *couuuuld* just cave and open Sublime and do a simple find and replace in 5 seconds and be done with it...OR you could do it in the *command line*, and use **`sed`** and **`xargs`** because you're a **real** hacker with *self-respect*.

Without further ado, here's how to do it on Mac OSX:

```bash
find . -name "*" -type f -print | xargs sed -i '' -e 's:dicks:foobar:g'
```

On Linux:

```bash
find . -name "*" -type f -print | xargs sed -i'' -e 's:dicks:foobar:g'
```

The above command will replace all occurrences of the string `dicks` with `foobar` in all files starting at your current directory, sanitizing your code for all the world to see. [^2]

**Interesting tidbit:** The Mac and Linux commands are different because there are different, incompatible versions of `sed` out there. Mac uses OpenBSD `sed`, while Linux is all about that GNU `sed` life. [^3]

[^1]: Although with some patience and a plugin or two [it can be done.](https://chrisarcand.com/vims-new-cdo-command/)

[^2]: There are a bunch of other ways to do this according to [this thread on StackOverflow](https://stackoverflow.com/questions/1583219/awk-sed-how-to-do-a-recursive-find-replace-of-a-string) but I tried basically all of them and none of them worked for me.

[^3]: [For more information.](https://unix.stackexchange.com/questions/13711/differences-between-sed-on-mac-osx-and-other-standard-sed)

*Did you like this post? Hate it? Have a topic you'd like me to write about in the future? Tell me what you'd like to see more or less of in the comments below!*
