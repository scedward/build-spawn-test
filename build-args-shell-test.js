const { spawnSync } = require('child_process');

console.log(`process.env.FOO is: ${process.env.FOO}`)
console.log('building images...')
spawnSync('docker', ['build', '--tag', 'no-build-args-no-shell', '.'])
spawnSync('docker', ['build', '--tag', 'no-build-args-with-shell', '.'], { shell: '/bin/sh' })
spawnSync('docker', ['build', '--tag', 'build-args-no-shell', '--build-arg', 'FOO=$FOO', '.'])
spawnSync('docker', ['build', '--tag', 'build-args-with-shell', '--build-arg', 'FOO=$FOO', '.'], { shell: '/bin/sh' })

console.log(`no-build-args-no-shell: ${spawnSync('docker', ['run', 'no-build-args-no-shell']).stdout}`)
console.log(`no-build-args-with-shell: ${spawnSync('docker', ['run', 'no-build-args-with-shell']).stdout}`)
console.log(`build-args-no-shell: ${spawnSync('docker', ['run', 'build-args-no-shell']).stdout}`)
console.log(`build-args-with-shell: ${spawnSync('docker', ['run', 'build-args-with-shell']).stdout}`)
