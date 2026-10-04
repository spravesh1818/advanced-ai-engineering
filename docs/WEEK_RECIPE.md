# How a week is made

This is the recipe we follow for every week, learned from taking apart the
[lfconnect-genai-b2](https://spravesh1818.github.io/lfconnect-genai-b2/index.html) course site and raising the bar for an *advanced* course.

## What that site does (and we copy)

| Idea | Their version | Ours |
|---|---|---|
| **One theme per week** | Each week is a metaphor with its own palette, fonts and decor: *The Interpreter* (code editor), *The Black Box* (neon), *The Workflow Canvas*, *The Manuscript*, *The Blueprint*, *The Card Catalog*. It repeats on the week page **and** on every deck of that week. | Six themes in `assets/css/themes.css`, same idea, all built from our hand-drawn sketch parts. See `themes.html`. |
| **A week page is a table of contents** | One card per class: title, one-line summary, `Start →` (deck) and `▶ Open in Colab`. | One row per day: title, summary, three things you leave able to do, `Open deck →` and `▶ Open in Colab`. |
| **A deck and a notebook for every class** | `class-N.html` + `class-N.ipynb`, same name, linked from the week page. | Same (`class-N.html`, `class-N.ipynb`). |
| **Notebooks follow one shape** | Title + objectives, a setup cell (Groq key from Colab Secrets, `.env` fallback, friendly "no key" message), numbered sections, a closing "next class" note, then **Challenges** with `# TODO` starter cells and no solutions. | Same, and each Challenge is tied to a slide. |
| **A cumulative assignment** | `assignment.ipynb` per week (a `HW` row on the week page). | Planned for Week 1 (not written yet). |
| **Spec, then plan, then build** | `docs/superpowers/specs/*-design.md` (goals, non-goals, notebook design, how to verify) and `plans/*.md`, written before the files. | Write a short spec like that before each week. |
| **Fixed 16:9 deck stage** | 1920 x 1080, scaled to fit, `data-editable` text so the instructor can fix wording live. | Same stage (`deck.js`), plus the Q panel of likely questions. |
| **Wide pages** | 1180 to 1280 px. | 1600 px (`--page-max` in `assets/css/site.css`). |

## Where we go further

- Every week page lists **what you leave able to do** per day, and **what you have at the end of the week**.
- Locked weeks and days still show **their own paper and colours** (dashed, with a "Coming soon" sticker), so the course looks finished before it is.
- Week pills in the header (1 to 6), each in its own week's colours.
- Chalkboard (dark) version of **every** theme, remembered between pages and decks.
- Notebooks are tested in the three situations a student can be in: Colab with the secret, Colab without it, and a normal computer.

## The six themes

| Week | Theme | The idea | Paper | Heading font | Bottom edge |
|---|---|---|---|---|---|
| 1 | The Sketchbook | a notebook page, yellow highlighter, red pen | dotted | Kalam | red wave |
| 2 | The Blueprint | drafting paper, patterns drawn as diagrams | blue grid | Architects Daughter | blue dashed line |
| 3 | The Index Cards | ruled cards, one idea per card | ruled lines | Gloria Hallelujah | red line |
| 4 | The Sticky Wall | a team whiteboard of sticky notes | big dots | Permanent Marker | dotted line |
| 5 | The Control Room | graph paper, the checklist before launch | graph grid | Special Elite | hazard tape |
| 6 | The Recording Booth | a studio at night | sound-bar stripes | Gochi Hand | waveform |

## Checklist: adding week N

1. **Spec** (short): goal, the four days, what each notebook builds, how you will test it.
2. **Decks**: copy `week-1/class-1.html`, put `data-week="N"` on `<html>`, add `<link rel="stylesheet" href="../assets/css/themes.css">` after the deck CSS, and add the week's heading font to the Google Fonts link (copy the family name from the `<link>` in `themes.html`). Then open every slide at 1920 x 1080 and check nothing overflows (some fonts are wider).
3. **Notebooks**: `class-N.ipynb` with objectives, setup cell, numbered sections, closing note and Challenges. Outputs cleared.
4. **Week page**: copy `week-1/index.html`, set `data-week="N"` on `<html>`, edit the four day rows.
5. **Home page**: in `index.html` turn the week's locked `<div class="card locked">` into an `<a class="card ready" href="week-N/index.html">`, and in the header make its pill a link.
6. Push, then check every **Open in Colab** button opens.
