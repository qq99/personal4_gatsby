import React from "react";
import Img from "gatsby-image";

import Typography from "../../../components/Typography";
import StandardPage from "../../../components/StandardPage";
import ReadableSection from "../../../components/ReadableSection";
import AnnotatedImage from "../../../components/AnnotatedImage";

const IndexPage = ({ data }) => (
  <StandardPage twoColumn>
    <ReadableSection>
      <AnnotatedImage caption="Movies index page, dynamic tiled layout. Pre CSS grid">
        <Img sizes={ data.moviesIndex.sizes } />
      </AnnotatedImage>
      <Typography.PageTitle>μv (aka muvee)</Typography.PageTitle>
      <p><Typography.Subdued>Feb 2, 2013</Typography.Subdued></p>
      <Typography.Header>The goods</Typography.Header  >
      <ul>
        <li><a href="https://github.com/qq99/muvee" target="_blank" title="muvee on GitHub">Code</a></li>
        <li><a href="https://www.youtube.com/watch?v=1tevKG6u1qM" target="_blank">YouTube video of a recent revision</a></li>
      </ul>
      <Typography.Header>What is it?</Typography.Header>
      <p>muvee is something like Netflix, but run on a server from your own home. I created it to be an open source alternative to Plex. It can attempt to reach out to the Internet to find copies of media that you already legally own, but do not yet possess digital backups thereof.</p>
      <p>muvee can control your <a href="http://www2.meethue.com/en-ca/" target="_blank">Philips Hue</a> light bulbs, dimming them when playback starts, and brightening them when playback is paused. There's even rudimentary support for copying hues from frames of playing video for added ambiance.</p>
      <p>muvee reaches out to various metadata providers to enrich your media, downloading descriptions, lists of actors, audience feedback ratings, MPAA ratings, and most importantly, appealing background images.</p>
      <p>You can mark a movie or TV series as a favourite, giving you quick access to it via the side navigation. This is handy for reminding yourself to check up on movies that may not have released yet, or for quickly resuming playback of a series you're currently binge-watching.</p>
      <p>The series index has a shuffle button, which is great for creating an infinite playlist of that specific TV series. <em>The Simpsons</em> lends itself well to this mode. Since all the content is local, you don't have to deal with "Are you still watching?" halting your playback.</p>
      <p>There's built-in discovery of new TV series and movies. muvee consults YTS and EZTV for new items.</p>
      <p>Throughout the app, there are refresh buttons to reanalyze items, pulling down any updates to the metadata and fixing any difficult-to-categorize sources. Ideally, the buttons will be removed and this process will happen automatically.</p>
      <p>My original motivation for creating muvee was that I wanted to view my media on my PS4, which did not support DLNA at the time. Alas, as I've iterated on the styles, I noticed that the PS4 browser can't handle flexbox. So, this is currently unusable on PS4. I've been using it with Chrome from a Mac Mini connected to my TV.</p>
      <Typography.Header>Why use this instead of the alternatives?</Typography.Header>
      <p><a href="https://popcorntime.io/" target="_blank" title="External link to Popcorn Time, media player and piracy machine">Popcorn Time</a> is a modern marvel, but I believe in bandwidth conservation and caching things that I might use again. You would not believe how many times I've re-watched <a href="https://en.wikipedia.org/wiki/American_Dad!" title="External link to American Dad on Wikipedia" target="_blank"><em>American Dad</em></a>! The last time I checked, Popcorn Time just tossed all video files upon exiting.</p>
      <p><a href="https://plex.tv/" title="External link to Plex media manager" target="_blank">Plex</a> is great software, and has an incredible ecosystem around it. If you want a media manager that just works, I'd recommend you to use Plex.  From my experience, Plex doesn't categorize media as well as muvee. It's also not completely open source.</p>
      <p>I also looked at <a href="http://emby.media/" target="_blank" title="External link to emby media manager">emby</a>, and while nice and open source, it seemed a bit too complicated to really get going. The codebase is also prohibitively large for me to think about trying to tweak things.</p>
      <Typography.Header>Technical points of interest</Typography.Header>
      <p>I'm using two great libraries, <a href="https://github.com/Shopify/turbograft" target="_blank" title="External link to the TurboGraft project on GitHub">TurboGraft</a> and <a href="https://github.com/Shopify/twine" target="_blank" title="External link to the Twine project on GitHub">Twine</a>, and this has greatly accelerated development.  With them, I can make a website that behaves more like an app, without needing to write a true client-side application. So, at its core, it remains a simple rails project. Thus, this project mostly mirrors the paradigm my colleagues and I developed for the <a href="https://www.shopify.com/" target="_blank" title="External link to the Shopify website">Shopify</a> admin interface.  I'm a firm believer that single-page applications have their place &ndash; when the task at hand is actually building out an application &ndash; but muvee is ultimately just a fancy <a href="https://en.wikipedia.org/wiki/Create,_read,_update_and_delete" target="_blank" title="A link to CRUD on Wikipedia, but I imagine you already know what this is">CRUD</a> website.</p>
      <p>Background workers are heavily employed, as reaching out to all these metadata services is expensive and slow. Media is transcoded with <code>avconv</code> in the background, since browsers can't handle all modern codecs. Transcoding was/is a huge pain in the ass, but thankfully most rippers use <a href="https://en.wikipedia.org/wiki/H.264/MPEG-4_AVC" title="External link to h.264 on Wikipedia" target="_blank">h.264</a> now.</p>
      <Typography.Header>Current status</Typography.Header>
      <p>I am actively developing muvee, and use it in tandem with my Netflix subscription.  It's gotten to the point where I very rarely have to manually intervene to correct unexpected behaviour. I love it, passionately.</p>
    </ReadableSection>
    <ReadableSection>
      <AnnotatedImage caption="Detailed movie view page, when movie is sourced">
        <Img sizes={ data.moviesShow.sizes } />
      </AnnotatedImage>
      <AnnotatedImage caption="Hit 't' to quick search from any index">
        <Img sizes={ data.quickSearch.sizes } />
      </AnnotatedImage>
      <AnnotatedImage caption="The player, playing an episode of Rick and Morty">
        <Img sizes={ data.player.sizes } />
      </AnnotatedImage>
      <AnnotatedImage caption="Series index page, poster layout">
        <Img sizes={ data.seriesIndex.sizes } />
      </AnnotatedImage>
      <AnnotatedImage caption="Detailed series page, viewing 2 episodes in detail">
        <Img sizes={ data.seriesShow.sizes } />
      </AnnotatedImage>
    </ReadableSection>
  </StandardPage>
);

export default IndexPage;

export const query = graphql`
query IndexQueryMuvee {
  moviesIndex: imageSharp(id: { regex: "/muvee/img/movies-index.jpeg/" }) {
    ...LabImageFragment
  }
  moviesShow: imageSharp(id: { regex: "/muvee/img/detailed-movies-page.jpeg/" }) {
    ...LabImageFragment
  }
  quickSearch: imageSharp(id: { regex: "/muvee/img/movies-quick-search.jpeg/" }) {
    ...LabImageFragment
  }
  player: imageSharp(id: { regex: "/muvee/img/player.jpeg/" }) {
    ...LabImageFragment
  }
  seriesIndex: imageSharp(id: { regex: "/muvee/img/series-index.jpeg/" }) {
    ...LabImageFragment
  }
  seriesShow: imageSharp(id: { regex: "/muvee/img/series-show-episode-details.jpeg/" }) {
    ...LabImageFragment
  }
}
`;