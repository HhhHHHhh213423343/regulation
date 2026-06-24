from __future__ import annotations

import hashlib
import re
import zipfile
from pathlib import Path
from typing import Any
from xml.etree import ElementTree

from .models import ParsedDocument


SUPPORTED_EXTENSIONS = {".docx", ".txt", ".md"}


def parse_document(path: Path) -> ParsedDocument:
    suffix = path.suffix.lower()
    if suffix not in SUPPORTED_EXTENSIONS:
        raise ValueError("仅支持 .docx、.txt、.md 外规文件。")
    raw = path.read_bytes()
    sha256 = hashlib.sha256(raw).hexdigest()
    if suffix == ".docx":
        blocks = _parse_docx_blocks(path)
    else:
        blocks = _parse_text_blocks(_decode_text(raw))
    text = "\n".join(block["text"] for block in blocks if block.get("text")).strip()
    if not text:
        raise ValueError("文件解析后未获得有效文本。")
    return ParsedDocument(
        document_id=sha256[:16],
        filename=path.name,
        file_type=suffix.lstrip("."),
        text=text,
        sha256=sha256,
        blocks=blocks,
        stored_path=path,
    )


def _decode_text(raw: bytes) -> str:
    for encoding in ("utf-8", "utf-8-sig", "gb18030", "big5"):
        try:
            return raw.decode(encoding)
        except UnicodeDecodeError:
            continue
    return raw.decode("utf-8", errors="ignore")


def _parse_text_blocks(text: str) -> list[dict[str, Any]]:
    blocks: list[dict[str, Any]] = []
    heading_path: list[str] = []
    for index, line in enumerate(text.splitlines()):
        clean = line.strip()
        if not clean:
            continue
        block_type = "heading" if re.match(r"^(#{1,6}\s+|第[一二三四五六七八九十百千万\d]+章|[一二三四五六七八九十]+、)", clean) else "paragraph"
        if block_type == "heading":
            heading_path = [re.sub(r"^#{1,6}\s+", "", clean)]
        blocks.append(
            {
                "blockId": f"B-{len(blocks) + 1:04d}",
                "type": block_type,
                "text": clean,
                "position": {"paragraphIndex": index, "headingPath": list(heading_path)},
            }
        )
    return blocks


def _parse_docx_blocks(path: Path) -> list[dict[str, Any]]:
    with zipfile.ZipFile(path) as archive:
        xml = archive.read("word/document.xml")
    root = ElementTree.fromstring(xml)
    namespace = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
    blocks: list[dict[str, Any]] = []
    heading_path: list[str] = []
    for index, paragraph in enumerate(root.findall(".//w:body/w:p", namespace)):
        texts = [node.text or "" for node in paragraph.findall(".//w:t", namespace)]
        clean = "".join(texts).strip()
        if not clean:
            continue
        style = paragraph.find(".//w:pStyle", namespace)
        style_value = style.attrib.get(f"{{{namespace['w']}}}val", "") if style is not None else ""
        block_type = "heading" if style_value.lower().startswith("heading") or re.match(r"^第[一二三四五六七八九十百千万\d]+章", clean) else "paragraph"
        if block_type == "heading":
            heading_path = [clean]
        blocks.append(
            {
                "blockId": f"B-{len(blocks) + 1:04d}",
                "type": block_type,
                "text": clean,
                "position": {"paragraphIndex": index, "headingPath": list(heading_path)},
            }
        )
    return blocks

