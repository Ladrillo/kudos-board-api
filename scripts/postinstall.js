const { execSync } = require('child_process')
execSync('prisma generate', { stdio: 'inherit' })
if (process.env.NODE_ENV === 'production') {
  console.log('Running postinstall tasks for production...')
  execSync('prisma migrate deploy', { stdio: 'inherit' })
}
execSync('npm run prisma:seed', { stdio: 'inherit' })
