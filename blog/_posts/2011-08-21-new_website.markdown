---
layout: blog
title: A New Website
---

{{page.title}}
==============

Although it looks pretty much the same, this website is running on a completely different
backend than what I had before. After having a website that pretty much did change for
a year, I realised I wanted needed something different. These are the criteria that I came
up with:

- **Simple Solution:** I didn't want a heavy handed solution like wordpress or drupal for
a blog and website. The content is static enough that I didn't feel like I needed a multi-layered
stack.
- **Version Control Integration:** I make spelling mistakes; I make typos. I wanted a system
that allows me to run a command like `git push origin` and forget about any ssh-ing or
other steps.
- **Easy migration of backends** Sometimes a hosting site goes down or they raise their prices.
I wanted a solution that allowed me to easily set my system up on a new host.
- **DRY** I hate repeating myself. It's all to easy to easy to do this in many frameworks.


I ended up finding that [jekyll][1] accomplished all the goals I was looking for. It already
works with [github pages][2]. All I have to do is push my code to github and I'm done. Jekyll
is written in Ruby and even though I don't have experience with the language I had no problem
gem installing the package.

Jekyll allows the user to write a blogging platform however they want. It allows you to define
base layouts and extend those by rendering more HTML, textile or markdown. All of this is defined
by the [liquid templating engine][3] which is not to different than [jinja][4], coming from
python land.

Hopefully the ability to easily write blog posts and update my website in the future. If
you are curious about the implementation details, check out the repository on [github][5].

[1]: https://github.com/mojombo/jekyll
[2]: http://pages.github.com/
[3]: https://github.com/Shopify/liquid
[4]: http://jinja.pocoo.org/
[5]: https://github.com/highriseo/highriseo.github.com