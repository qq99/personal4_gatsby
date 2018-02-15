import React from 'react'
import Link from 'gatsby-link'
import StandardPage from '../components/StandardPage'
import ReadableSection from '../components/ReadableSection'

const IndexPage = () => (
  <StandardPage>
    <ReadableSection>
      <h1 className="page-title">Musings, really.</h1>
      <p>I don't want to hear, "philosophy is useless".</p>
      <p>I favour determinism, and that given the initial state and a set of rules, we could compute the entire state history of the universe. This is impossible from within the universe we wish to simulate. That is to say, I believe the universe can be described by a relatively compressed closed form system, whilst our everday happenings are just emergent phenomena of the decompression and computation of the system. I believe this entails there is no such thing as free will, and this brings me peace.</p>
      <p>My ultimate academic goal is to understand myself and my environment. This will be a never ending quest that I very much look forward to. My applied goal is to create a computational intelligence. By this, I think I mean hard Artificial Intelligence. I want to create a machine that actually thinks, rather than gives the appearance of thinking. I think that the term "AI" in popular vernacular doesn't describe this concept well at all.</p>
      <p>Ultimately, my ultimate academic goal is very likely impossible within my lifetime, barring future events drastically increasing my life expectancy. I love the idea of a technological singularity, but fear that it's perhaps an egotistical creation of Humankind. In a way, I look at it as the greatest romance we can bestow upon ourselves. I want to live in a world where I don't feel like I'm constantly struggling in my interactions with computers.</p>
      <p>I'd describe my moral outlook as, "If it isn't hurting anybody, let them do it". I'm a bit of a moral utilitarian in the sense that I'm all for breaking laws if we can accelerate technological progress.</p>
      <h1>Data</h1>
      <p>Data munging is perhaps the biggest waste of time in our field. If we cannot accomplish real computational intelligence, it would at least be nice to have "knowledge engines" come into being. By these, I mean systems that can store facts, types, and relations and make basic inferences and convey the probability of correctness of those inferences. I'd love to work on an ontology based system.</p>
      <p>I'm highly interested in compression and procedurally generated content. I feel like the two go hand-in-hand in a lot of respects. To me, there's something very elegant about being able to compress some information into it's minimum representation. We could store the contents of a signal in its "entirety" discretely (barring resolution issues), but I find it much more amazing to describe it succinctly with mathematics.</p>
      <p>For example, we could list all the points of a line or curve on a certain interval (requiring storage proportional to the size of the interval), or we can use a closed form expression (requiring constant storage independent of the size of interval) to save space at the cost of future computational resources to decompress it. This ties in with procedurally generated content, with which I'm sure the universe is such a system. In this sense, I feel like there's a vague time⇌space tradeoff that can be made: a certain feeling of "equivalent exchange" with regards to computation.</p>
      
      <h1>Distributed Systems</h1>
      <p>I enjoy distributed systems and feel that they are the future of personal computing. I believe information of all kinds should be free (which is oddly at ends with my ideals of privacy), and the added redundancy of information that a global distributed system would add would ensure no government could ever completely censor its citizens. Ideally, web sites should not be stored by just one person but by all the users who visit them.</p>

      <h1>Security and Privacy</h1>
      <p>Security is a huge focus of mine, and I try hard to ensure that the users of my software aren't entering into any malicious clauses nor are they compromising themselves under false pretenses of security.</p>
      <p>How can data freedom coexist with privacy? If we could eliminate greed as a motivator, and ensure peaceful acceptance of others, we wouldn't really have any need for privacy. One would be able to air all kinds of embarassing and terrible moments and emotions if there were no fear of judgment or negative repercussions. I don't think we can accomplish that.</p>
      <p>I feel anonymity will be necessary to further the evolution of our species. I don't think that we should consider only people as beings that holds rights, but instead extend these rights to information themselves. Ideas can certainly seem to come alive, replicate themselves, and infect the minds of others. I think that biological definitions of "life" and "alive" are missing the mark.</p>
    </ReadableSection>
  </StandardPage>
)

export default IndexPage
