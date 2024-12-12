# Markdown Journal Summariser

## Requirements

Before running this script you need to:

### 1. Install Bun

Bun is the JavaScript runtime used to run this script.

You can check if Bun is installed by running `bun -v` in the terminal.

To install Bun, have a look at the [installation documentation](https://bun.sh/docs/installation).

### 2. Install Ollama

Ollama is used to run a local language model on your maching.

Make sure to download and install [Ollama](https://ollama.com/).

### 3. Install dependencies

```bash
bun install
```

### 4. Update Obsidian path

Copy the example file:

```bash
cp .env.example .env
```

Update the `.env` file with the path to your Obsidian journals.

## Usage

Start Ollama by either:

1. Run `ollama serve` in your terminal, or
2. Open the Ollama app.

Run the script:

> [!CAUTION]
> The script modifies files on your system without confirmation. Use with caution, and backup your data.

```bash
bun run start
```

To run without file changes:

```bash
bun run start --dry
```

## Configuration

See:

- Path to your Obsidian journals: `.env.example`
- To tweak prompts: `/src/config.ts`

## Gotchas

- This script does not process subdirectories.
- As you might know, large language models are prone to hallucination.

## Contributing

- Feel free to create an issue if you would like to implement a feature or improve the script!
