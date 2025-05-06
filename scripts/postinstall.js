const { execSync } = require('child_process')
if (process.env.NODE_ENV !== 'production') {
  console.log('Running postinstall tasks for dev...')
  execSync('prisma generate', { stdio: 'inherit' })
  execSync('prisma db seed', { stdio: 'inherit' })
} else {
  console.log('Running postinstall tasks for production...')
  execSync('prisma generate', { stdio: 'inherit' })
  execSync('prisma migrate deploy', { stdio: 'inherit' })
  execSync('npm run seed', { stdio: 'inherit' })
}
