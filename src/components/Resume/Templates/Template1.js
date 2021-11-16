export function Template1(resumeItem) {
  return `
  <html lang="en">
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Mono&family=DM+Sans&display=swap" rel="stylesheet">
    <style type="text/css" id="static">
      span {
        font-family: "DM Sans", monospace;
      }
      
      p, ul, li {
        font-family: "DM Sans", monospace;
        line-height: 20px;
        padding-bottom: 5px;
      }
      
      p {
        font-size: 16px;
      }
      
      .container {
        margin: 0 auto;
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
      }
      .container section {
        padding: 0.5rem 0;
      }
      .container section.Intro {
        order: -1;
      }
      .container section.PersonalInfo {
        order: ${resumeItem.order.indexOf('PersonalInfo')};
      }
      .container section.Experiences {
        order: ${resumeItem.order.indexOf('Experiences')};
      }
      .container section.Qualifications {
        order: ${resumeItem.order.indexOf('Qualifications')};
      }
      .container section.Skills {
        order: ${resumeItem.order.indexOf('Skills')};
      }
      .container section.Reference {
        order: 4;
      }
      .container section .heading {
        text-align: center;
        font-weight: bold;
        position: relative;
        color: #85b8b6;
      }
      .container section .heading:before {
        border-top: 1px dotted #85b8b6;
        content: "";
        display: block;
        height: 1px;
        position: absolute;
        top: 50%;
        width: 100%;
        z-index: 1;
      }
      .container section .heading .sectiontitle {
        display: inline-block;
        position: relative;
        font-family: "DM Mono", monospace;
        z-index: 5;
        margin-bottom: 1rem;
        background: #fff !important;
        padding: 0 10px;
        font-size: 24px;
        color: #526363;
      }
      .container .section_intro__heading {
        position: relative;
        font-size: 15px;
        font-family: "DM Mono", monospace;
        line-height: 17px;
        font-weight: bold;
        padding: 0 0 1px 0;
        border-top: 1px solid #85b8b6;
        border-bottom: 1px solid #85b8b6;
        text-align: center;
        font-weight: bold;
        position: relative;
        color: #85b8b6;
      }
      .container .section_intro__heading:after {
        border-bottom: 1px dotted #85b8b6;
        display: block;
        content: "";
        height: 1px;
        position: absolute;
        bottom: -3px;
        width: 100%;
        z-index: 1;
      }
      .container .section_intro__address {
        position: relative;
        text-align: center;
        line-height: 1.25em;
        margin-top: 11px;
        word-wrap: break-word;
        font-size: 16px;
        margin-top: 11px;
      }
      .container .section_intro__address ul {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        font-size: 14px;
        padding: 0;
        list-style: none;
      }
      .container .section_intro__address ul span {
        width: 5px;
        height: 5px;
        background-color: black;
        margin: 0 20px;
        display: inline-block;
      }
      .container .section_summary p {
        margin: 0;
      }
      .container .section_experiences__title {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .container .section_experiences .jobtitle,
      .container .section_experiences .companyname {
        font-weight: bold;
      }
      .container .section_experiences .jobtitle {
        font-size: 21px;
      }
      .container .section_skills {
        width: 640px;
      }
      .container .section_skills ul {
        width: 100%;
        max-height: 114px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
      }
      .container .section_skills ul li {
        width: 260px;
      }
      .container .section_education__item {
        margin-bottom: 1rem;
      }
      .container .section_education__title {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .container .section_education .institute,
      .container .section_education .degree {
        font-weight: bold;
      }
      .container .section_education .degree {
        font-size: 21px;
      }
      
      @media screen and (min-width: 320px) {
        .container {
          width: 320px;
        }
      }
      @media screen and (min-width: 640px) {
        .container {
          width: 740px;
          padding-left: 47px;
        }
      }
    </style>
  </head>

  <body>
  <div class="container">
    <section class="section_intro Intro">
        <div class="section_intro__heading">
        <h1>${resumeItem.name}</h1>
        </div>
        <div class="section_intro__address">
        <ul>
            <li>${resumeItem.email}</li><span></span>
            <li>${resumeItem.mobile}</li><span></span>
            <li>${resumeItem.visaStatus}</li><span></span>
            <li>${resumeItem.location}</li>
        </ul>
        </div>
    </section>
    <section class="section_summary PersonalInfo">
        <div class="heading">
        <h2 class="sectiontitle">
            Professional Summary
        </h2>
        </div>
        <div class="">
        <p>${resumeItem.personalStatement}</p>
        </div>
    </section>
    <section class="section_experiences Experiences">
        <div class="heading">
            <h2 class="sectiontitle">Experiences</h2>
        </div>
        ${
          resumeItem.experiences.length > 0 &&
          resumeItem.experiences
            .map(
              experience => `
        <div class="">
            <div class="section_experiences__title">
                <span class="jobtitle">${experience.title}</span>
                <span class="datesWrapper">
                <span class="jobdates">${new Date(
                  experience.fromDate,
                ).toLocaleDateString('en-us', {
                  year: 'numeric',
                  month: 'numeric',
                })}</span>
                <span> to </span>
                <span class="jobdates"  id="35908923EDDT1">${
                  experience.currentlyWorking
                    ? 'Present'
                    : new Date(experience.toDate).toLocaleDateString('en-us', {
                        year: 'numeric',
                        month: 'numeric',
                      })
                }</span>
                </span>
            </div>
            <span class="">
                <span class="companyname">${
                  experience.employer + '-' + experience.location
                }</span>
            </span>
            <div class="jobline">
             ${experience.responsibilities}
            </div>
        </div>
        `,
            )
            .join('')
        }
    </section>
    <section class="section_skills Skills">
        <div class="heading">
        <div class="sectiontitle">Skills</div>
        </div>
        <div class="skill">
            ${resumeItem.skills}
        </div>
    </section>
    <section class="section_education Qualifications">
        <div class="heading">
            <h2 class="sectiontitle">Education</h2>
        </div>
        ${
          resumeItem.qualifications.length > 0 &&
          resumeItem.qualifications
            .map(
              qualification => `
        <div class="section_education__item">
            <div class="section_education__title">
                <span class="degree">${qualification.title}</span>
                <span class="datesWrapper">
                <span class="jobdates">${new Date(
                  qualification.finishedDate,
                ).toLocaleDateString('en-us', {
                  year: 'numeric',
                  month: 'numeric',
                })}</span>
                </span>
            </div>
            <div class="">
                <span class="institute companyname_educ">${
                  qualification.institute
                }</span>
                <span> - </span>
                <span class="joblocation jobcity">${
                  qualification.location
                }</span>
            </div>
        </div>
        `,
            )
            .join('')
        }
    </section>
    <section class="section_reference Reference">
        <div class="heading">
        <div class="sectiontitle">References</div>
        </div>
        <div class="">
        <p>Reference Available on request</p>
        </div>
    </section>
    </div>
  </body>
  </html>
  `;
}
