# Provoice design-system architecture

The dependency direction is strictly one-way:

1. `src/design-system/styles/variables.css` — canonical typography and color tokens
2. `src/design-system/components` — reusable components consuming tokens
3. `src/design-system/patterns` — templates composed from components
4. `src/pages/Layout` — final layout composed from templates

Change colors and typography in `variables.css`. The Colors and Typography documentation pages read the same CSS variables, so the documentation, components, templates, and final layout update together.

Do not add page imports inside tokens or components. Do not recreate component markup directly inside `LayoutPage.tsx`.

## Versions

Stable versions are stored as Git tags. The current version is `0260907-ver2`.

- Inspect: `git show 0260907-ver2`
- Temporarily run: `git switch --detach 0260907-ver2 && npm run dev`
- Return to latest: `git switch main`
- Restore into a new branch: `git switch -c restore/0260907-ver2 0260907-ver2`

The Layout page version selector displays the available design version metadata. Add future versions to `layoutVersions` and create a matching Git tag.
