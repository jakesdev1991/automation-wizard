#!/usr/bin/env python3
import sys
from pathlib import Path

MARKER_START = "===FILE:"
MARKER_END = "===END"

def parse_dump(dump_text: str):
files = []
current_path = None
current_lines = []

python
Copy code
for line in dump_text.splitlines(keepends=True):
    if line.startswith(MARKER_START):
        # flush previous file if any
        if current_path is not None:
            files.append((current_path, "".join(current_lines)))
            current_lines = []
        # extract path after "===FILE:"
        current_path = line[len(MARKER_START):].strip()
        continue
    if line.strip() == MARKER_END:
        if current_path is not None:
            files.append((current_path, "".join(current_lines)))
            current_path = None
            current_lines = []
        continue
    # normal content
    if current_path is not None:
        current_lines.append(line)

# flush last file if dump didn't end with MARKER_END
if current_path is not None:
    files.append((current_path, "".join(current_lines)))

return files
def write_files(files, root_dir: Path):
for rel_path, content in files:
target = root_dir / rel_path
target.parent.mkdir(parents=True, exist_ok=True)
target.write_text(content, encoding="utf-8")
print(f"[WRITE] {target}")

def main():
if len(sys.argv) < 3:
print("Usage: build_from_dump.py <dump.md> <output_dir>")
sys.exit(1)

python
Copy code
dump_path = Path(sys.argv[1]).expanduser()
out_root = Path(sys.argv[2]).expanduser()

if not dump_path.exists():
    print(f"Dump file not found: {dump_path}")
    sys.exit(1)

text = dump_path.read_text(encoding="utf-8")
files = parse_dump(text)

print(f"[INFO] Parsed {len(files)} files from {dump_path}")
out_root.mkdir(parents=True, exist_ok=True)
write_files(files, out_root)
print("[DONE] Repo reconstructed.")
if name == "main":
main()
