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
## Where to start making sounds?
When I was learning programming, I spent a lot of time on stackoverflow, w3schools, and other code learning websites. Big brain now knows (Mozilla Developer Network)[https://developer.mozilla.org] is _the_ place to start for web technologies.

We'll come back to this later.

---
##Web Audoi API

#### AudioContext
>The AudioContext interface represents an audio-processing graph built from audio modules linked together, each represented by an AudioNode.

For this project it makes sense to create one AudioContext to hold all the parts. The AudioContext extends the BaseAudioContext.

#### AudioNode
>The AudioNode is a generic interface for representing and audio processing module.

These could be `<audio>` source from HTML, gain nodes for volume control, the audio destination (output to speakers), intermediary processing nodes, or audio loaded from an external source.

For our purposes we're fetching the audio file as an `ArrayBuffer` with javascript, and then decoding that into an `AudioBuffer`. 

When we click play, then creating a AudioBufferSourceNode

`Fetch->ArrayBuffer->AudioBuffer->AudioBufferSourceNode`

#### GainNode
This is an AudioNode that controls the Gain or volume of the audio coming through. In the sound machine I'm giving each sound it's own Gain node as well as a main Gain node to pass them through.

#### Destination
Finally we link our nodes to the `Destination`, which in this case is the computer audio. 


## Problems
My initial stab at the sound machine I built relatively quickly in Firefox. I followed some examples from MDN and other sources. I deployed to github pages and was ready to sit back, and blast the TV at bedtime.

Alas, iOS Safari was having none of it.

### Filetype
This one maybe should have been obvious, but Firefox generates .ogg files, which is a free, open container format. While there is relatively broad support for the format, crucially, Safari doesn't support it.
#### Solution
wrapper function to test availability, if not available, serve a .mp3 file.

```
formatFileName(fileName) {
        return fileName + '.' + (new Audio().canPlayType('audio/ogg') !== '' ? 'ogg' : 'mp3')
    }
```

### Click handler
Unrelated to audio, but without a `style="cursor: pointer"` Safair won't recognize a tap as a click.

### Promises, promises
#### The fastest crash-course on JS Promises in the world
A Promise is an object that represents the eventual completion of an asynchronous operation.

I'm not really leaving this in
#### A little slower for the mouth-breathers in the back
A Promise is an object that will eventual resolve to a value, or reject to an error value. You might see them in a "Promise chain."

```
fetch('/my/cool/api')
.then(response => {do something with response; return a Promise to get the resolved value in the next...})
.then(data => etc.)
```

#### decodeAudioData
from the MDN docs:
>The decodeAudioData() method of the BaseAudioContext Interface is used to asynchronously decode audio file data contained in an ArrayBuffer. In this case the ArrayBuffer is loaded from XMLHttpRequest and FileReader.

There's some good hints here that we may be dealing with Promises. And infact, the **Return value** document states "Void, or a Promise object that fulfills with the decodedData."

This is great, and it means I can include the call the decodeAudioData in a promise chain:

```
fetch(this.formatFileName(sound.file))
  .then(res => res.arrayBuffer())
  .then(buffer => audioContext.decodeAudioData(buffer))
```

...but

[link to Apple Webkit docs](https://developer.apple.com/documentation/webkitjs/audiocontext/1632526-decodeaudiodata)

meme about MDN stackoverflow etc.

So Safari does not return a promise from this method, instead relies on optional callback functions passed in as second and third arguments.

This is a problem, since I'm using this Promise chain format to code up the sound machine. Throwing in a callback breaks the nice readable chain. Luckily we can wrap that method in our own method that returns a Promise. Thus the chain is unbroken.

```
promiseDecodeAudioData(arrayBuffer) {
        return new Promise((resolve, reject) => {
            this.audioCtx.decodeAudioData(arrayBuffer, (decodedData) => { resolve(decodedData), (err) => { reject(err) } })
        })
    }
```

### connect
Connecting each of the AudioNodes we've created, is as simple as calling the `connect` method with the next node destination as the argument. Again I was digging around MDN to figure out why this wasn't workin in Safair, when I found this statement:
> In some browsers, older implementations of this interface return undefined.

Thank you Mozilla.

---
## An old lesson from jQuery


To review, this is a simple sound machine, playing prerecorded sounds with minimal volume control. 

---

Working directly with Browsers is hard. When your application grows, it gets harder.

## Are we having fun yet?

---
## Tone.js

