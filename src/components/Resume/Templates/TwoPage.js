export function TwoPage(resumeItem) {
  return `
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

      div.address ul {
          display: flex;
            justify-content: center;
            align-items: center;
          margin: 0;
          padding: 0;
          list-style: none;
      }
      .address ul li {
        list-style: none;
      }

      .address ul span {
        width: 5px;
        height: 5px;
        background-color: black;
        margin: 0 20px;
        display: inline-block;
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

      .skillSection ul {
          width: 100%;
          list-style-type: disc;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          max-height: 150px;
      }

      .skillSection ul li{
        list-style-type: disc;
        display: list-item;
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
      .experience__title {
          display: flex;
          justify-content: space-between;
      }
      .education__title {
        display: flex;
        justify-content: space-between;
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
          font-size: 16px;
          line-height: 21px;
          margin-top: 11px;
      }

      div#document .sectionCL .singlecolumn {
          margin-left: 0 !important;
          width: 100%;
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
              <span class="field" id="35908921FNAM1">${resumeItem.name}</span>
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
                <li>${resumeItem.email}</li><span></span>
                <li>${resumeItem.mobile}</li><span></span>
                <li>${resumeItem.visaStatus}</li><span></span>
                <li>${resumeItem.location}</li>
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
              ${resumeItem.personalStatement}
              </p>
          </div>
          </div>
      </div>
      <div id="SECTION_EXPR35908923" class="section" style="margin-top: 20px;">
          <div class="heading">
          <div id="SECTNAME_EXPR35908923" class="sectiontitle">Experiences</div>
          </div>
          ${
            Object.values(resumeItem.experiences).length > 0 &&
            Object.values(resumeItem.experiences)
              .map(
                experience => `
              <div class="paragraph firstparagraph">
                <div class="">
                    <div class="experience__title">
                        <span class="jobtitle" id="35908923JTIT1">${
                          experience.title
                        }</span>
                        <span class="datesWrapper">
                            <span class="jobdates">
                                ${new Date(
                                  experience.fromDate,
                                ).toLocaleDateString('en-us', {
                                  year: 'numeric',
                                  month: 'numeric',
                                })}
                            </span>
                            <span> to </span>
                            <span class="jobdates" format="%m/%Y" id="35908923EDDT1">
                                ${
                                  experience.currentlyWorking
                                    ? 'Present'
                                    : new Date(
                                        experience.toDate,
                                      ).toLocaleDateString('en-us', {
                                        year: 'numeric',
                                        month: 'numeric',
                                      })
                                }
                            </span><br />
                        </span>
                    </div>
                    <span class="paddedline">
                        <span class="companyname" id="35908923COMP1"
                        >${
                          experience.employer + '-' + experience.location
                        }</span
                        ><br />
                    </span>
                    </span>
        
                    <span class="jobline" id="35908923JDES1">
                    ${experience.responsibilities}
                    </span>
                </div>
              </div>
            `,
              )
              .join('')
          }
      </div>

      <div class="section skillSection">
          <div class="heading">
          <div class="sectiontitle">Skills</div>
          </div>
          <div class="paragraph firstparagraph">
          <div class="">
              <div class="skill">
                ${resumeItem.skills}
              </div>
          </div>
          </div>
      </div>
      <div id="SECTION_EDUC35908925" class="section">
          <div class="heading">
          <div id="SECTNAME_EDUC35908925" class="sectiontitle">Education</div>
          </div>

          ${
            Object.values(resumeItem.qualifications).length > 0 &&
            Object.values(resumeItem.qualifications)
              .map(
                qualification => `
              <div class="paragraph firstparagraph">
                <div class="singlecolumn">
                    <div class="education__title">
                        <span class="degree" id="35908925DGRE1"
                            >${qualification.title}</span
                        ><span
                            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
                        >
                        <span class="datesWrapper1">
                            <span class="jobdates" format="%b %Y" id="35908925GRYR1"
                            >${new Date(
                              qualification.finishedDate,
                            ).toLocaleDateString('en-us', {
                              year: 'numeric',
                              month: 'numeric',
                            })}</span
                            >
                        </span>
                        </span>
                    </div>
                    <span class="paddedline">
                    <span class="companyname companyname_educ" id="35908925SCHO1"
                        >${qualification.institute}</span
                    ><span> - </span>
                    <span class="joblocation jobcity" id="35908925SCIT1"
                        >${qualification.location}</span
                    ><span><br />
                    </span>
                    <span class="field" id="35908925FRFM1"></span>
                </div>
              </div>
            `,
              )
              .join('')
          }
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
}
