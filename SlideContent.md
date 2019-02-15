#Exploring the Web Audio API and frameworks

The goal of this talk is to demonstrate some basics of the Web Audio API, explore why we use frameworks, and talk a little about what makes web development hard. (Hint: it's the browsers.)

---
A little about me: I'm work at a company that makes SAAS applications targeted to non-profits, and specifically small independant schools. My wife and I live in a small appartment with two kids. We've kind of our grown the apartment and as such we have adapted some stratedgies to deal with the challenges of close living. 

Our kids' bedroom is directly off the living/dining room. So when they're going to bed we have to consious about making too much noise. One of the things we use is a sound machine. Recently our sound machine broke, and while I know there are a thousand sound machines apps available online or in the app store, why not build my own. Afterall, I follow the afforism: 

> ### why get something for free, when you can waste time building it yourself?

---
### Quick Stop: native app versus web app.
Why not a native app? 

The first answer to this quesiton, is that I'm a web developer, not an app developer. But since part of the goal of this project is pretty clearly playing and learning, why not build an iOS or Android app. There are hundreds if not thousands of app in either app store when you search for "sound machine," so there must be something good there. While I can clearly see a number of areas where a native app is superior to a web app, I can write this app in one place, put it on Github pages, and use it on a phone, an iPad or a laptop almost immediately. That kind of responsiveness is untouched by any app store.

---
### Where to start making sounds?
When I was learning programming, I spent a lot of time on stackoverflow, w3schools, and other code learning websites. Big brain now knows (Mozilla Developer Network)[https://developer.mozilla.org] is _the_ place to start for web technologies.

We'll come back to this later.

---
### Web Audoi API
- Audio Context
- Audio Nodes
- Output
- Source
- Graph