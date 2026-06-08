# llms-gen

> A fast, lightweight CLI tool to generate `llms.txt` and `llms-full.txt` from any website URL — making your content instantly readable by AI language models.

[![npm version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://www.npmjs.com/)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)

---

## What is llms.txt?

[`llms.txt`](https://llmstxt.org/) is an emerging standard that helps AI language models better understand your website. Similar to how `robots.txt` guides search engine crawlers, `llms.txt` provides structured, clean Markdown context that LLMs can efficiently read and reference.

**llms-gen** automates this process — just point it at a URL and it handles the rest.

---

## Features

- 🔍 **Auto-scrapes** any public URL using Axios + Cheerio
- 📝 **Converts HTML → clean Markdown** via Turndown
- 📄 **Generates `llms.txt`** — a concise, LLM-optimized summary
- 🚀 **Generates `llms-full.txt`** — full-page deep context (with `--advanced` flag)
- ⚡ **Zero config** — works out of the box
- 🛠️ **Globally installable** as a CLI command

---

## Installation

### Option 1: Run directly with npx (no install needed)

```bash
npx llms-generator-cli <url>
```

### Option 2: Install globally

```bash
npm install -g llms-generator-cli
```

### Option 3: Clone and use locally

```bash
git clone https://github.com/Asadsheblu/llms-generator-node.git
cd llms-generator-cli
npm install
npm link
```

---

## Usage

### Basic — Generate `llms.txt`

```bash
llms-gen https://example.com
```

This fetches the page, extracts the main content, and writes a clean `llms.txt` file in your current directory.

### Advanced — Generate `llms-full.txt`

```bash
llms-gen https://example.com --advanced
```

or with the shorthand flag:

```bash
llms-gen https://example.com -a
```

This generates **both** `llms.txt` (concise) and `llms-full.txt` (complete page context).

---

## Output Format

### `llms.txt` (Standard)

```
# Page Title

> Meta description of the page

## Info
- URL: https://example.com

## Core Content
... (first ~2000 characters of clean Markdown content)
```

### `llms-full.txt` (Advanced)

```
# Full Context: Page Title

... (complete page content in clean Markdown, no truncation)
```

---

## Examples

```bash
# Generate llms.txt for a documentation site
llms-gen https://docs.example.com

# Generate full context for a product landing page
llms-gen https://myproduct.com -a

# Generate for a blog post
llms-gen https://myblog.com/my-article --advanced
```

---

## Options

| Option | Alias | Description |
|--------|-------|-------------|
| `--advanced` | `-a` | Also generate `llms-full.txt` with full page content |
| `--version` | `-V` | Show version number |
| `--help` | `-h` | Show help information |

---

## Requirements

- **Node.js** v14.0.0 or higher
- **npm** v6.0.0 or higher

---

## Dependencies

| Package | Purpose |
|---------|---------|
| [`axios`](https://axios-http.com/) | HTTP requests to fetch web pages |
| [`cheerio`](https://cheerio.js.org/) | Fast, jQuery-like HTML parsing |
| [`turndown`](https://github.com/mixmark-io/turndown) | HTML to Markdown conversion |
| [`commander`](https://github.com/tj/commander.js/) | CLI argument and option parsing |

---

## How It Works

1. **Fetch** — Downloads the HTML of the target URL via Axios
2. **Parse** — Loads the HTML into Cheerio and extracts metadata (title, description) and the main content (`<main>` or `<body>`)
3. **Convert** — Transforms the HTML into clean Markdown using Turndown
4. **Format** — Structures the output into the `llms.txt` standard format
5. **Save** — Writes the file(s) to your current working directory

---

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## License

[MIT](LICENSE) © 2024 llms-generator-cli contributors
