The pages you are seeing at this moment right now is hosted on the [JCM-Docs](https://github.com/DistrictOfJoban/JCM-Docs) github repository. It is powered by [Material for Mkdocs](https://squidfunk.github.io/mkdocs-material/) and uses the [Markdown format](https://commonmark.org/help/) for writing.

## Adding new pages
To add a new page, simply add a new markdown (.md) file in the relevant location within the `docs` folder.

The navigation tree of this site is located in the `nav` section within the `mkdocs.yml` in the root folder.  
As such, you also need to modify the relevant section in the yml to make your new page accessible in the navigation menu.

## Custom pages
Custom HTML templates (Like the Homepage we have) can be inserted by putting an ordinary html file to the `overrides` folder. Then, add the following to the top of the markdown pages you want to apply to:
```
---
template: <your_html_file>.html
---
```

You can also dynamically insert html content as Mkdocs uses [Jinja](https://jinja.palletsprojects.com/en/stable/) as its templating engine.

For an example, see:

- `docs/index.md` and `overrides/home.html`
- `docs/nerds/neojcm/neojcm.md` and `overrides/neojcm.html`
- `docs/players/blocks/index.md` and `overrides/blocks.html`