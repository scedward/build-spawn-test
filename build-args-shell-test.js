const { spawnSync } = require('child_process');

spawnSync('docker', ['build', '--tag', 'no-build-args-no-shell', '.'], { stdio: 'inherit' })
spawnSync('docker', ['build', '--tag', 'build-args-no-shell', '--build-arg', 'FOO=$FOO', '.'], { stdio: 'inherit' })
spawnSync('docker', ['build', '--tag', 'no-build-args-with-shell', '.'], { shell: '/bin/sh', stdio: 'inherit' })
spawnSync('docker', ['build', '--tag', 'build-args-with-shell', '--build-arg', 'FOO=$FOO', '.'], { shell: '/bin/sh', stdio: 'inherit' })

console.log('==========')
console.log(`process.env.FOO is: ${process.env.FOO}`)
console.log(`no-build-args-no-shell: ${spawnSync('docker', ['run', 'no-build-args-no-shell']).stdout}`)
console.log(`build-args-no-shell: ${spawnSync('docker', ['run', 'build-args-no-shell']).stdout}`)
console.log(`no-build-args-with-shell: ${spawnSync('docker', ['run', 'no-build-args-with-shell']).stdout}`)
console.log(`build-args-with-shell: ${spawnSync('docker', ['run', 'build-args-with-shell']).stdout}`)

