import React from 'react';
import {Text, View} from 'react-native';

export default function TwoPage() {
  const TwoPage = `
        <html lang="en">
        <head>
            <style type="text/css" id="static">
            html,
            body,
            div,
            span,
            applet,
            object,
            iframe,
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p,
            blockquote,
            pre,
            a,
            abbr,
            acronym,
            address,
            big,
            cite,
            code,
            del,
            dfn,
            em,
            font,
            img,
            ins,
            kbd,
            q,
            s,
            samp,
            small,
            strike,
            strong,
            sub,
            sup,
            tt,
            var,
            b,
            u,
            i,
            center,
            dl,
            dt,
            dd,
            ol,
            ul,
            li,
            fieldset,
            form,
            label,
            legend,
            table,
            caption,
            tbody,
            tfoot,
            thead,
            tr,
            th,
            td {
                margin: 0;
                padding: 0;
                border: 0;
                outline: 0;
                font-size: 100%;
                vertical-align: baseline;
                background: transparent;
            }

            html {
                width: 100%;
                margin: 0 auto;
            }

            body {
                width: 100%;
                line-height: 1.5;
                background: #fff;
                margin: 0 auto;
                font-family: Palatino;
                color: #383839;
            }

            ol,
            ul {
                list-style: none;
            }

            blockquote,
            q {
                quotes: none;
            }

            blockquote:before,
            blockquote:after,
            q:before,
            q:after {
                content: "";
                content: none;
            }
            :focus {
                outline: 0;
            }
            ins {
                text-decoration: none;
            }
            del {
                text-decoration: line-through;
            }
            table {
                border-collapse: collapse;
                border-spacing: 0;
            }
            a img {
                border: none;
            }
            ul,
            li {
                list-style-type: disc;
                margin: 10px 0 0 10px;
                padding: 0;
            }
            ul li {
                margin: 0 0 0 13px;
            }
            .clear {
                clear: both;
                height: 0;
            }
            br.clear {
                line-height: 0;
            }
            div#document div.lowerborder {
                border-bottom: 1px dotted #85b8b6;
                margin-top: 2px;
                display: block;
            }
            div#document div.SECTION_CNTC {
                padding-bottom: 4px;
                margin-top: 0;
            }
            div#document div.firstsection {
                margin-top: 0;
            }
            div.name {
                font-size: 15px;
                line-height: 17px;
                font-weight: bold;
                padding: 0 0 1px 0;
                border-top: 1px solid #85b8b6;
                border-bottom: 1px solid #85b8b6;
                text-align: center;
            }
            div.logo {
                display: none;
            }
            div.paragraph {
                position: relative;
            }

            div.heading {
                clear: both;
                text-align: center;
                font-weight: bold;
                position: relative;
                color: #85b8b6;
            }

            div.heading:before {
                border-top: 1px dotted #85b8b6;
                content: "";
                display: block;
                height: 1px;
                position: absolute;
                top: 50%;
                width: 100%;
                z-index: 1;
            }

            div#document .section {
                position: relative;
            }

            div.sectiontitle {
                display: inline-block;
                position: relative;
                z-index: 5;
                background: #fff !important;
                padding: 0 10px;
                color: #526363;
            }

            div.address {
                position: relative;
                text-align: center;
                font-size: 0.917em;
                line-height: 1.25em;
                margin-top: 11px;
                word-wrap: break-word;
            }

            div.address li,
            div.address ul {
                display: inline;
                margin: 0;
                padding: 0;
                list-style: none;
            }

            div.address li:before,
            .adnlLnks li:before {
                vertical-align: bottom;
            }

            div.address li.first:before,
            .adnlLnks li.first:before {
                content: "";
            }

            div.address2 {
                position: relative;
                text-align: left;
                font-size: 0.917em;
                line-height: 1.25em;
            }

            span.jobtitle,
            span.companyname,
            span.degree {
                font-weight: bold;
            }
            .jobtitle {
                font-size: 21px;
            }
            span.paddedline {
                display: block;
            }

            .nodisplay {
                display: none;
            }

            .table_wrapper {
                width: 100%;
                margin-top: 0;
            }

            table.twocol {
                width: 100%;
            }

            table.skills {
                width: 100%;
            }

            table.skills th,
            table.skills td {
                width: 20%;
                text-align: center;
            }

            table.skills th {
                text-decoration: underline;
            }

            table.skills .skillname,
            table.skills .skillrating {
                text-align: left;
                width: 35%;
            }

            table.skills .skillrating {
                width: 20%;
            }

            table.skills .skillyears,
            table.skills .skilllast {
                width: 19%;
            }

            table.skills .pad1 {
                width: 5%;
            }

            table.skills .pad2,
            table.skills .pad3 {
                width: 1%;
            }

            div.adnlLnks {
                text-align: center;
            }
            div#document .sectionCL .paragraph {
                margin-top: 0 !important;
            }

            div.twocol ul li,
            div.twocol p span {
                width: 260px;
                float: left;
            }
            div.twocol ul li:nth-child(even) {
                width: 200px;
                margin-left: 100px;
            }
            div#document .skillSection {
                clear: both;
                display: table;
                width: 100%;
            }

            div#document .skillSection ul {
                width: 100%;
                display: inline-block;
            }

            div#document.hmargins {
                width: 100%;
                margin: 0 auto;
            }

            div#document div.sectiontitle {
                font-size: 24px;
                line-height: 1px;
            }

            div#document div.heading {
                margin-bottom: {
                $SHMB
                }
                px;
            }

            div#document div.paragraph {
                margin-top: {
                $PSPC
                }
                px;
            }

            div#document div.firstparagraph {
                margin-top: 0;
            }
            div#document .sectionCL .singlecolumn {
                margin-left: 0!important;
                width: 100%;
            }

            div.address2 {
                font-size: {
                $FTSZ
                }
                px;
                line-height: {
                $FTLH
                }
                px;
            }

            .adnlLnks li {
                display: inline!important;
            }
            div#document {
                line-height: 24px;
            }

            div#document table {
                line-height: 22px;
            }

            div#document.pagesize {
                width: 90%;
            }
            .datesWrapper {
                margin-left: 102px;
            }
            .datesWrapper1 {
                margin-left: 203px;
            }
            .project-involved {
                margin-top: 0.5em;
                margin-bottom: 8em;
            }
            div#document.vmargins {
                padding-top: 5px;
                padding-bottom: 37px;
            }

            div#document.hmargins {
                padding-left: 15px;
                padding-right: 15px;
            }

            div#document .section {
                margin-top: 15px;
            }

            div#document div.sectiontitle {
                font-size: 24px;
                line-height: 27px;
            }

            div#document div.heading {
                margin-bottom: 4.5px;
            }

            div#document div.paragraph {
                margin-top: 9px;
            }

            div#document div.firstparagraph {
                margin-top: 0;
                margin-bottom: 1em;
            }

            div#document .singlecolumn,
            div#document .maincolumn {
                margin-left: 0px;
                width: 100%;
            }

            div#document table.skills td {
                padding-top: 4.5px;
            }

            .fontsize {
                font-size: 18px;
            }

            .fontface {
                font-family: Rockwell, serif;
            }

            div.name {
                font-size: 21px;
                line-height: 57px;
            }

            div.address {
                font-size: 12px;
                line-height: 21px;
                margin-top: 11px;
            }

            div.address li:before {
                font-size: 11px;
            }

            div#document .sectionCL .singlecolumn {
                margin-left: 0 !important;
                width: 100%;
            }

            div.address2 {
                font-size: 13px;
                line-height: 22px;
            }

            .adnlLnks li {
                display: inline !important;
            }
            </style>
        </head>

        <body>
            <div
            id="document"
            class="fontsize fontface vmargins hmargins linespacing pagesize"
            >
            <div id="SECTION_NAME35908921" class="section">
                <div
                id="PARAGRAPH_35908921_1"
                class="paragraph PARAGRAPH_NAME firstparagraph"
                >
                <div class="name">
                    <span class="field" id="35908921FNAM1">VIGNESH</span><span></span>
                    <span class="field" id="35908921LNAM1">MURUGAN</span>
                </div>
                <div class="lowerborder"></div>
                </div>
            </div>
            <div id="SECTION_CNTC35908922" class="section SECTION_CNTC">
                <div
                id="PARAGRAPH_35908922_1"
                class="paragraph PARAGRAPH_CNTC firstparagraph"
                style="margin-bottom:0.75em;"
                >
                <div class="address">
                    <ul>
                    <li class="first">
                        <span class="spaced field" id="35908922CITY1"
                        >vignesh.murugan@hotmail.com</span
                        >
                        <span
                        class="spaced field"
                        dependency="STAT+ZIPC"
                        id="35908922ZIPC1"
                        ></span>
                    </li>
                    <li><span class="field" id="35908922EMAI1">0221648788</span></li>
                    <li>
                        <span class="field" id="35908922EMAI1"></span>Permanent Resident 
                    </li>
                    <li>
                        <span class="field" id="35908922EMAI1"></span>Christchurch
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            <div id="SECTION_SUMM35908926" class="section" style="">
                <div class="heading">
                <div id="SECTNAME_SUMM35908926" class="sectiontitle">
                    Professional Summary
                </div>
                </div>
                <div id="PARAGRAPH_35908926_1" class="paragraph firstparagraph">
                <div class="field singlecolumn" id="35908926FRFM1">
                    <p>
                    Highly motivated & experienced web enthusiast working as a Full
                    Stack Web Developer. Having a Passion for modern JS front end
                    frameworks(React & Vue) and gained my skillset by
                    developing headless ecommerce websites. Working in time-based tasks, increased my efficiency in delivering projects. 
                    </p>
                </div>
                </div>
            </div>
            <div id="SECTION_EXPR35908923" class="section" style="margin-top: 20px;">
                <div class="heading">
                <div id="SECTNAME_EXPR35908923" class="sectiontitle">Experience</div>
                </div>

                <div id="PARAGRAPH_35908923_1" class="paragraph firstparagraph">
                <div class="singlecolumn">
                    <span class="paddedline" style="display: inline">
                    <span class="jobtitle" id="35908923JTIT1"
                        >Full stack developer</span
                    >
                    <span
                        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                    >
                    <span class="datesWrapper" style="display: inline">
                        <span class="jobdates" format="%m/%Y" id="35908923JSTD1"
                        >01/2020</span
                        ><span> to </span>
                        <span class="jobdates" format="%m/%Y" id="35908923EDDT1"
                        >Present</span
                        ><br />
                    </span>
                    <span class="paddedline">
                        <span class="companyname" id="35908923COMP1"
                        >Plato Creative - Christchurch, NZ</span
                        ><br />
                    </span>
                    </span>

                    <span class="jobline" id="35908923JDES1">
                    <ul>
                        <li>
                        Building Proficiency in Data fetching with SWR(React hooks for Data fetching), GraphQL and Apollo client.
                        </li>
                        <li>
                        Developed Image recognition(AI based) PWA web app(Next JS) for an art museum which helps the visitors to navigate the app by scanning art pictures.
                        </li>
                        <li>
                        Developing headless ecommerce websites using Next JS(React framework), Sanity.io, Craft CMS & shopify.
                        </li>
                        <li>Building 'CV builder' React native app as my side project where i'm honing my skillset in React, Redux, Typescript, Realm(MongoDB), Jest & Cypress.</li>
                        <li>
                        Collaborating with designers to develop picture perfect front end of the website(Mobile first approach) using Tailwind CSS, SCSS and webpack.
                        </li>
                        <li>Providing exceptional support to the client to fix bugs & scope/add new features to the existing application.</li>
                        <li>
                        Collaborating with team of developers to build the applications using Git version control(Tower GUI).
                        </li>
                    </ul>
                    </span>
                </div>
                </div>

                <div id="PARAGRAPH_35908923_1" class="paragraph firstparagraph">
                <div class="singlecolumn">
                    <span class="paddedline" style="display: inline">
                    <span class="jobtitle" id="35908923JTIT1">Web Developer</span>
                    <span
                        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                    >
                    <span class="datesWrapper" style="display: inline">
                        <span class="jobdates" format="%m/%Y" id="35908923JSTD1"
                        >06/2018</span
                        ><span> to </span>
                        <span class="jobdates" format="%m/%Y" id="35908923EDDT1"
                        >01/2020</span
                        ><br />
                    </span>
                    </span>

                    <span class="paddedline">
                    <span class="companyname" id="35908923COMP1"
                        >Exercise Association of New Zealand - Part Time</span
                    ><br />
                    </span>
                    <span class="jobline" id="35908923JDES1">
                    <ul>
                        <li>
                        Redeveloped old jobsite(Spaghetti code) to new & modern
                        jobsite application using PHP OOP & SQL(MVC
                        Pattern).
                        </li>
                        <li>
                        Created Custom plugins/Themes to suit client needs using
                        WordPress, MySQL &amp; PHP Object Oriented Programming.
                        </li>
                        <li>
                        Liaised with Client and Hosting company to migrate/deploy
                        website (FTP, DNS &amp; SSL certificate).
                        </li>
                        <li>
                        Redesigned websites to reflect modern web standards such as
                        responsive imaging, mobile-first design approach & interactive
                        UI components.
                        </li>
                    </ul>
                    </span>
                </div>
                </div><br/>
                <div id="PARAGRAPH_35908923_1" class="paragraph firstparagraph">
                <div class="singlecolumn">
                    <span class="paddedline" style="display: inline">
                    <span class="jobtitle" id="35908923JTIT1">Web Developer</span>
                    <span
                        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                    >
                    <span class="datesWrapper" style="display: inline">
                        <span class="jobdates" format="%m/%Y" id="35908923JSTD1"
                        >02/2019</span
                        ><span> to </span>
                        <span class="jobdates" format="%m/%Y" id="35908923EDDT1"
                        >01/2020</span
                        ><br />
                    </span>
                    </span>

                    <span class="paddedline">
                    <span class="companyname" id="35908923COMP1"
                        >Intech Instruments Ltd - Contract</span
                    ><br />
                    </span>
                    <span class="jobline" id="35908923JDES1">
                    <ul>
                        <li>
                        Digitalized their business using Wordpress CMS &amp;
                        Woocommerce.
                        </li>
                        <li>
                        Using Adobe products extensively to create Logos, Brochures
                        &amp; Photo Collage.
                        </li>
                        <li>
                        Created a CSV file of the products &amp; upload them into
                        Woocommerce to sell online.
                        </li>
                        <li>
                        Integrated MailChimp to collect customer emails and creating
                        targeted email campaigns.
                        </li>
                        <li>
                        Integrated Google analytics, Search console and Google tag
                        manager.
                        </li>
                    </ul>
                    </span>
                </div>
                </div>
                <br />

                <div id="PARAGRAPH_35908923_1" class="paragraph firstparagraph">
                <div class="singlecolumn">
                    <span class="paddedline" style="display: inline">
                    <span class="jobtitle" id="35908923JTIT1"
                        >Web Developer - Volunteering</span
                    >
                    <span
                        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                    >
                    <span class="datesWrapper" style="display: inline">
                        <span class="jobdates" format="%m/%Y" id="35908923JSTD1"
                        >03/2018</span
                        ><span> to </span>
                        <span class="jobdates" format="%m/%Y" id="35908923EDDT1"
                        >07/2018</span
                        ><br />
                    </span>
                    </span>

                    <span class="paddedline">
                    <span class="companyname" id="35908923COMP1"
                        >Canterbury &amp; New Zealand Business Association</span
                    ><br />
                    </span>
                    <span class="jobline" id="35908923JDES1">
                    <ul>
                        <li>
                        Created &amp; maintaining a WordPress website using WAMP
                        stack &amp; Microsoft Azure.
                        </li>
                        <li>
                        Implemented UI components &amp; UX methodologies including
                        working knowledge of JS &amp; it's frameworks such as React
                        &amp; Vue.
                        </li>
                        <li>
                        Evaluated code to ensure that it is valid, is properly
                        structured, meets industry standards and is compatible with
                        browsers, devices, or operating systems.
                        </li>
                    </ul>
                    </span>
                </div>
                </div>
            </div>
            <div id="SECTION_HILT35908928" class="section skillSection">
                <div class="heading">
                <div id="SECTNAME_HILT35908928" class="sectiontitle">Skills</div>
                </div>
                <div id="PARAGRAPH_35908928_1" class="paragraph firstparagraph">
                <div class="singlecolumn maincolumn">
                    <div class="field twocol skill" id="35908928SKC11">
                    <ul>
                        <li>HTML5, CSS3, &amp; JavaScript</li>
                        <li>React & Redux</li>
                        <li>Typescript</li>
                        <li>Jest & Cypress</li>
                        <li>Tailwind CSS & SCSS</li>
                        <li>Git version control</li>
                        <li>Webpack Task runners</li>
                        <li>Mobile responsiveness</li>
                        <li>Next JS</li>
                        <li>Interactive SVG</li>
                        <li>GraphQL</li>
                        <li>React Apollo client</li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            <div id="SECTION_EDUC35908925" class="section">
                <div class="heading">
                <div id="SECTNAME_EDUC35908925" class="sectiontitle">Education</div>
                </div>
                <div id="PARAGRAPH_35908925_1" class="paragraph firstparagraph">
                <div class="singlecolumn">
                    <span class="paddedline">
                    <span class="degree" id="35908925DGRE1"
                        >Diploma in Web &amp; UX design</span
                    ><span
                        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                    >
                    <span class="datesWrapper1">
                        <span class="jobdates" format="%b %Y" id="35908925GRYR1"
                        >May 2018</span
                        >
                    </span>
                    </span>
                    <span class="paddedline">
                    <span class="companyname companyname_educ" id="35908925SCHO1"
                        >Yoobee School of Design Christchurch</span
                    ><span> - </span>
                    <span class="joblocation jobcity" id="35908925SCIT1"
                        >Christchurch</span
                    ><span>, </span>
                    <span class="joblocation jobstate" id="35908925SSTA1"
                        >Canterbury</span
                    ><br />
                    </span>
                    <span class="field" id="35908925FRFM1"></span>
                </div>
                </div>

                <div id="PARAGRAPH_35908925_1" class="paragraph firstparagraph">
                <div class="singlecolumn">
                    <span class="paddedline">
                    <span class="degree" id="35908925DGRE1"
                        >Graduate Diploma in CAD</span
                    >
                    <span
                        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                    >
                    <span class="datesWrapper1">
                        <span class="jobdates" format="%b %Y" id="35908925GRYR1"
                        >Feb 2012</span
                        >
                    </span>
                    </span>
                    <span class="paddedline">
                    <span class="companyname companyname_educ" id="35908925SCHO1"
                        >Ara Institute of Canterbury</span
                    ><span> - </span>
                    <span class="joblocation jobcity" id="35908925SCIT1"
                        >Christchurch</span
                    ><span>, </span>
                    <span class="joblocation jobstate" id="35908925SSTA1"
                        >Canterbury</span
                    ><br />
                    </span>
                    <span class="field" id="35908925FRFM1"></span>
                </div>
                </div>

                <div id="PARAGRAPH_35908925_1" class="paragraph firstparagraph">
                <div class="singlecolumn">
                    <span class="paddedline">
                    <span class="degree" id="35908925DGRE1"
                        >Bachelor's in aeronautical engineering</span
                    >
                    <span class="datesWrapper1">
                        <span class="jobdates" format="%b %Y" id="35908925GRYR1"
                        >April 2010</span
                        >
                    </span>
                    </span>
                    <span class="paddedline">
                    <span class="companyname companyname_educ" id="35908925SCHO1"
                        >Park college of engineering</span
                    ><span> - </span>
                    <span class="joblocation jobcity" id="35908925SCIT1"
                        >Coimbatore</span
                    ><span>, </span>
                    <span class="joblocation jobstate" id="35908925SSTA1">India</span
                    ><br />
                    </span>
                    <span class="field" id="35908925FRFM1"></span>
                </div>
                </div>
            </div>
            <div id="SECTION_REFE35908927" class="section">
                <div class="heading">
                <div id="SECTNAME_REFE35908927" class="sectiontitle">References</div>
                </div>
                <div id="PARAGRAPH_35908927_1" class="paragraph firstparagraph">
                <div class="field singlecolumn" id="35908927FRFM1">
                    <p>Reference Available on request</p>
                </div>
                </div>
            </div>
            </div>
        </body>
        </html>
    `;

  return (
    <View>
      <Text>
        Resume
      </Text>
    </View>
  );
}
