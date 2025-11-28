---
description: Create a new release with version bump, changelog, and draft GitHub release
---

Create a new release for this npm package. Execute each step sequentially:

STEP 1: Analyze changes since last tag
Run git describe --tags --abbrev=0 to get the last tag, then run git log with that tag to HEAD to see all commits. Categorize commits by type (feat, fix, chore, etc.) to determine if this should be a major, minor, or patch release.

STEP 2: Ask user for version
Read current version from package.json. Use the AskUserQuestion tool to let the user choose between major, minor, or patch based on your analysis.

STEP 3: Update version files
Run npm version [patch|minor|major] --no-git-tag-version to update package.json and package-lock.json automatically without creating a git commit or tag.

STEP 4: Update CHANGELOG.md
Create or update CHANGELOG.md with a new section for this version. Include the date and group changes by category (Added, Changed, Fixed, Removed). Write human-readable descriptions based on the commit messages.

STEP 5: Create release commit and tag
Stage the changed files (package.json, package-lock.json, CHANGELOG.md) and create a commit with message "chore: release vX.Y.Z". Then create a git tag with the version number (vX.Y.Z format).

STEP 6: Push to remote
Push the commits to origin, then push the tags with git push --tags.

STEP 7: Build the package
Run npm run build and verify that dist directory contains index.js, index.cjs, index.umd.cjs, and index.d.ts files.

STEP 8: Create draft GitHub release
Use gh release create with --draft flag to create a draft release. Attach the built files from dist directory. Use the changelog section for this version as the release notes.

STEP 9: Show completion message
Display the release URL and remind the user that publishing the draft release on GitHub will automatically trigger npm publish via GitHub Actions.
