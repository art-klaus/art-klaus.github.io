# Klaus Tenorio portfolio

A static portfolio for GitHub Pages. The layout draws on the clean navigation and two-column work gallery in [Vincexodus/Art-Portfolio](https://github.com/Vincexodus/Art-Portfolio), adapted for Klaus's artwork and text.

## Preview

Open `index.html` in a browser, or run a local static server:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000/`.

## Publish at `art-klaus.github.io`

1. Create a public repository named `art-klaus.github.io` under the `art-klaus` GitHub account.
2. Add `index.html`, `laminart.html`, `styles.css`, `site.js`, and `assets/` to the repository root.
3. In the repository settings, enable GitHub Pages from the default branch and root folder.

The original artwork folders and PDF are source material and do not need to be deployed. All images used on the site are optimized WebP copies in `assets/images/`, including browser-compatible versions of the two HEIC photos. The LaminART source folders have relative variation names, but provide no exact measurements, so the site does not claim dimensions.
