# OrbisLex

MASTER PROMPT — 3D LEGAL AI DOCUMENT SUMMARIZATION PLATFORM

You are an expert full-stack engineer, UI/UX designer, 3D web developer, AI/NLP engineer, and software architect.

Build a complete, production-quality web application for my B.Tech final-year project:

LEGAL DOCUMENT SUMMARIZATION FOR INDIAN COURTS USING EXTRACTIVE–ABSTRACTIVE HYBRID TRANSFORMER MODEL

The application must look like a serious Legal AI research platform, not a generic dashboard or ordinary college project.

The design should be premium, cinematic, futuristic, professional, and 3D, while remaining highly usable and academically appropriate.

1. CORE OBJECTIVE

Create a web application where a user can:

Upload an Indian legal document/PDF.

Extract text from the document.

Display document information.

Process the legal text.

Perform extractive summarization.

Perform abstractive summarization.

Combine both approaches through a hybrid summarization pipeline.

Display the final generated legal summary.

Show important extracted sentences.

Show key legal information.

Display processing/evaluation information.

Allow the user to compare the original document with the generated summary.

Provide a clear explanation of how the AI pipeline processed the document.

The application should visually communicate that this is a research-oriented Legal NLP system.

2. TECHNOLOGY STACK

Use technologies compatible with Lovable:

React

Vite

TypeScript

Tailwind CSS

Modern component architecture

shadcn/ui where appropriate

Three.js / React Three Fiber for 3D

Framer Motion for UI animations

GSAP where useful

Lucide icons

Supabase if persistent storage/authentication is required

Do NOT use Next.js.

Do NOT introduce unnecessary frameworks.

Keep the architecture modular and maintainable.

3. VISUAL DIRECTION

The visual identity should combine:

Indian Judiciary + Artificial Intelligence + Legal Documents + Neural Networks + Advanced Research Laboratory

Think of the interface as a futuristic Legal AI Research Command Center.

The design should be:

Dark

Premium

Cinematic

Minimal

High-tech

Professional

Research-oriented

Slightly futuristic

3D

Responsive

Avoid:

Generic SaaS dashboard designs

Excessive gradients

Cartoonish illustrations

Excessive glowing effects

Cheap-looking glassmorphism

Random 3D objects

Overloaded screens

Unnecessary animations

The application must still look appropriate for a university research project.

4. 3D HERO EXPERIENCE

Create a visually impressive 3D landing page.

The hero section should contain a sophisticated interactive 3D scene representing:

Legal Document → AI Processing → Neural Network → Generated Summary

Possible visual concept:

A floating stack of legal documents in the center.

Around the documents:

Floating data particles

Neural-network nodes

Connecting lines

Digital document fragments

AI processing rings

Subtle orbital elements

The 3D scene should react subtly to mouse movement.

Use depth, lighting, particles, and motion carefully.

Do NOT sacrifice performance for visual effects.

Add graceful fallback behavior for devices that cannot handle heavy WebGL rendering.

5. HERO CONTENT

Display:

Small badge

AI • NLP • LEGAL TECHNOLOGY

Main heading

Transforming Complex Legal Documents into Clear, Intelligent Summaries

Supporting text

Explain that the system uses a hybrid extractive–abstractive Transformer-based approach to simplify lengthy Indian legal documents while preserving important legal information.

Primary CTA:

Analyze Legal Document

Secondary CTA:

Explore How It Works

Add a subtle scroll indicator.

6. NAVIGATION

Create a premium navigation bar.

Navigation:

Home

Summarize

How It Works

Research

About

Right side:

Launch Analyzer

The navigation should become compact/sticky while scrolling.

Use smooth scrolling and page transitions.

7. DOCUMENT ANALYZER

Create the main application interface.

This is the most important functional page.

Design it as a professional AI analysis workspace.

Layout:

LEFT:

Document input/upload area.

RIGHT:

AI processing / summary output.

The upload area should support:

PDF upload

Drag and drop

File selection

File information

File size

Page count where available

Remove/replace document

Display:

Drop your legal document here

and:

PDF • Indian Court Judgments • Legal Documents

Include a prominent:

Analyze Document

button.

8. ANALYSIS EXPERIENCE

After the user clicks Analyze:

Do NOT simply show a loading spinner.

Create a sophisticated AI processing animation.

Show sequential stages:

Document ingestion

Text extraction

Text preprocessing

