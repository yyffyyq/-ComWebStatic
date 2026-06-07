const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

/**
 * 获取 Git 暂存区中的文件列表
 */
function getStagedFiles() {
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=ACM', {
      encoding: 'utf-8',
    })
    return output.trim().split('\n').filter(Boolean)
  } catch {
    return []
  }
}

/**
 * 检查文件中是否存在硬编码的像素断点值
 */
function checkHardcodedBreakpoints(filePath) {
  const violations = []
  const mediaQueryPattern = /@media.*?\b\d+px\b/
  const lines = fs.readFileSync(filePath, 'utf-8').split('\n')

  lines.forEach((line, index) => {
    const stripped = line.trim()
    // 忽略注释和 SCSS 变量定义行
    if (stripped.startsWith('//') || stripped.startsWith('$')) return
    if (mediaQueryPattern.test(stripped)) {
      violations.push({ line: index + 1, code: stripped })
    }
  })

  return violations
}

// 主逻辑
const targetExtensions = ['.vue', '.scss']
let hasErrors = false

const stagedFiles = getStagedFiles()
const filesToCheck = stagedFiles.filter((file) =>
  targetExtensions.includes(path.extname(file)),
)

// 如果没有暂存的 .vue/.scss 文件，直接通过
if (filesToCheck.length === 0) {
  console.log('校验通过：本次提交无 .vue/.scss 文件变更。')
  process.exit(0)
}

for (const file of filesToCheck) {
  const fullPath = path.resolve(file)
  if (!fs.existsSync(fullPath)) continue
  const errors = checkHardcodedBreakpoints(fullPath)
  if (errors.length > 0) {
    hasErrors = true
    console.log(`[Error] 发现硬编码断点: ${file}`)
    errors.forEach(({ line, code }) => {
      console.log(`  -> Line ${line}: ${code}`)
    })
  }
}

if (hasErrors) {
  console.log('\n校验失败：请使用 SCSS 变量（如 $breakpoint-mobile）替代硬编码像素值。')
  process.exit(1)
} else {
  console.log('校验通过：未发现硬编码断点。')
  process.exit(0)
}
