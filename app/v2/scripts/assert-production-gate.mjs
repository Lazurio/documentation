import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const moduleRoot = path.resolve(scriptDirectory, '../../..')
const git = (args) => execFileSync('git', args, { cwd: moduleRoot, encoding: 'utf8' }).trim()
const head = git(['rev-parse', 'HEAD'])
const approvedHead = process.env.LAZURIO_DOCUMENTATION_APPROVED_SHA

if (git(['status', '--porcelain']) !== '') {
  throw new Error('Production deployment requires a clean Git tree.')
}
if (!approvedHead || approvedHead !== head) {
  throw new Error(
    `Set LAZURIO_DOCUMENTATION_APPROVED_SHA to the exact reviewed HEAD (${head}) before production deployment.`,
  )
}
if (git(['branch', '--show-current']) !== 'main') {
  throw new Error('Production deployment requires the main branch.')
}
console.log(`Production gate accepted reviewed HEAD ${head}.`)
