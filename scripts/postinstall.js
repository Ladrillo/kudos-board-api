if (process.env.NODE_ENV === 'production') {
  const { execSync } = require('child_process')
  console.log('Running postinstall tasks for production...')
  execSync('npm prisma generate', { stdio: 'inherit' })
  execSync('npm prisma migrate deploy', { stdio: 'inherit' })
  execSync('npm prisma db seed', { stdio: 'inherit' })
} else {
  execSync('npm prisma generate', { stdio: 'inherit' })
  execSync('npm prisma db seed', { stdio: 'inherit' })
}
