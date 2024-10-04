# journal-summariser

## Requirements

- [Bun](https://bun.sh)
- [Ollama](https://ollama.com/)

To install dependencies:

```bash
bun install
```

## Usage

To start ollama:

```bash
ollama serve
```

To run script:

> [!CAUTION]
> The script overwrites files on your system without confirmation. Use with caution, and backup your data.

```bash
bun run start
```

To run without file changes:

```bash
bun run start --dry
```

## Configuration

See:

- `.env.example`
- `/src/config.ts`

## Gotchas

Large language models are prone to hallucination.
