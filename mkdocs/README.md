# Documentation for the XCM SDK

This directory contains the XCM SDK documentation found at [https://moonbeam-foundation.github.io/xcm-sdk/latest/](https://moonbeam-foundation.github.io/xcm-sdk/latest/). It is generated using [MkDocs](https://www.mkdocs.org/) and [Material for MkDocs](https://squidfunk.github.io/mkdocs-material).

These docs are versioned and rely on [mike](https://github.com/jimporter/mike) to deploy new versions and manage existing ones. **Any updates to the documentation site require you to use mike to deploy the changes**, pushing changes to the `main` branch will **not** automatically publish the changes to the live site. You need to follow the [deployment process](#deployment-process).

## Get Started 

Clone the `xcm-sdk` repository:

```bash
git clone https://github.com/moonbeam-foundation/xcm-sdk.git
```

Install the dependencies by navigating to the `mkdocs` directory and running:

```bash
pip install -r requirements.txt
```

This will install some essential dependencies, including MkDocs, Material for MkDocs, and mike.

## Deployment Process

The process for deploying new changes to the documentation site is as follows:

1. Make changes and merge them into the `main` branch
2. Run a `mike deploy` command to either [publish a new version](#publishing-new-versions) (which should only be done for major releases) or [publish changes to the current version](#publishing-changes-to-the-current-version)
3. Upon running the `deploy` command, mike will create a new Git commit on the `gh-pages` branch. When deploying changes to the current version, the previous docs for that version are erased and overwritten, but docs for other versions remain untouched
4. The new Git commit is picked up and published to the live docs site

Please note that modifying a previous version is possible, but should not be done unless necessary. It will require you to roll back changes to that version. For example, if the current version is v2 and you make a change and want to apply it to v0, the rest of the pages must be on v0, otherwise, the v2 changes will be applied to v0.

### Publishing New Versions

To add a new version for a major release, you'll need to run the following deployment command from the `mkdocs` directory:

```bash
mike deploy --push INSERT_NEW_VERSION
```

Where the version should be formatted like `v0`. We only need to worry about maintaining documentation for major version changes, so you shouldn't ever need to use `v0.1` or `v0.0.1` or anything along those lines.

**Note**: You can find the current version by looking at which version is the latest in the [`versions.json` file](https://github.com/moonbeam-foundation/xcm-sdk/blob/gh-pages/versions.json) on the `gh-pages` branch.

Then, you'll need to update the latest alias to the new version:

```bash
mike deploy --push --update-aliases INSERT_NEW_VERSION latest
```

Now when you go to the docs site, you'll be automatically taken to the new version.

### Publishing Changes to the Current Version

To make minor updates to the current version, you’ll need to run the following deployment command:

```bash
mike deploy --push INSERT_CURRENT_VERSION
```

**Note**: You can find the current version by looking at which version is the latest in the [`versions.json` file](https://github.com/moonbeam-foundation/xcm-sdk/blob/gh-pages/versions.json) on the `gh-pages` branch.

## Contributing

To contribute to the documentation, you'll need to make changes to the `mkdocs/docs` directory. Please follow the guidelines outlined in the [PaperMoon style guide](https://github.com/papermoonio/documentation-style-guide/blob/main/style-guide.md).

Once you've [cloned the repository and installed the dependencies](#get-started), you can make changes as needed, and view them locally on port 8000, by running:

```bash
mkdocs serve
```
