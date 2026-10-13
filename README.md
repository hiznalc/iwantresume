# iwantresume

A React.js resume builder, free to use without accounts, quotas, or a database.
Choose an ATS or regular template, fill in the form, preview it, and download
a selectable-text A4 PDF. Regular resumes support an optional photo.

## Run locally

On Windows, double-click `start.cmd`, or run `./start.cmd` in PowerShell.
With Node.js on PATH, use `npm run dev` or `node serve.mjs`.
Open http://127.0.0.1:4173 and keep the terminal running.
No dependency installation or build step is needed. React 18.3.1 loads from
esm.sh, so an internet connection is currently required. pdf-lib is bundled.

## One-time forms and download

Resume data and photos live only in React memory for the current page.
Nothing is saved to a database, cookies, localStorage, or sessionStorage.
Reloading or closing the page clears the form. Starting a new resume resets it.
The PDF is generated in the browser; resume details are not uploaded.
Legacy drafts from older versions are removed when the app opens.

The download button appears after full name, professional title, valid email,
and summary are filled in. Other fields are optional. If an experience or
education entry is started, its title/degree, company/school, and dates must
be completed or the entry removed. There are no download limits, accounts,
or usage counters. Downloading leaves the form available for corrections;
use Start new resume to begin another form.

## Open source

The application source is provided under the MIT license (see `LICENSE`).
Anyone may use, modify, redistribute, or self-host it, including commercially.
React and pdf-lib retain their separate MIT licenses; see `THIRD_PARTY_NOTICES.md`.
No public source repository has been created yet. Publish this folder to a
repository to make the source publicly accessible.

## Verification and limitations

Run `npm test` to check PDF generation and pagination, and
`node verify-validation.mjs` to check form completion rules.
The ATS template uses a single column and standard headings; individual ATS
compatibility varies. PDF fonts currently support Latin text. Full support
for other writing systems requires embedded fonts.

## Free GitHub Pages hosting

1. Create a public GitHub repository named iwantresume.
2. Upload the contents of this project folder to the repository root, keeping
   dist/, docs/, LICENSE, and other source files in their existing structure.
3. Open Settings > Pages > Build and deployment.
4. Set Source to Deploy from a branch, select main, and select /docs. Save.
5. Wait for the Pages deployment to finish. GitHub displays the published URL,
   normally https://YOUR-USERNAME.github.io/iwantresume/.

After editing dist/, run `node prepare-pages.mjs` (or use the bundled Node
executable via its full path) and commit/upload the updated docs/ files too.
The site uses relative file URLs so it works under the repository subpath.
Do not upload the surrounding Side Projects repository or its .git folder.
No server, secrets, or API keys are required for this deployment.


## Resume fonts

Choose Helvetica, Times Roman, or Courier. The selected family applies to both
the live preview and the PDF, including bold headings. PDF line wrapping uses
actual font metrics. The summary is written manually; there is no AI runtime,
model download, or summary assistant.

## Flexible experience and portfolio

Add as many employment, OJT, internship, freelance, volunteer, or other
experience entries as needed. Portfolio projects support personal, academic,
capstone, thesis, and other projects, with optional role, organization, dates,
and tools plus a project name and description. Started projects need a name
and description before PDF download becomes available. Blank optional entries
are omitted. Experience and projects appear in both formats.

Optional additional personal information includes birthday, gender, civil
status, religion, mother's maiden name, and father's name. Filled values
appear in both resume formats. These details remain in memory and are cleared
with the form; they are not uploaded or saved.

## Reference-inspired ATS layout

The ATS layout uses a centered uppercase name and stacked contact details,
burgundy headings with thin rules, company/school names above italic roles
and degrees, right-aligned dates and optional locations, and bulleted skills.
Times Roman is the default; the font selector still controls both formats.
Experience and education now include optional location fields; education also
supports optional details/achievements. Export remains selectable text.

Education precedes work experience in both the live preview and PDF.

## Download options

Completed forms show PDF and editable Word (.docx) download buttons above the
sample/reset controls at the bottom. Both exports run in the browser, without
saving user information. Word files use the selected font and include summary,
personal information, education, experience, projects, skills, certifications,
and an optional regular-format photo. Header spacing is kept compact.
The bundled docx library is MIT licensed. DOCX package generation and XML
checks pass; visual rendering could not be verified because LibreOffice is
unavailable in this environment. Check final pagination in Word before sending.
