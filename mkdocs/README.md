# Documentation for the XCM SDK

## Publishing New Versions

To add a new version, you’ll need to push the latest changes to the `main` branch and then in your terminal run:

```bash
mike deploy --push INSERT_NEW_VERSION latest
```

Where the version should be formatted like `v0`, as we only need to worry about maintaining documentation for major version changes.

## Publishing Changes to the Current Version

To make minor updates to the current version, you’ll need to push the changes to the `main` branch and then in your terminal run:

```bash
mike deploy --push INSERT_CURRENT_VERSION
```

You can cross-reference the live website, or the `gh-pages` branch to see the latest version that needs to be provided to the above command.
