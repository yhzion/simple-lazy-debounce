
# Changelog
## [v0.0.24] - 2024-09-06
- Updated Rollup configuration to correctly handle dts plugin, fixing type generation errors during build.
-	Ensured index.d.ts is properly generated during the build process.

## [v0.0.23] - 2024-09-06
### Fixed
- Added missing TypeScript type definitions to resolve issue #5.
- Updated `tsconfig.json` to correctly handle `index.ts` located outside the `src` folder, resolving issue #6.

## [v0.0.22] - 2024-09-06
- Fixed issue #4 where the entry point misconfiguration caused the library to fail when imported.

## [v0.0.21] - 2024-09-05
### Added
- Migrated the codebase to TypeScript to enhance type safety and improve code quality.
- Updated build and test scripts to support TypeScript.
- Generated TypeScript declaration files (`.d.ts`) for library usage.

### Fixed
- Resolved various type-related issues during the migration process to adhere to TypeScript's strict type-checking.

### Objective
- Migrate the existing JavaScript codebase to TypeScript to enhance type safety, improve code quality, and enable better development tooling.

### Migration Plan
- **Set Up TypeScript:**
  - Install TypeScript and create a `tsconfig.json` configuration file.
  - Configure TypeScript to target ES6 and include appropriate module resolution strategies.
- **Incremental Migration:**
  - Start by renaming `.js` files to `.ts`.
  - Gradually add type annotations to the existing functions and modules.
  - Refactor the codebase to adhere to TypeScript's strict type-checking, fixing any type-related issues that arise.
- **Update Build and Test Scripts:**
  - Modify existing build scripts to compile TypeScript files.
  - Ensure that testing frameworks (e.g., Jest) are configured to work with TypeScript.
- **Generate Type Declarations:**
  - Ensure that TypeScript generates `.d.ts` declaration files for the library, enabling TypeScript users to benefit from type definitions.
- **Documentation:**
  - Update the documentation to reflect the new TypeScript setup.
  - Provide guidance on how to contribute to the TypeScript codebase.

### Expected Benefits
- **Improved Code Quality:** TypeScript’s static type checking will help catch errors at compile time, reducing runtime errors and improving overall code reliability.
- **Enhanced Developer Experience:** With TypeScript, developers will benefit from better tooling, including autocompletion, refactoring support, and more informative error messages.
- **Easier Maintenance:** The type annotations will make the codebase easier to understand and maintain, especially as the project grows.
- **Wider Adoption:** Providing type declarations will make the library more attractive to TypeScript users, potentially increasing its adoption.

## [v0.0.20] - 2024-09-05
### Added
- Updated `SimpleLazyDebounce` to correctly pass arguments to the callback function.

### Fixed
- Resolved issue #3 where arguments were not correctly passed to the callback function in the debounced function.
