<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Filter resource-page course lists locally from the canonical curriculum by name or whitespace-normalized course code; this preserves year/semester placement without additional network requests.
- Derive the common SEC materials list from canonical skill-course entries, with supplemental named uploads in the SEC data module when no semester is specified; retain semester entries and their common-page links to avoid inventing placement. Keep SEC material URLs and coverage in that module for consistent display.
- Centralize website visual styling in global semantic tokens and shared UI components so all pages stay consistent without changing their content or layout structure.
- Fetch the university announcement ticker through a public server function and parse HTML with bundled linkedom; use only explicit publication dates, never deadlines, for ordering and NEW badges.
- Keep university search, category and pagination in route search parameters and render the uploaded calendar in a shared image viewer; this keeps navigation restorable and fallback views complete.
