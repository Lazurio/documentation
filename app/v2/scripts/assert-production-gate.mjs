import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { assertProductionSource } from './production-source-gate.mjs'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const moduleRoot = path.resolve(scriptDirectory, '../../..')
const git = (args) => execFileSync('git', args, { cwd: moduleRoot, encoding: 'utf8' }).trim()
const head = git(['rev-parse', 'HEAD'])
assertProductionSource({
  head,
  approvedHead: process.env.LAZURIO_DOCUMENTATION_APPROVED_SHA,
  status: git(['status', '--porcelain']),
  branch: git(['branch', '--show-current']),
  environment: process.env,
})
console.log(`Production gate accepted reviewed HEAD ${head}.`)
