#!/usr/bin/env node

import { Command } from 'commander';
import axios from 'axios';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import fs from 'fs';
import path from 'path';

const program = new Command();
const turndownService = new TurndownService();

program
    .name('llms-gen')
    .description('Generate llms.txt and advanced context from a URL')
    .version('1.0.0')
    .argument('<url>', 'The target website URL')
    .option('-a, --advanced', 'Generate extended llms-full.txt with deep context')
    .action(async (url, options) => {
        try {
            console.log(`🔍 Fetching and analyzing: ${url}...`);

            const { data } = await axios.get(url);

            const $ = cheerio.load(data);

            const title = $('title').text() || 'Documentation';
            const description = $('meta[name="description"]').attr('content') || 'No description available.';

            const mainContentHtml = $('main').html() || $('body').html();

            const markdownContent = turndownService.turndown(mainContentHtml);

            const llmsTxtContent = `# ${title}\n\n> ${description}\n\n## Info\n- URL: ${url}\n\n## Core Content\n${markdownContent.substring(0, 2000)}`;

            fs.writeFileSync(path.join(process.cwd(), 'llms.txt'), llmsTxtContent);
            console.log(`✅ Successfully generated llms.txt!`);

            if (options.advanced) {
                console.log(`🚀 Generating advanced llms-full.txt...`);
                const advancedContent = `# Full Context: ${title}\n\n${markdownContent}`;
                fs.writeFileSync(path.join(process.cwd(), 'llms-full.txt'), advancedContent);
                console.log(`✅ Successfully generated llms-full.txt!`);
            }

        } catch (error) {
            console.error(`❌ Error: ${error.message}`);
        }
    });

program.parse();