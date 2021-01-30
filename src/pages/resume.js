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
          I'm a full stack software developer with a passion for the web and
          computer graphics.
          <br />
          I'm user-focused and care deeply about whatever I work on.
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
            jobTitle="Software Developer → Staff Software Developer (L5→L7)"
            employers={[
              {
                name: "Shopify",
                website: "https://www.shopify.com"
              }
            ]}
            start="Oct 2013"
            stop="Now"
          />
          <p>
            In my first year I worked primarily on the admin team &ndash; the
            part of the app that merchants use &ndash; implementing features,
            fixing bugs, filing issues, and writing maintenance tasks. I worked
            with the client-side MVC framework{" "}
            <a
              href="http://batmanjs.org/"
              target="_blank"
              title="Batman.js homepage"
            >
              Batman.js
            </a>{" "}
            before Shopify started to move to a custom in-house server-client
            hybrid approach. At this time, most of our work was done in
            CoffeeScript.
          </p>
          <p>
            My role shifted from frontend closer to backend in this transition:
            I worked with a team of 8~10 to develop a powerful system that
            allows the server to be the primary source of truth in rendering,
            but still allowed enough flexibility that, at first glance, you
            might think it was a single-page app. It drastically reduced the
            mean development time for new features, and greatly simplified bug
            fixes. It was a huge success &ndash;{" "}
            <a
              href="https://engineering.shopify.com/blogs/engineering/rebuilding-the-shopify-admin-improving-developer-productivity-by-deleting-28-000-lines-of-javascript"
              title="Rebuilding the Shopify Admin: Deleting 28,000 lines of JavaScript to Improve Dev Productivity"
              target="_blank"
            >
              everybody loved it!
            </a>{" "}
            I learned Ruby on Rails for the first time, and quickly became
            proficient.
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
            </a>
            . I refined patterns and strategies around partial page refreshing,
            resulting in new patterns that were followed until the technology
            was obsoleted.
          </p>
          <p>
            Around 2015, I was selected to work at our new Waterloo office on
            Shopify Plus. I was responsible for building out most of the
            infrastructure our sales team used to do their job, and also created
            a set of in-office TV dashboards that displayed live sales data and
            metrics, celebrations of new closed deals, general announcements,
            and new hires.
          </p>
          <p>
            Since around May 2016, I've been 100% working from home in Waterloo.
            I spent approximately 1 year working with the Shipping team where I
            delivered an improved shipping zones UI within admin. I led a
            project to allow all Shopify merchants access to{" "}
            <a
              href="https://www.shopify.ca/blog/calculated-shipping-rates-for-everyone"
              title="Shopify Shipping Brings Calculated Rates to All Shopify Plans "
              target="_blank"
            >
              Shopify Shipping carrier-calculated rates
            </a>{" "}
            and worked closely with marketing to position the feature. I also
            led the technical development of the{" "}
            <a
              href="https://www.shopify.ca/blog/bulk-label-printing"
              title="Introducing Bulk Label Printing for Shopify Shipping"
              target="_blank"
            >
              bulk shipping label printing
            </a>{" "}
            project, a new user flow that allows merchants to buy & print
            multiple shipping labels at a time. This flow also generalized to
            the non-bulk flow, which simplified and unified the shipping label
            purchasing experiences. This system has since processed hundreds of
            thousands of shipping labels without incident. It was around this
            time that I began to take on a higher level technical role, writing
            and reviewing technical design documents for projects, starting with
            the documents for the bulk shipping label project.
          </p>
          <p>
            With the success of those projects, I achieved the title of Senior
            Developer (L6). The company formed a new team focused on
            Fulfillment, and I was asked to join. Working together with the
            Inventory team, we were responsible for bringing{" "}
            <a
              href="https://www.shopify.ca/retail/locations-for-shopify"
              title="Shopify’s Newest Feature Helps Retailers Track Inventory Across Multiple Locations"
            >
              multi-location inventory
            </a>{" "}
            support to fulfillment concepts. As part of this process, I led the
            technical efforts on revamping the UI of the most-visited page in
            admin &ndash; the "order details" page &ndash; to support the
            intricacies of this new paradigm. I was the liaison for the API
            support team, and helped to explain new API limitations. I also
            instrumented code to find apps that were making legacy API calls so
            that they could be addressed. This was a deeply complicated and
            draining migration; it was often referred to as "open heart surgery"
            internally.
          </p>
          <p>
            Around 2018, I designed and implemented a system to print PDF
            packing slips for orders within the admin. This project was
            completed with a mix of the now-older Twine & TurboGraft stack, as
            well as a React WYSIWYG template editor. My past experience with
            Splunk allowed me to create very powerful real-time Splunk
            dashboards to track the metrics for this project as it launched,
            such as e.g.: success rates of HTTP endpoints / background jobs, a
            real-time table for any exceptions encountered.
          </p>
          <p>
            Shopify used beta-flag driven development for quite a long time, but
            I began to advocate strongly to colleagues in my product line about
            combining these with opt-out beta flags, a concept that hadn't seen
            any real use until then. Having demonstrated their utility in some
            projects I was involved in, now, many new features have also decided
            to use an opt-out flag to give developers an escape hatch: having
            the ability to rollback the launch of a feature at a per-tenant
            level instead of rolling it back for <em>everyone</em> was very
            empowering. This has already saved us from some minor nightmares :)
          </p>
          <p>
            In April of 2019, I left the Fulfillment team to renew my passion
            for front-end development and focus on React development full-time.
            I transferred to the logistics web team. Having had so many years of
            backend development made me extremely flexible, putting me into a
            unique position where I could tackle issues that others didn't have
            the context for and struggled with.
          </p>
          <p>
            I authored React hooks for others in the organization to consume,
            e.g., a hook to display a flash message even after the consuming
            component unmounts, a hook for indicating a progress cursor, a
            generic <code>usePoller</code> hook to define polling on an
            arbitrary function. I focused a lot on making changes that help to
            unblock developers within the org, e.g., adjusting a mutation so
            that anyone could call it, allowing us to properly and permanently
            persist the dismissal state of banners within the admin. What
            started as a developer experience tweak led to actual user
            experience improvements! I also contributed new features to
            components in{" "}
            <a
              href="https://polaris.shopify.com/"
              title="The Shopify Polaris documentation website"
              target="_blank"
            >
              Polaris
            </a>
            , making things more convenient for consumers of this library.
          </p>
          <p>
            I've laid out the coding foundation for quite a few{" "}
            <a
              href="https://docs.ruby-lang.org/en/2.3.0/ERB.html"
              title="Docs for embedded ruby templating"
              target="_blank"
            >
              ERB
            </a>{" "}
            to React migrations; Shopify is slowly but surely converting all of
            the Twine & TurboGraft pages to React. I pioneered a new process for
            our React-ifications by performing a few comprehensive ERB audits,
            and wrote up the results in documents to share with the teams,
            including permalinks to relevant code points and hints to possible
            re-implementations. Every time this process has been used, we've
            uncovered hidden scope/features much earlier, resulting in less
            surprises (no hidden icebergs).
          </p>
          <p>
            In 2020, I was on a ~3 month secondment with our Checkout team. In
            this time, I was able to unify our frontend and backend teams and
            get them working closer together by demonstrating good inter-team
            communication. I was able to unify our frontend and backend code by
            designing a layer to progressively replace our faked dummy data with
            the implemented parts of our API, a task I believe I was rather
            uniquely positioned to do: I was able to talk with backend
            developers using the same vocabulary that they were familiar with,
            and I was able to unblock myself when backend issues arose in the
            integration. I designed a server-side hydration layer to provide
            initial data to our JS app from our Rails rendered page, as well as
            a scheme to manage and persist user state sanely and safely in{" "}
            <code>localStorage</code> and invalidate it properly when it needs
            to be cleared.
          </p>
          <p>
            I'm the kind of person that likes to have a pulse on as many ongoing
            things as possible, juggling many spinning plates across different
            domains (technical, social), and I really embraced that at Shopify.
            I love working closely with UX to iterate with them and build the
            best user experience while balancing and informing them about
            technical requirements and limitations. I'm the kind of person that
            doesn't like to remain idle throughout the work day because it
            drives me nuts.
          </p>
          <p>
            Throughout my tenure, I regularly participated in on-call / ATC
            rotations, and throughout the past year, I've been a mentor in the
            developer mentorship program. I'm known as a go-to person for
            technical consulting.
          </p>
          <h4>Skills / Familiarities</h4>
          <ul>
            <li>Ruby, Ruby on Rails</li>
            <li>TypeScript / JavaScript / CoffeeScript</li>
            <li>React (functional, hooks, class-based), Preact</li>
            <li>Splunk, Datadog, Bugsnag</li>
          </ul>
        </div>
        <div className="resume__job">
          <Resume.Position
            jobTitle="UI Developer"
            employers={[
              {
                name: "Exinda Networks",
                website: "https://www.exinda.com"
              }
            ]}
            start="Aug 2012"
            stop="Aug 2013"
          />
          <p>
            At Exinda, I worked on a large-scope single-page JavaScript
            application. I used Backbone to structure our core application,
            Underscore and jQuery for developer convenience, and Handlebars and
            i18n.js for templating. I was deeply involved in the design and
            implementation of many interactive modules (e.g., line and bar
            graphs) at the core of the application. I unit tested our frontend
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
            employers={[
              {
                name: "Uptown Creative Inc",
                website: "http://www.uptowncreativeinc.com"
              },
              {
                name: "Others"
              }
            ]}
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
            and image spritesheets.
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
      </section>
      <section id="education">
        <Typography.PageSubtitle>Education</Typography.PageSubtitle>
        <Resume.Position
          jobTitle="Bachelor of Computer Science, Co-op"
          employers={[
            {
              name: "University of Waterloo",
              website: "https://uwaterloo.ca/"
            }
          ]}
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
          my wife, or working on software. I'm getting more into home
          improvement, and have recently gotten into streaming on Twitch.
        </p>
        <p className="print-only">
          Please visit{" "}
          <a href="https://anthonycameron.com">https://anthonycameron.com</a>{" "}
          for an overview of some things I've worked on.
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
          (pronounced mew-vee) is a Rails 4 application that created in hopes of
          providing an alternative to{" "}
          <a href="http://xbmc.org/" target="_blank" title="XBMC homepage">
            XBMC
          </a>{" "}
          as a home streaming system. Right now, it's able to query external
          data sources (
          <a
            href="https://thetvdb.com/"
            target="_blank"
            title="thetvdb.com homepage"
          >
            thetvdb.com
          </a>
          ,{" "}
          <a
            href="https://www.omdbapi.com/"
            target="_blank"
            title="omdb homepage"
          >
            omdb
          </a>
          ), gather metadata, download posters, and generate screenshots from
          video files. It groups episodes by series and displays a Netflix-esque
          interface, streaming video down to any web client in your home.
        </p>
        <h4>Others</h4>

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
