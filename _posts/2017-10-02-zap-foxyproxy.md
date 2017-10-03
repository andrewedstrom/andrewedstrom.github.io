---
title: "How to Set Up OWASP ZAP and FoxyProxy to Start Capturing and Modifying Web Traffic"
permalink: /zap-foxyproxy/
---

As I've discussed in [a previous post](2017-09-11-hacksplaining.md), I believe that developers have a moral obligation to understand security in order to protect the people who use our products, and as such I'm trying to learn as much about the topic as I can.

In the last week, I've learned about an important item in the hacker's toolbox: the http proxy. An http proxy is an application that sits between your browser and the web server, something like this:

```
browser <---> http proxy <---> server
```

Why is this useful? Well, setting up an http proxy allows you to capture all of the packets coming from the server so that you can dissect them later, looking for ways in which the server might be vulnerable. It also lets you modify outgoing packets in order to execute attacks.

If you've never set up an http proxy before, it can be a little confusing. In this post I will walk you through the process. We will use [OWASP Zed Attack Proxy (ZAP)](https://www.owasp.org/index.php/OWASP_Zed_Attack_Proxy_Project) as our http proxy and connect it to our browser with the [FoxyProxy](https://getfoxyproxy.org/) extension. My guide will center around Mac OS X and Chrome because that's what I happen to use myself. 

Throughout this guide you will be prompted to enter your password a lot. This is expected. Whenever prompted, simply enter your password and proceed.

## Installing and setting up ZAP

You will need Java 7+ in order to run ZAP, which you can download and install [here.](https://java.com/en/download/)

Once you have installed the latest Java, go to [the official ZAP download page](https://github.com/zaproxy/zaproxy/wiki/Downloads) and download the latest version of ZAP for your operating system. Once the download completes, run the installer and open ZAP. You should be greeted with a page that looks like this, asking if you want to persist the ZAP Session:

![zap1]({{ site.url }}{{ site.baseurl }}/assets/images/zap1.jpg)

Select no for the time being (as we're just trying to set the app and poke around) and hit "Start".

Now that you have successfully installed ZAP, let's go ahead and configure it to act as a proxy for our local web traffic. In the system menu bar, click **ZAP > Preferences** to open the options menu. From there, select on **Local Proxy** and enter `127.0.0.1` as the address and `8080` as the port.

![zap2]({{ site.url }}{{ site.baseurl }}/assets/images/zap2.jpg)

This configures ZAP to run locally at `https://127.0.0.1:8080`. 

## Add the ZAP certificate to your system's trusted certificates

Next, we need to tell our system to trust messages forwarded to us by the ZAP proxy so that we will be able to visit urls that start with `https://`. To do this, we need to give the Operating System the ZAP proxy's certificate. 

Without leaving the Options menu, click **Dynamic SSL Certificates** on the sidebar, then click `Save`. Put the `owasp_zap_root_ca.cer` certificate file somewhere where you will remember it. I chose to put it in `~/workspace/zap/` but anywhere is fine. Once this is done, click `OK` to close the Options menu.

Now, use Spotlight to open the Keychain Access system utility. It should look something like this:

![zap-keychain-access]({{ site.url }}{{ site.baseurl }}/assets/images/zap-keychain-access.jpg)

In the **Keychains** sidebar, select **System.** In the **Category** sidebar, select **Certificates**

Now we're ready to actually import the certificate, click **File > Import Items** and go select the `.cer` file you saved earlier. It should appear in your list of certificates with a little red x on it indicating it is still not trusted.

![zap-untrusted]({{ site.url }}{{ site.baseurl }}/assets/images/zap-untrusted.jpg)

Double click the certificate and in the **Trust** menu that appears, change the **Secure Sockets Layer (SSL)** setting to **Always Trust**.

![zap-trust]({{ site.url }}{{ site.baseurl }}/assets/images/zap-trust.jpg)

Close this menu and you should see that the little red x has turned into a blue cross, indicating that the certificate now has custom trust settings.

![zap-custom-trust]({{ site.url }}{{ site.baseurl }}/assets/images/zap-custom-trust.jpg)

## Install the FoxyProxy extension and configure it to point to your ZAP proxy 

Install the FoxyProxy extension on [Chrome](https://chrome.google.com/webstore/detail/foxyproxy-standard/gcknhkkoolaabfmlnjonogaaifnjlfnp?hl=en) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/foxyproxy-standard/). All of the following instructions will be for Chrome users but Firefox users should be able to do basically the same thing.

FoxyProxy allows you to choose which websites you want to access through the proxy. Going through a proxy will noticeably slow down network requests, so you probably only want to pass traffic to the sites you're analyzing through it. However, if you do want to go through the proxy for all sites you visit, FoxyProxy allows you to configure that as well.

Click the FoxyProxy icon in your menu bar and choose **Options.** This will take you to a screen where you can configure your proxies.

![foxyproxy1]({{ site.url }}{{ site.baseurl }}/assets/images/foxyproxy1.jpg)

Now we're going to tell FoxyProxy how to talk to the ZAP Proxy server we set up previously. Select **Add New Proxy.** Now, under **Proxy Details**, select **Manual Proxy Configuration** and enter `127.0.0.1` as the **Host or IP Address** and `8080` as the **Port.**

![foxyproxy2]({{ site.url }}{{ site.baseurl }}/assets/images/foxyproxy2.jpg)

Next, we want to tell the extension what sites we want to send through the proxy. Click **URL Patterns** on the top bar and then select **Add new pattern.** Give your pattern a name and enter the wildcard pattern for one of the sites you want to analyze. For example, if I wanted to send all traffic to and from Google through the proxy, this is what I would enter:

![foxyproxy3]({{ site.url }}{{ site.baseurl }}/assets/images/foxyproxy3.jpg).

Feel free to add more patterns if you have multiple sites you want to analyze. It may be wise to just do this for one site at first and then test out whether its working.

Finally, if you want to you can click the **General** tab up top and give this proxy a name. When you're done, hit **Save.**

![foxyproxy4]({{ site.url }}{{ site.baseurl }}/assets/images/foxyproxy4.jpg).

Now, activate your new proxy rules by clicking the FoxyProxy icon in the Chrome menu and choosing **Use proxies based on their pre-defined patterns and priorities.**

![foxyproxy5]({{ site.url }}{{ site.baseurl }}/assets/images/foxyproxy5.jpg).

If everything went according to plan, your traffic should now be routed through your proxy on the way to your browser. You can test this out by navigating to the site you told FoxyProxy to send through the browser. Once the page loads, go back to the ZAP window. If everything worked, all of the requests and responses made in order to load the page should show up in the **History** section.

![zap-done]({{ site.url }}{{ site.baseurl }}/assets/images/zap-done.jpg).

Now you can use ZAP to your heart's content to analyze and pen test your site! Once you are done, simply close the ZAP app and click **Disable FoxyProxy** in the FoxyProxy extension settings

![foxyproxy6]({{ site.url }}{{ site.baseurl }}/assets/images/foxyproxy6.jpg).

**Note:** DO NOT use this to attack sites that you haven't been expressly given permission to attack.


*Did you like this post? Hate it? Have a topic you'd like me to write about in the future? Tell me what you'd like to see more or less of in the comments below!*
