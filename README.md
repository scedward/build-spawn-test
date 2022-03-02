# build-spawn-test

The CDK stack in `test_stack.ts` deploys a CodeBuild project that runs `build-args-shell-test.js`.
This script uses `spawnSync` to build a simple Dockerfile with 4 combinations of providing/not providing
`--build-arg FOO=$FOO` and using/not using the `shell` option of `spawnSync`. It then runs each
image to illustrate the behavior of `--build-arg FOO=$FOO` with/without a shell environment.

Expected behavior of `--build-arg FOO=$FOO` substitution:

|                      | No shell             | /bin/sh             |
|----------------------|----------------------|---------------------|
| No --build-arg       | FOO should be empty  | FOO should be empty |
| --build-arg FOO=$FOO | FOO should be '$FOO' | FOO should be 'bar' |

Observed output from running the CodeBuild project:

```
...
[Container] 2022/03/02 18:28:14 Entering phase BUILD
[Container] 2022/03/02 18:28:14 Running command node build-args-shell-test.js
process.env.FOO is: bar
building images...
no-build-args-no-shell: FOO is: ()
build-args-no-shell: FOO is: ($FOO)
no-build-args-with-shell: FOO is: ()
build-args-with-shell: FOO is: (bar)

...
```
