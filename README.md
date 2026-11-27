# diez-table workspace

Angular workspace that builds and publishes the **diez-table** package (a responsive table with the `dz-` prefix).

| Path | What it is |
| --- | --- |
| `projects/diez-table` | The library. Its `README.md` is the documentation published on npm. |
| `projects/demo` | A demo app that uses the library (not published). Run it with `npm start`. |

## Develop

```bash
npm install
npm run build:lib     # builds dist/diez-table
npm start             # demo app (uses the built library, so build it first)
npm run test:lib      # library tests
```

## Publish to npm

The package is published as **`@diezproyectos/diez-table`**. Before the first release:

1. The npm organization `diezproyectos` must exist and your npm user must be a member allowed to publish in it (check at npmjs.com, *Organizations*). A scoped package needs this; without it `npm publish` fails with a 404 or 403.
2. Log in: `npm login`, then `npm whoami` to confirm the account.

Then, for each release:

1. Bump `version` in `projects/diez-table/package.json` (`0.1.0` for the first release, then follow semver).
2. Run the tests: `npm run test:lib`.
3. Review what will be published without publishing it: `npm run pack:lib` creates `diezproyectos-diez-table-<version>.tgz`; `tar -tzf` lists its contents.
4. Publish: `npm run publish:lib`. If your account has two-factor authentication, npm asks for the one-time code (or add `--otp=<code>`).
5. Check it: `npm view @diezproyectos/diez-table`.

`publishConfig.access` is already `public` in the library, and the script also passes `--access public`, because scoped packages are private by default (and private packages need a paid plan).

The package is published from `dist/diez-table`, never from the workspace root (the root `package.json` is `private`).

## Automatic publishing (GitHub Actions)

`.github/workflows/publish.yml` runs on every push to `main` (merged pull requests included) and on no other branch. It installs, runs the tests, builds, and publishes to npm **only if the version in `projects/diez-table/package.json` is not on npm yet**. A commit that does not bump the version only runs the tests and the build, because npm never accepts the same version twice.

To release: bump `version` in `projects/diez-table/package.json`, commit, and push to `main`.

One-time setup:

1. On npmjs.com, create a **granular access token** (Account → Access Tokens) with *Read and write* permission on the `@diezproyectos` scope. If your account uses two-factor authentication, enable the option that lets the token bypass it, since CI cannot type a code.
2. In the GitHub repository: Settings → Secrets and variables → Actions → *New repository secret*, name `NPM_TOKEN`, value the token.
3. Create the repository content and push it (see below).

The workflow only reads the token from that secret; never put the token in a file of the repository.

First push, from the project folder:

```bash
git init -b main
git add .
git commit -m "Initial commit"
git remote add origin git@github.com:diezproyectos/diez-table.git
git push -u origin main
```

If you publish `0.1.0` by hand first (`npm run publish:lib`), the workflow notices that the version exists and skips publishing, so there is no conflict.

## Try the package before publishing

```bash
npm run pack:lib
# in any Angular 22 app:
npm install /path/to/diezproyectos-diez-table-0.1.0.tgz
```