Sentence segmentation

Legal content identification

Extractive ranking

Important sentence selection

Abstractive generation

Hybrid integration

Summary validation

Final summary

Display these stages as a visual pipeline.

Use animated progress indicators.

The user should feel that an actual NLP pipeline is processing the document.

9. AI PIPELINE VISUALIZATION

Create an interactive architecture section.

Show:

LEGAL PDF
     ↓
TEXT EXTRACTION
     ↓
PREPROCESSING
     ↓
SENTENCE SEGMENTATION
     ↓
EXTRACTIVE SUMMARIZATION
     ↓
IMPORTANT SENTENCES
     ↓
ABSTRACTIVE TRANSFORMER
     ↓
HYBRID INTEGRATION
     ↓
FINAL LEGAL SUMMARY


Represent this visually using animated nodes and connections.

The pipeline should be one of the main visual highlights of the project.

10. SUMMARY RESULT PAGE

After processing, create a professional result dashboard.

Display:

Document Overview

Document name

Number of pages

Original word count

Summary word count

Compression ratio

Processing time

Generated Summary

Display the final summary inside a highly readable legal document panel.

Add:

Copy

Download

Regenerate

Expand

Collapse

controls.

11. EXTRACTIVE SUMMARY

Create a separate section:

Important Extracted Sentences

Display the most relevant sentences identified by the extractive stage.

Each sentence should have:

relevance score

rank

sentence number

Use visual ranking indicators.

Example:

Relevance: 94%

Do not fabricate scores when actual processing is unavailable.

If the backend is not yet connected, clearly label demonstration values as:

Demo / Prototype

12. ABSTRACTIVE SUMMARY

Create another section:

AI Generated Summary

Explain that this stage generates a concise representation of the legal document using a Transformer-based abstractive summarization approach.

Show the generated text clearly.

13. HYBRID SUMMARY

Make the hybrid result the primary output.

Explain visually:

Extractive Stage

Preserves important factual/legal information.

↓

Abstractive Stage

Produces a concise and readable representation.

↓

Hybrid Stage

Combines information preservation with readability.

The final hybrid summary should be visually emphasized.

14. LEGAL INFORMATION PANEL

Where possible, extract/display:

Case title

Court

Judgment date

Case number

Judges

Parties

Legal sections

Acts mentioned

Important entities

Use a clean structured information panel.

If the information cannot actually be extracted, do not invent it.

15. RESEARCH DASHBOARD

Create a dedicated section called:

Research & Evaluation

Display metrics such as:

ROUGE-1

ROUGE-2

ROUGE-L

BERTScore

Compression Ratio

Processing Time

Use charts and visualizations.

IMPORTANT:

Do not claim fabricated experimental results.

When no real experiment has been connected yet, clearly display:

Awaiting Experimental Data

or:

Prototype Metric

16. EXPLAINABLE AI SECTION

Create:

Why This Summary?

Show the sentences or information that contributed most strongly to the final summary.

Use visual highlighting.

For example:

Original document:

Important legal sentence highlighted.

Then show:

Selected by Extractive Model

Then:

Used by Abstractive Model

Then:

Included in Final Summary

This makes the project more explainable and research-oriented.

17. HOW IT WORKS

Create a cinematic scrolling section explaining the complete system.

Sections:

01 — Upload

User uploads a legal PDF.

02 — Extract

Text is extracted from the document.

03 — Understand

The system preprocesses and analyzes legal language.

04 — Rank

Important sentences are identified.

05 — Generate

The Transformer generates a concise summary.

06 — Validate

The final summary is evaluated.

07 — Present

The user receives an understandable legal summary.

Use scroll-triggered animations.

18. RESEARCH SECTION

Create a section explaining the academic foundation.

Include cards for:

Legal NLP

Transformer Models

Extractive Summarization

Abstractive Summarization

Hybrid Summarization

Indian Legal Documents

Present this as a research timeline / knowledge network rather than ordinary cards.

19. ARCHITECTURE VISUALIZATION

Create an interactive architecture diagram containing:

User
 ↓
React Frontend
 ↓
Document Upload
 ↓
Text Extraction
 ↓
Preprocessing
 ↓
NLP Pipeline
 ↓
Extractive Model
 ↓
Abstractive Transformer
 ↓
Hybrid Summarization
 ↓
Evaluation
 ↓
Summary Interface


Use animated connections.

