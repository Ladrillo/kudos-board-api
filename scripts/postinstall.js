const { execSync } = require('child_process');

function run(cmd) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

run('prisma generate');

if (process.env.NODE_ENV === 'production') {
  console.log('Running production postinstall tasks...');
  run('prisma migrate deploy');
}

run('prisma db seed');
