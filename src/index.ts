import cliProgress from "cli-progress";
import matter from "gray-matter";
import { readdir } from "node:fs/promises";
import { summariseEntry } from "./ollama";
import { args } from "./arguments";
import dayjs from "dayjs";

declare module "bun" {
  interface Env {
    JOURNAL_PATH?: string;
  }
}

const path = Bun.env.JOURNAL_PATH;

if (!path) {
  throw new Error("Please set the `JOURNAL_PATH` environment variable.");
}

const files = await readdir(path);
const mdFiles = files.filter((file) => file.endsWith(".md"));

const barInstance = new cliProgress.MultiBar({
  format: "{bar} {percentage}% | {value}/{total}",
});

const bar = barInstance.create(mdFiles.length, 0);

bar.start(mdFiles.length, 0);

for await (const item of mdFiles) {
  const isToday = dayjs(item).isSame(dayjs(), "day");
  barInstance.log(item);
  if (isToday) {
    barInstance.log("is today " + item);
    bar.increment();
    continue;
  }

  const file = Bun.file(path + "/" + item);
  const fileText = await file.text();
  const { data: frontmatter, content } = matter(fileText);

  if (frontmatter?.title && frontmatter?.summary) {
    bar.increment();
    continue;
  }

  barInstance.log(`${item}: Processing...\n`);

  const response = await summariseEntry(content);
  let llmTitle = "";
  let llmSummary = "";
  try {
    const { title = "", summary = "" } = JSON.parse(response);
    llmTitle = title;
    llmSummary = summary;
  } catch (e) {
    barInstance.log("Error parsing response. Skipping.\n");
    bar.increment();
    continue;
  }
  const newFrontmatter = {
    ...frontmatter,
    title: llmTitle,
    summary: llmSummary,
  };

  const newContent = matter.stringify(content, newFrontmatter);
  if (args.dry) {
    barInstance.log(`[dry] New content for file ${item}:\n`);
    barInstance.log(`${newContent}\n`);
    bar.increment();
    continue;
  }
  await Bun.write(file, newContent);
  barInstance.log(`${item}: Finished. ("${llmTitle}")\n`);
  bar.increment();
}

bar.stop();