20. ABOUT PROJECT

Include:

Project:

Legal Document Summarization for Indian Courts

Degree:

B.Tech Computer Science & Engineering

Institution:

KCC Institute of Technology and Management

University:

Dr. A.P.J. Abdul Kalam Technical University

Project Team:

Jitendra Kumar
Om Tiwari

Guide:

Dr. Mohd. Wazih Ahmad

Make this section professional and academic.

21. 3D DESIGN SYSTEM

Use a sophisticated dark design system.

Primary visual inspiration:

Deep charcoal backgrounds

Dark navy surfaces

Subtle metallic tones

Controlled cyan/blue accents

White/off-white typography

Very subtle gold/legal accent where appropriate

Use semantic design tokens.

Do not hardcode colors repeatedly inside components.

Define colors in the design system.

Use:

glass panels

subtle borders

depth

shadows

controlled glow

gradients

blur

layered surfaces

But maintain readability and accessibility.

22. TYPOGRAPHY

Use a premium modern font combination.

Recommended:

Inter

Space Grotesk

IBM Plex Sans

Use strong typography hierarchy.

The project title should feel authoritative.

Body text must remain highly readable.

23. ANIMATION SYSTEM

Use animations intentionally.

Include:

page transitions

text reveal

fade-up

staggered animations

scroll-triggered animations

subtle parallax

3D mouse interaction

animated neural connections

document floating animation

progress animations

hover micro-interactions

Do NOT animate everything.

Animations should communicate:

intelligence → processing → transformation

Respect prefers-reduced-motion.

24. RESPONSIVENESS

The application must work properly on:

Desktop

Laptop

Tablet

Mobile

On mobile:

simplify the 3D scene

reduce particle count

stack layouts

maintain readable typography

preserve core functionality

25. PERFORMANCE

3D must not destroy performance.

Implement:

lazy loading where appropriate

optimized 3D rendering

reduced particle count on mobile

animation cleanup

component-level code organization

avoid unnecessary rerenders

Use lightweight effects whenever possible.

26. FUNCTIONALITY

The UI should be structured so that real NLP/ML backend functionality can be connected later.

Separate:

Frontend

React + TypeScript

Processing Layer

NLP/ML API

Storage

Supabase if required

Do not fake a real AI backend and present it as production functionality.

If backend functionality is not available yet, build a clearly identifiable prototype/demo mode.

27. CODE QUALITY

Use:

reusable components

clean TypeScript

modular architecture

meaningful names

small focused components

proper error handling

loading states

empty states

responsive layouts

Avoid:

monolithic components

duplicated code

unnecessary dependencies

placeholder UI that looks unfinished

28. SEO

Implement proper:

title

meta description

semantic HTML

accessible headings

image alt text

canonical URL

responsive viewport

structured data where applicable

Use exactly one primary H1 per page.

29. IMPORTANT IMPLEMENTATION RULE

Before implementing anything:

Inspect the existing project.

Understand its current architecture.

Reuse existing components where appropriate.

Do not unnecessarily rewrite working code.

Create a proper design system first.

Then implement the application in modular phases.

Verify that the application builds successfully.

Do not create unnecessary features.

30. DEVELOPMENT PHASES

Build the project in these phases.

PHASE 1

Create:

design system

navigation

3D hero

landing page

typography

responsive foundation

PHASE 2

Create:

document analyzer

PDF upload

analysis interface

processing animation

NLP pipeline visualization

PHASE 3

Create:

summary dashboard

extractive summary

abstractive summary

hybrid summary

legal information panel

PHASE 4

Create:

research dashboard

evaluation metrics

explainability

architecture visualization

research section

PHASE 5

Polish:

animations

accessibility

responsive behavior

performance

loading states

error states

empty states

visual consistency

31. CRITICAL RULE

Do not make this look like a generic AI chatbot.

This is a:

LEGAL AI DOCUMENT INTELLIGENCE PLATFORM

The primary visual metaphor is:

Legal Documents + Neural Intelligence + Transformation

The final application should look impressive enough for:

B.Tech project demonstration

faculty evaluation

project viva

portfolio

GitHub showcase

internship/job portfolio

Build it with production-quality engineering and a premium 3D research-lab aesthetic.

Start by creating the foundation and first visual version. Keep the architecture ready for the actual NLP/Transformer backend to be connected later.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5c8f5ffd-9542-421b-997b-4610549d1c46).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
