---
layout: blog
title: A better deploy strategy
---

{{ page.title }}
================

At Pinterest we like to deploy as often as possible. We want to increase the frequency with which we do deploys but we realize that every deploy impacts our users with intermittant 500 errors.

Our Setup
---------

Pinterest has a fleet of appservers that run our front end django app. Each appserver runs python about 40 processes in tornado WSGI containers on about 40 different ports. Each appserver has an nginx instance in front of the tornados. It is configured something like this:


{% highlight python %}
upstream app_servers {
  fair;
  server localhost:8000 max_fails=1 fail_timeout=0s;
  server localhost:8001 max_fails=1 fail_timeout=0s;
  server localhost:8002 max_fails=1 fail_timeout=0s;
  server localhost:8003 max_fails=1 fail_timeout=0s;
}

server {
  listen 80;
  server_name pinterest.com;
  location / {
    proxy_pass http://app_servers;
    include /etc/nginx/proxy.conf;
  }
}
{% endhighlight %}

The pool of python processes is defined by the nginx upstream module. We use the [fair][1] module to distribute load with preference to least busy, known to be up servers.

The Old Way
-----------

Our old deploy system was to kill processes and allow [Supervisord][3] to restart them. This automatically loaded the new version of our code. This had the advantage of being fast (about 3 seconds) as well as being very simple. Unfortunately, this had the issue of killing all inprocess requests and giving those users 500 errors. New processes that were restarted were 'cold' i.e. nothing was internally cached (jinja templates, py files). To deploy more frequently we would need to come up with a way to avoid giving users 500s and avoid giving them cold processes.

The New Way
-----------

Our solution is to restart processes a handful at a time. For each process we take the following steps:

### Disabling the Process
We use iptables to redirect traffic to a known unused port on the app server. Nginx immediately recognizes that there is no longer a process listening on that port and distributes the traffic to alive ports instead. We did this the following command:

```
iptables -t nat -I OUTPUT --src 0/0 --dst 127.0.0.1 -p tcp --dport {tornado_port} -j REDIRECT --to-ports 9
```

In english this command means "At the nat level, redirect traffic from anywhere destined for localhost on port {tornado_port} to [port 9 (the disable port)](http://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports)"

### Restart the Process

The first step is to wait for traffic to finish. This means waiting about a second. In practice we wait 5 seconds to be sure that all traffic has completed. Even though traffic is redirected away from this port in the previous step, requests can be completed as normal.

After the wait period, the process is killed and we wait for it to be restarted by [Supervisord][3].

### Warm Up the Process

To warm up the process we make a handful of http requests to the newly restarted port. We do this by using `127.0.0.2:{port_number}` to avoid being hit by our iptables rules. By default in ubuntu the loopback interfaces is configured to respond to `127.0.0.0` through `127.255.255.255` but our iptables rules only apply to the address that ngnix is using.

We are trying to accomplish the following goals when warming up our processes:

- Parse/compile/load into memory our most commonly used py files.
- Cache our jinja templates. Rendering jinja templates is much slower the first time than subsequent times.

Why not cache everything? Because caching everything would lead to much higher memory usage on our app servers allowing us to serve fewer python processes per box.

### Re-enable Ports

To re-enable ports we just clear the iptable rule.

### Results

Our own internal metrics show very little user impact on a successful deploy. Users keep using Pinterest as normal through the deploy process. This has allowed us to do faster, more frequent deploys to our app servers.




[1]: http://wiki.nginx.org/HttpUpstreamFairModule
[2]: http://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports
[3]: http://supervisord.org/


