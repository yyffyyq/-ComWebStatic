import re
import sys
from pathlib import Path
from typing import List, Tuple


def check_hardcoded_breakpoints(file_path: Path) -> List[Tuple[int, str]]:
    """
    检查 SCSS/Vue 文件中是否存在硬编码的像素断点值，确保响应式规范落地。

    Args:
        file_path: 需要检查的源代码文件路径。

    Returns:
        包含违规行号和代码内容的元组列表。若列表为空则表示校验通过。
    """
    violations: List[Tuple[int, str]] = []
    # 匹配媒体查询中的硬编码像素值，如 @media (max-width: 768px)
    media_query_pattern = re.compile(r'@media.*?\b\d+px\b')

    with open(file_path, 'r', encoding='utf-8') as f:
        for line_num, line in enumerate(f, start=1):
            stripped_line = line.strip()
            # 忽略注释和 SCSS 变量定义行
            if stripped_line.startswith('//') or stripped_line.startswith('$'):
                continue

            if media_query_pattern.search(stripped_line):
                violations.append((line_num, stripped_line))

    return violations


def main() -> None:
    """
    主执行函数，遍历 src 目录并执行硬编码断点检查。
    若发现违规，输出错误信息并以非零状态码退出，阻断提交。
    """
    src_dir = Path('src')
    target_extensions = {'.vue', '.scss'}
    has_errors = False

    for file_path in src_dir.rglob('*'):
        if file_path.suffix in target_extensions:
            errors = check_hardcoded_breakpoints(file_path)
            if errors:
                has_errors = True
                print(f"[Error] 发现硬编码断点: {file_path}")
                for line_num, code in errors:
                    print(f"  -> Line {line_num}: {code}")

    if has_errors:
        print("\n校验失败：请使用 SCSS 变量（如 $breakpoint-mobile）替代硬编码像素值。")
        sys.exit(1)
    else:
        print("校验通过：未发现硬编码断点。")
        sys.exit(0)


if __name__ == '__main__':
    main()
