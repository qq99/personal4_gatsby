import React from "react";
import Img from "gatsby-image";

import Typography from "../../../components/Typography";
import StandardPage from "../../../components/StandardPage";
import ReadableSection from "../../../components/ReadableSection";
import AnnotatedImage from "../../../components/AnnotatedImage";

const IndexPage = ({ data }) => (
  <StandardPage>
    <ReadableSection>
      <Typography.PageTitle>echoplexus</Typography.PageTitle>
      <p>
        <Typography.Subdued>Mar 18, 2016</Typography.Subdued>
      </p>
      <AnnotatedImage caption="echoplexus running as a Firefox App on Ubuntu">
        <Img sizes={data.echoplexusLatest.sizes} />
      </AnnotatedImage>
      <Typography.Header>The goods</Typography.Header>
      <ul>
        <li>
          <a
            href="https://github.com/qq99/echoplexus"
            target="_blank"
            title="External link to the echoplexus project on github"
          >
            Code
          </a>
        </li>
        <li>
          <a
            href="https://web.archive.org/web/20161217201426/https://echoplex.us/"
            target="_blank"
            title="External link to echoplex.us, courtesy of archive.org"
          >
            Official Website (down now, archive.org)
          </a>
        </li>
      </ul>
      <Typography.Header>What is it?</Typography.Header>
      <p>
        Echoplexus was an anonymous, web-based, IRC-like chatting platform that
        made its best effort to respect your privacy. Here's a list of some of
        the features:
      </p>
      <ul>
        <li>create and manage public or private channels</li>
        <li>encrypt your chats with a shared secret or PGP</li>
        <li>secure a pseudonym for linkable anonymity</li>
        <li>code (JS) and draw together in real time</li>
        <li>
          make free and secure Peer2Peer video and voice calls with the people
          in your channel using WebRTC
        </li>
      </ul>
      <Typography.Header>Current status</Typography.Header>
      <p>echoplex.us is dead. Now, a spammer owns the domain :/</p>
      <p>
        The userbase / interest just wasn't there for it to be worthwhile for me
        to continue working on it. Due to the multi-player nature of the beast,
        I can't enjoy the project alone. One day, I'd like to revisit the
        concept with a better intial design plan; the ad hoc nature of feature
        development meant things were getting complex and more difficult to
        maintain.
      </p>

      <AnnotatedImage caption="echoplexus used to be a lot darker! It got a revamp in 2014 for greater appeal.">
        <Img sizes={data.echoplexusOlder.sizes} />
      </AnnotatedImage>
    </ReadableSection>
  </StandardPage>
);

export default IndexPage;

export const query = graphql`
  query IndexQueryEchoplexus {
    echoplexusLatest: imageSharp(id: { regex: "/img/echoplexus-latest.png/" }) {
      sizes(maxWidth: 808, quality: 85) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    echoplexusOlder: imageSharp(id: { regex: "/img/echoplexus_chat.jpg/" }) {
      ...LabImageFragment
    }
  }
`;
