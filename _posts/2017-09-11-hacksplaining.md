---
title: "hacksplaining.com: A Great Place To Start Learning About Security"
permalink: /hacksplaining/
---

# We Are All "Security Engineers"

It feels like every time I go online, I hear about another major corporation getting hacked. Just this week, news broke that Equifax, one of the three largest credit reporting agencies in America, [was hacked](https://www.cnet.com/how-to/equifax-data-breach-find-out-if-you-were-one-of-143-million-hacked/), giving attackers access to the names, birth dates, social security numbers, addresses, and other personal information of 143 million Americans. In the wake of this breach Equifax faces a [multibillion dollar lawsuit](https://www.bloomberg.com/news/articles/2017-09-08/equifax-sued-over-massive-hack-in-multibillion-dollar-lawsuit), a fate which probably could have been avoided if the company had decided to take technological security more seriously.

This is just one of many major hacks that have occurred in recent months. If we can learn one thing from all this mess, it's that there are *a lot* of software developers working at major companies who don't know the first thing about keeping applications secure.

Any developer who is making software that handles sensitive information has a responsibility to keep that information safe. And essentially all of us fall into that category. **Here's a simple heuristic: if you are making a service that has a login button on it somewhere, you have a moral obligation to learn enough about security to keep your users safe.**

# Where To Start Learning About Security

I am still a beginner when it comes to security. This bothers me, and I'm trying to correct it.

As someone who doesn't know much about security, the field seems big and scary and nebulous. I wasn't sure where to start, so I asked a [coworker who knows an absurd amount about security](https://www.josephkirwin.com/) what he recommends to beginners hoping to get into the field. He gave me two pieces of advice:

1. Learn about a wide range of attacks before you start deep-diving into the attacks that interest you most. You only need one hole in your defenses in order for someone malicious to break in and start doing bad things. With a basic understanding of all the kinds of attacks that are out there, you can start to develop an instinct for whether the code you're working on at any given moment might be vulnerable to some kind of known attack.
2. Use [hacksplaining.com](https://www.hacksplaining.com) to start developing this breadth of knowledge. Hacksplaining is a totally free course that covers a wide range of potential attacks.

In the month or so since his recommendation, I have worked through the majority of the course, and I have to say it has been a very positive experience. The lessons are fun and informative, and now that I have completed them I feel that I have a much better understanding of the basic ways in which websites can be attacked and how these attacks can be prevented. I highly recommend that anyone interested in security (which should be basically everyone) [check out this free course.](https://www.hacksplaining.com)

# 3 Things I Learned About Security From hacksplaining.com

## 1. Never, ever trust user input

A large percentage of attacks on websites target the areas where users type stuff and upload things.

...If you have a form hooked up to a database, such as a login box, hackers may be able to use SQL injections to bestow awesome powers upon themselves. By entering SQL statements into the input box, they can do things such as login without a password, find the usernames and passwords of all your users, run arbitrary commands in your database, and possibly even inject malicious code onto your site. (I highly recommend [this video by Computerphile](https://youtu.be/ciNHn38EyRc) for anyone who wants to learn more about SQL Injections.)

...If you allow users to enter comments or otherwise modify a page of a website, they might be able to add arbitrary javascript that will execute every time someone goes to that page. This is called Cross Site Scripting (XSS)

Even something as benign as letting someone upload their own profile picture can prove devastating, as eBay experienced when hackers [uploaded malicious code disguised as images,](https://threatpost.com/ebay-fixes-file-upload-and-patch-disclosure-bugs/111898/) allowing them execute that code on other users' machines.

There are many more examples like this. In all of these cases, the solution is to *sanitize* the input. Sanitizing means making sure the text entered by users will only be treated as text, and the images uploaded by users will only be treated as images. You really, really don't want other people being able to execute code on your website.

*Relevant hacksplaining modules: SQL Injections, XSS, Command Execution, Directory Traversal, File Upload Vulnerabilities.*

## 2. Some attacks work by giving victims a URL to a legitimate site

There are several scary attacks that rely on nothing more than suckering someone into clicking a carefully constructed link to a legitimate website. Since the user knows they can trust that legitimate site, they assume that any link to it will be safe, click it, and soon find themselves hopelessly haxed. A few examples:

...If you have a page on your website that automatically redirects to a different site (something we call an "Open Redirect"), then watch out. Hackers might be able to construct a URL that goes to a your site and then immediately redirects to a malicious site.

...If you have a part of your website that displays content passed into the URL (something that is very common practice), then hackers might be able to enter malicious javascript code into the URL and have it execute when the page loads. This is called a Reflected XSS attack.

Once again, the solution to these problems is generally that you need to sanitize your input. Don't let people enter dangerous things in URLS. In the case of redirects, a good solution is to only perform the redirect if the destination site is on a whitelist of pre-approved sites.

*Relevant hacksplaining modules: Open Redirects, Cross-Site Request Forgery, Reflected XSS*

## 3. The best password is no password

It's unbelievably difficult to handle user login and storing passwords correctly, so if you can avoid handling it and just let users log in with Facebook, Google, or GitHub, you'll probably be much better off. Let a larger company with better resources and more experience handle your logins.

If you are in the unlucky position of needing to store your own passwords, then you need to stop everything you're doing and go learn about hashing, the security of different hash functions, salted hashes, and rainbow tables. [This video gives a good high level overview of the difficulty of storing passwords.](https://youtu.be/8ZtInClXe1Q)

tl;dr: DO NOT STORE PASSWORDS IN PLAINTEXT. You must hash them. This is **really** important. Furthermore, if you are hashing them with a poor algorithm like SHA1 or MD5, that's almost as bad as plaintext, as [weakly-hashed passwords can often be cracked in under a second.](https://youtu.be/7U-RbOKanYs) And even if you hash them well, you need to add what's called a "salt" so that your hashed passwords can't be cracked with a precalculated lookup table called a "rainbow table" in the case that your database is compromised.

If you're storing passwords and you did not understand that last paragraph, PLEASE go research everything you didn't understand. Do it right now. I can't overstress how high the stakes are here.

On top of everything I've mentioned so far, there are lots of other problems that can come up if you're handling user logins yourself. For instance, it's really easy to accidentally reveal information about your database and users based on error messages. Something as negligible as the amount of time it takes for an error message to appear after a failed login can be used by hackers to gain a complete list of all your users, making it much easier for them to break into accounts. There are many ways to leak little pieces of information that malicious actors will use to find chinks in your armor, and all of them need to be considered.

By the way, don't get me started on password resets; just trust me that they open up a whole new world of pain, and they're almost impossible to get right.

Basically, passwords and logins are hard and you should not do them unless you really, really have to. The security experts behind hacksplaining recognized this, which is why the only way to log in to hacksplaining.com is with an external service like Google or Facebook. If these security gurus aren't comfortable storing passwords themselves, mere mortals like ourselves should be very hesitant to try to do the same.

*Relevant hacksplaining modules: User Enumeration, Information Leakage, Password Mismanagement*

# Conclusion

This is only a small sample of the things I have learned from [hacksplaining](https://www.hacksplaining.com). It is a great series of lessons that goes by really quick, and a very good resource for anyone interested in learning a little more about security.

*Did you like this post? Hate it? Have a topic you'd like me to write about in the future? Tell me what you'd like to see more or less of in the comments below!*
