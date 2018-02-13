import React from 'react'
import Link from 'gatsby-link'
import ReadableSection from '../../../components/ReadableSection'
import AnnotatedImage from '../../../components/AnnotatedImage'
import img_movies_index from './movies-index.jpeg'

const IndexPage = () => (
  <ReadableSection>
    <h1>Muvee</h1>
    <h3>What is it?</h3>
    <p>muvee is something like Netflix, but run on a server from your own home. I created it to be an open source alternative to Plex. It can attempt to reach out to the Internet to find copies of media that you already legally own, but do not yet possess digital backups thereof.</p>
    <p>muvee can control your <a href="http://www2.meethue.com/en-ca/" target="_blank">Philips Hue</a> light bulbs, dimming them when playback starts, and brightening them when playback is paused. There's even rudimentary support for copying hues from frames of playing video for added ambiance.</p>
    <p>muvee reaches out to various metadata providers to enrich your media, downloading descriptions, lists of actors, audience feedback ratings, MPAA ratings, and most importantly, appealing background images.</p>
    <p>You can mark a movie or TV series as a favourite, giving you quick access to it via the side navigation. This is handy for reminding yourself to check up on movies that may not have released yet, or for quickly resuming playback of a series you're currently binge-watching.</p>
    <p>The series index has a shuffle button, which is great for creating an infinite playlist of that specific TV series. <em>The Simpsons</em> lends itself well to this mode. Since all the content is local, you don't have to deal with "Are you still watching?" halting your playback.</p>
    <p>There's built-in discovery of new TV series and movies. muvee consults YTS and EZTV for new items.</p>
    <p>Throughout the app, there are refresh buttons to reanalyze items, pulling down any updates to the metadata and fixing any difficult-to-categorize sources. Ideally, the buttons will be removed and this process will happen automatically.</p>
    <p>My original motivation for creating muvee was that I wanted to view my media on my PS4, which did not support DLNA at the time. Alas, as I've iterated on the styles, I noticed that the PS4 browser can't handle flexbox. So, this is currently unusable on PS4. I've been using it with Chrome from a Mac Mini connected to my TV.</p>
    <h4>Why use this instead of the alternatives?</h4>
    <p><a href="https://popcorntime.io/" target="_blank" title="External link to Popcorn Time, media player and piracy machine">Popcorn Time</a> is a modern marvel, but I believe in bandwidth conservation and caching things that I might use again. You would not believe how many times I've re-watched <a href="https://en.wikipedia.org/wiki/American_Dad!" title="External link to American Dad on Wikipedia" target="_blank"><em>American Dad</em></a>! The last time I checked, Popcorn Time just tossed all video files upon exiting.</p>
    <p><a href="https://plex.tv/" title="External link to Plex media manager" target="_blank">Plex</a> is great software, and has an incredible ecosystem around it. If you want a media manager that just works, I'd recommend you to use Plex.  From my experience, Plex doesn't categorize media as well as muvee. It's also not completely open source.</p>
    <p>I also looked at <a href="http://emby.media/" target="_blank" title="External link to emby media manager">emby</a>, and while nice and open source, it seemed a bit too complicated to really get going. The codebase is also prohibitively large for me to think about trying to tweak things.</p>
    <h4>Technical points of interest</h4>
    <p>I'm using two great libraries, <a href="https://github.com/Shopify/turbograft" target="_blank" title="External link to the TurboGraft project on GitHub">TurboGraft</a> and <a href="https://github.com/Shopify/twine" target="_blank" title="External link to the Twine project on GitHub">Twine</a>, and this has greatly accelerated development.  With them, I can make a website that behaves more like an app, without needing to write a true client-side application. So, at its core, it remains a simple rails project. Thus, this project mostly mirrors the paradigm my colleagues and I developed for the <a href="https://www.shopify.com/" target="_blank" title="External link to the Shopify website">Shopify</a> admin interface.  I'm a firm believer that single-page applications have their place &ndash; when the task at hand is actually building out an application &ndash; but muvee is ultimately just a fancy <a href="https://en.wikipedia.org/wiki/Create,_read,_update_and_delete" target="_blank" title="A link to CRUD on Wikipedia, but I imagine you already know what this is">CRUD</a> website.</p>
    <p>Background workers are heavily employed, as reaching out to all these metadata services is expensive and slow. Media is transcoded with <code>avconv</code> in the background, since browsers can't handle all modern codecs. Transcoding was/is a huge pain in the ass, but thankfully most rippers use <a href="https://en.wikipedia.org/wiki/H.264/MPEG-4_AVC" title="External link to h.264 on Wikipedia" target="_blank">h.264</a> now.</p>
    <h4>Current status</h4>
    <p>I am actively developing muvee, and use it in tandem with my Netflix subscription.  It's gotten to the point where I very rarely have to manually intervene to correct unexpected behaviour. I love it, passionately.</p>

    <AnnotatedImage src={img_movies_index} caption="Movies index page, dynamic tiled layout" />
  </ReadableSection>
);

export default IndexPage
