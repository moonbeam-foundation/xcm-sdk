# Documentation for the XCM SDK

## Publishing New Versions

To add the very first version, you’ll need to push the latest changes to the `main` branch and then in your terminal run:

```bash
mike deploy --push INSERT_NEW_VERSION latest
```

Where the version should be formatted like `v0`, as we only need to worry about maintaining documentation for major version changes.

For additional versions, you'll need to run:

```bash
mike deploy --push --update-aliases INSERT_NEW_VERSION latest
```

## Publishing Changes to a Specific Version

To make minor updates to the current version or an older version, you’ll need to make the changes to the `main` branch and then in your terminal run:

```bash
mike deploy --push INSERT_VERSION
```

If using the latest version, you can cross-reference the live website, or the `gh-pages` branch to get the version that needs to be provided to the above command.

## Setting a Default Version

After setting the `latest` alias as the default version, and when publishing a new version, always update the alias to point to the latest version by running:

```bash
mike set-default --push latest
```

When publishing a new version, this will create a redirect in the root of the documentation to the version associated with the alias. So, `https://moonbeam-foundation.github.io/xcm-sdk/` will redirect to `https://moonbeam-foundation.github.io/xcm-sdk/latest/`.
