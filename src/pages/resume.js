import React from "react";
import Helmet from "react-helmet";

import StandardPage from "../components/StandardPage";
import ReadableSection from "../components/ReadableSection";
import Typography from "../components/Typography";
import Resume from "../components/Resume";

const IndexPage = () => (
  <StandardPage>
    <Helmet title="Resume - Anthony Cameron" />
    <ReadableSection>
      <Typography.PageTitle>Hi, I'm Anthony Cameron</Typography.PageTitle>
      <section id="title">
        <p>
          I'm a software developer with a passion for the web and computer
          graphics.
        </p>
        <div className="print-only">
          <a href="mailto: ar.cameron@gmail.com">ar.cameron@gmail.com</a>
          <br />
          <a href="https://anthonycameron.com">https://anthonycameron.com</a>
          <br />
          <a href="https://github.com/qq99">https://github.com/qq99</a>
        </div>
      </section>
      <section id="work-experience">
        <Typography.PageSubtitle>Work Experience</Typography.PageSubtitle>
        <div className="resume__job">
          <Resume.Position
            jobTitle="Senior Software Developer"
            employers={ [
              {
                name: "Shopify",
                website: "https://www.shopify.com"
              }
            ] }
            start="Oct 2013"
            stop="Now"
          />
          <p>
            In my first year, I worked primarily on the admin team &ndash; the
            section store owners use &ndash; implementing features, fixing bugs,
            filing issues, and writing maintenance tasks. Since Shopify
            encourages a strong culture of ownership, I'm always looking out for
            potential problems regarding user experience across project and team
            boundaries.
          </p>
          <p>
            I worked with the client-side MVC framework{" "}
            <a
              href="http://batmanjs.org/"
              target="_blank"
              title="Batman.js homepage"
            >
              Batman.js
            </a>{" "}
            before we started to move to a custom in-house server-client hybrid
            approach. This launched me from no previous CoffeeScript experience
            to relative expertise, imparting in me a thorough love of the
            language.
          </p>
          <p>
            My role shifted from front-end to full-stack in our transition: As a
            team of 8~10, we've developed a powerful system that allows the
            server to be the primary source of truth in rendering, but still
            gives us enough flexibility that at first glance, you might think
            we've made a single-page app. It drastically reduced our mean
            development time for new features, and greatly simplified bug fixes.
            Everybody loved it, and{" "}
            <a
              href="https://www.shopify.ca/technology/15646068-rebuilding-the-shopify-admin-improving-developer-productivity-by-deleting-28-000-lines-of-javascript"
              title="Rebuilding the Shopify Admin: Improving Developer Productivity by Deleting 28,000 lines of JavaScript"
              target="_blank"
            >
              we were quite proud of it.
            </a>
          </p>
          <p>
            I loved our new web paradigm so much that I extracted it into 2 open
            source libraries,{" "}
            <a
              href="https://github.com/Shopify/twine"
              title="External link to Twine on GitHub"
              target="_blank"
            >
              Twine
            </a>{" "}
            and{" "}
            <a
              href="https://github.com/Shopify/turbograft"
              title="External link to TurboGraft on GitHub"
              target="_blank"
            >
              TurboGraft
            </a>.
          </p>
          <p>
            After that, I was working in our new Waterloo office on Plus
            engineering efforts. I was responding to a variety of engineering
            efforts that affect our Plus merchants: new features, bug triage /
            acceleration. I was responsible for building out most of the
            infrastructure our sales team used to do their job at the time, and
            also created some in-office TV dashboards that displayed live sales
            data (among other things).
          </p>
          <p>
            Since around May 2016, I've been 100% working from home in Waterloo.
            I spent approximately 1 year in the Shipping team, and delivered: an
            improved shipping zones UI, and allowing all Shopify merchants
            access to{" "}
            <a
              href="https://www.shopify.ca/blog/calculated-shipping-rates-for-everyone"
              title="Shopify Shipping Brings Calculated Rates to All Shopify Plans "
              target="_blank"
            >
              Shopify Shipping carrier-calculated rates
            </a>. I also championed our{" "}
            <a
              href="https://www.shopify.ca/blog/bulk-label-printing"
              title="Introducing Bulk Label Printing for Shopify Shipping"
              target="_blank"
            >
              bulk label printing
            </a>{" "}
            project, a new user flow that allows merchants to buy & print
            multiple shipping labels at a time.
          </p>
          <p>
            Nowadays, some Shipping teammates and I have splintered off to form
            a new team, but I'm not permitted to speak too much about it at this
            time!
          </p>
        </div>
        <div className="resume__job">
          <Resume.Position
            jobTitle="UI Developer"
            employers={ [
              {
                name: "Exinda Networks",
                website: "https://www.exinda.com"
              }
            ] }
            start="Aug 2012"
            stop="Aug 2013"
          />
          <p>
            At Exinda, I was working on a large-scope single-page JavaScript
            application. We used Backbone to structure our core application,
            Underscore and jQuery for developer convenience, and Handlebars and
            i18n.js for templating. I was deeply involved in the design and
            implementation of many interactive modules (e.g., line and bar
            graphs) at the core of the application. We unit tested our frontend
            with Sinon, Chai, Mocha, and Jasmine. I wrote many acceptance tests
            using Cucumber (Capybara & Watir).
          </p>
          <p>
            It was at Exinda that I first got really involved with
            JavaScript-based developer utilities: node, bbb, jshint, and many
            others. I wrote an intercepting proxy in Ruby to aid with manual
            testing when targeting different versions of our RESTful API.
            Combined with Apache2 load balancers, this proxy also enabled us to
            simulate low-latency and unreliable-link scenarios while developing
            UI components, discovering bugs preemptively.
          </p>
          <p>
            I was responsible for the creation of a set of utilities that added
            dummy data for demonstration purposes. These utilities were also
            used for creating fixtures for acceptance tests. Git became a part
            of my daily workflow; I could not do without it.
          </p>
        </div>
        <div className="resume__job">
          <Resume.Position
            jobTitle="Freelance Web Developer"
            employers={ [
              {
                name: "Uptown Creative Inc",
                website: "http://www.uptowncreativeinc.com"
              },
              {
                name: "Others"
              }
            ] }
            start="Dec 2009"
            stop="Aug 2012"
          />
          <p>
            Uptown Creative Group specializes in providing clean, cross-browser,
            interactive HTML5 websites. During my time there, I participated in
            the creation of many static and CMS-driven sites, with a heavy focus
            on interactive maps, dynamic map searches, Yelp and weather
            integration. I also tailored 3rd party feeds, themed iHomeFinder
            sites, and provided integration for search, filtering, and
            pagination of MLS results.
          </p>
          <p>
            As a freelance web developer, I was responsible for the entirety of
            the development phase: I received a set of design documents, and
            from there I created semantic HTML5 mark-up using HAML (to insure
            well-formedness), sensible and minified CSS with the SASS compiler,
            and image spritesheets for anything that couldn't be done without
            them.
          </p>
          <p>
            jQuery was employed heavily on nearly every site for interactive
            widgets, image lazy loading, and more. From this shell template, we
            moved on to PHP or WordPress, depending on client needs.
          </p>
          <p>
            In this time, I improved my web accessibility knowledge by creating
            responsive layouts and mobile-aware sites. While the sites I create
            greatly benefit from JavaScript, I make sure to always provide room
            for sensible graceful degradation.
          </p>
        </div>
        <div className="resume__job">
          <em>
            I've had a few other co-op positions, but I've omitted them here.
          </em>
        </div>
      </section>
      <section id="education">
        <Typography.PageSubtitle>Education</Typography.PageSubtitle>
        <Resume.Position
          jobTitle="Bachelor of Computer Science"
          employers={ [
            {
              name: "University of Waterloo",
              website: "https://uwaterloo.ca/"
            }
          ] }
          start=""
          stop=""
        />
        <p>
          <strong>Key Courses:</strong> Introduction to Computer Graphics,
          Medical Image Processing, Distributed Systems, Introduction to
          Artificial Intelligence, Computer Networks, Numerical Computation,
          Algorithms, Computer Security and Privacy, Operating Systems
        </p>
        <p>
          <strong>Awards:</strong> University of Waterloo Merit Scholarship,
          2006
        </p>
      </section>
      <section id="projects">
        <Typography.PageSubtitle>
          Personal Projects & Open Source
        </Typography.PageSubtitle>
        <p>
          In my spare time, I'm either playing video games, spending time with
          my wife, or working on software.
        </p>
        <h4>echoplexus</h4>
        <p>
          <a
            href="https://github.com/qq99/echoplexus"
            target="_blank"
            title="echoplexus on GitHub"
          >
            echoplexus
          </a>{" "}
          was perhaps my most substantial and successful personal project to
          date. It aimed to provide web-based anonymous chat, collaborative
          coding and drawing, as well as WebRTC audio & video calls.
        </p>
        <h4>μv</h4>
        <p>
          <a
            href="https://github.com/qq99/muvee"
            target="_blank"
            title="μv on GitHub"
          >
            μv
          </a>{" "}
          (pronounced mew-vee) is a Rails 4 application that I've recently
          started working on in hopes of replacing{" "}
          <a href="http://xbmc.org/" target="_blank" title="XBMC homepage">
            XBMC
          </a>{" "}
          as my home streaming system. Right now, it's able to query external
          datasources (<a
            href="http://thetvdb.com/"
            target="_blank"
            title="thetvdb.com homepage"
                       >
            thetvdb.com
                       </a>,{" "}
          <a
            href="http://www.omdbapi.com/"
            target="_blank"
            title="omdb homepage"
          >
            omdb
          </a>), gather metadata, download posters, and generate screenshots
          from video files. It groups episodes by series and displays a
          Netflix-esque interface, streaming video down to any web client in
          your home.
        </p>
        <h4>Others</h4>
        <p className="print-only">
          Please visit{" "}
          <a href="https://anthonycameron.com">https://anthonycameron.com</a>{" "}
          for an overview of some things I've worked on.
        </p>
        <p>
          I also contribute to OSS (my own and others){" "}
          <a
            href="https://github.com/qq99?tab=repositories"
            target="_blank"
            title="My work on GitHub"
          >
            on GitHub.
          </a>
        </p>
      </section>
    </ReadableSection>
  </StandardPage>
);

export default IndexPage;
