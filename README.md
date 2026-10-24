# iwantresume

A React.js resume builder with optional Ollama-powered AI enhancement. Resume
drafts remain in browser memory; no account or database is used.
Choose an ATS or regular template, fill in the form, preview it, and download
a selectable-text A4 PDF. Regular resumes support an optional photo.

## Run locally

On Windows, double-click `start.cmd`, or run `./start.cmd` in PowerShell.
With Node.js on PATH, use `npm run dev` or `node serve.mjs`.
Open http://127.0.0.1:4173 and keep the terminal running.
No dependency installation or build step is needed. React 18.3.1 loads from
esm.sh, so an internet connection is currently required. pdf-lib is bundled.

## AI enhancement with Ollama Cloud

AI enhancement works through the local Node server. On first setup, copy the
example file to `.env`, add a newly created Ollama API key, and start the app:

```powershell
if (!(Test-Path .env)) { Copy-Item .env.example .env }
notepad .env
npm run dev
```

Set `OLLAMA_API_KEY` in `.env`; `OLLAMA_MODEL` defaults to `gpt-oss:20b`.
The server reads `.env` when it starts, so restart it after changing the file.
`.gitignore` excludes `.env`, other `.env.*` files, and private key files.
Keep real credentials in `.env`; `.env.example` contains only a placeholder.

Use **Enhance with AI** beside a supported text field, review the suggestion,
then choose whether to apply it. The app sends only that field's text and its
role or section context to Ollama Cloud. It does not send your name, contact
details, photo, or the rest of the form. Ollama Cloud usage may be billed; see
[current Ollama pricing](https://ollama.com/pricing). The API key stays on the
server and must never be placed in browser JavaScript or committed to the repo.
If a key was ever committed or shared, revoke it and create a replacement.

The local Node server provides the secure API route. A static GitHub Pages
deployment cannot run that route, so AI enhancement there requires a separately
hosted server-side endpoint with its own protected API key.

## One-time forms and download

Resume data and photos live only in React memory for the current page.
Nothing is saved to a database, cookies, localStorage, or sessionStorage.
Reloading or closing the page clears the form. Starting a new resume resets it.
The PDF is generated in the browser. Resume details stay in the browser unless
you explicitly request an AI suggestion for a text field.
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
The source repository is [hiznalc/iwantresume](https://github.com/hiznalc/iwantresume).

## Verification and limitations

Run `npm test` to check PDF generation and pagination, and
`node verify-validation.mjs` to check form completion rules.
The ATS template uses a single column and standard headings; individual ATS
compatibility varies. PDF fonts currently support Latin text. Full support
for other writing systems requires embedded fonts.

## Free GitHub Pages hosting

The repository includes a GitHub Actions workflow that deploys `docs/` whenever
changes are pushed to `main`. For the first deployment, open Settings > Pages
> Build and deployment and set Source to **GitHub Actions**. After the workflow
finishes, the site will be available at
https://hiznalc.github.io/iwantresume/.

After editing dist/, run `node prepare-pages.mjs` (or use the bundled Node
executable via its full path) and commit/upload the updated docs/ files too.
The site uses relative file URLs so it works under the repository subpath.
Do not upload the surrounding Side Projects repository or its .git folder.
The static deployment supports resume editing and downloads. AI enhancement
needs the local Node server or a separately deployed server-side endpoint; the
GitHub Pages site cannot run `serve.mjs`. Keep the Ollama API key on the server
and out of Pages source files.


## Resume fonts

Choose Helvetica, Times Roman, or Courier. The selected family applies to both
the live preview and the PDF, including bold headings. PDF line wrapping uses
actual font metrics. AI enhancement can refine summaries, experience and
education details, project descriptions, skills, and certifications through
Ollama Cloud; no model is downloaded to the user's computer.

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
