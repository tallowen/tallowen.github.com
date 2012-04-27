---
layout: blog
title: Code Quality and Why You Care
---

{{ page.title }}
================

For my final presentation for my internship at Mozilla, I talked about code quality and why you care. It was recorded on [air.mozilla.com][0].

These are some of the lessons I learned from working on Mozillians and some other smaller projects around webdev. Mozillians has some factors that may make it unlike other projects but I think that the lessons are nevertheless important regarless of the situation. Code quality lessons come down to playing nice with other developers who have to deal with your code.

[0]: https://air.mozilla.org/
## Style ##
Concistent style is something I hadn't really learned before this internship. A lot of the code that I had written was for personal projects. It was only read by myself and wasn't often reused or repurposed in other places. Working on a larger team forced me to change my approach.

Things like PEP8, spelling and grammar, and good variable names are important. Reading code that makes somebody think is unessasary. Reading code that is concistent is easier to understand and takes less time to work with.

There is no excuse not to use these tools. Tools like [Sublime Linter][1] and [check.py][2] exist to make it super strait forward to check for issues from the command line or from within your editor.

![latte][3]

Sometimes these principles can be taken to far in code reviews. Fixing Bad variable names or missing apostrophes could be an example. I think a good barometer in these situations is to weigh the hassle of fixing something minor vs. the pain it will cause in the future if left in. Having things be non-standard or non-strait forward causes others non-zero hassle in the future, but this might not outweigh the hassle of makeing a fix in the short term.


[1]: https://github.com/Kronuz/SublimeLinter
[2]: https://github.com/jbalogh/check
[3]: /blog/media/2012-04-26-code-style/late.png

## Refactoring and Code Design ##
##### Abstraction #####
Don't abstract things unless you need to. Abstraction by itself creates indirection and is hard to follow. Abstraction has its place but it comes with a price.

I came into this internship thinking that complicated structures and things broken out into functions was a sign of a programmer who knew what they were doing and that they might somehow be smarter. Coming out of this internship I have new respect for people who are able to code complicated tasks in a simple way.

[Stop Writing Classes][4] is a great talk that succincly goes over how not to use abstraction.

[4]: http://pyvideo.org/video/880/stop-writing-classes

##### Don't Repeat Code #####
This may be seen as a counter point to the previous point. Abstraction (i.e. breaking things out into function calls / classes) can be very useful as a means to avoid repeating ones self.

Avoiding repeating oneself makes it much easier to fix things later and to understand how the same thing is happening in multiple places. However, just because you think you might repeat something in the future does not give you liscense to break it out now.

##### Simplicity #####
Future Owen is dumb. Something I wrote and understand today is not nessasarily understandable to me tomorrow or next week. Just because you can get that clever one liner in there doesn't mean you should. Refactoring your code is worth while in the short term  in order to be able to read it easily and more effeciently in the long run.

##### No Future Code #####
If I think I need something next month, I'm probably wrong. What the future holds is a mystery and mystifying my code in the short term to cause benifits in the long term is hardly ever worthwhile.

Adding future code that isn't quite complete puts the code in a state where not everything is being used. This is a state of code that is harder to read. Even if you come back in the future to add back a feature it can be difficult to understand what you were trying to do the last time around.

![latte][5]

[5]: /blog/media/2012-04-26-code-style/brilliant.jpg

## Test Code ##
##### Test With a Purpose #####
Tests without a purpose are hard to follow and hard to understand. It should be clear by reading a test exactly what the initial contitions are, what features are being tested, and what possible failures are being tested for.

##### Fail Obviously #####
When a test fails, somebody needs to figure out why. Do a favour to future you or a coworker and make thier lives easier. Write tests that have intelegent test flow that and are intuitive.

##### Test Code is Real Code #####
All of the other code quality rules apply. Just because you don't ship test code doesn't mean you don't maintain it or refactor it. Espcecially when tests fail, you will need to look at test code again and grok what is going on.

## Readability Counts ##
We spend more time reading code trying to figure out how to do what we want to do than writing it. Spending extra time on the front end when writing code pays off in the long run when you have to read that code over and over again. This is especially when you work on a team with other people.

I learned quickly on this internship that I would not be the only one interacting with my code. In order to be a good team member, I needed to spend more time making my code easier to be read by others.

## Ducati: ##
![latte][6]

[6]: /blog/media/2012-04-26-code-style/ducati.jpg




