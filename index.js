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

      // ১. ওয়েবসাইটের HTML ডেটা ডাউনলোড করা
      const { data } = await axios.get(url);
      
      // ২. HTML ডেটা রিড (Parse) করা
      const $ = cheerio.load(data);

      // মেটাডেটা (টাইটেল ও ডেসক্রিপশন) খুঁজে বের করা
      const title = $('title').text() || 'Documentation';
      const description = $('meta[name="description"]').attr('content') || 'No description available.';
      
      // মেইন কন্টেন্ট রিড করা (অপ্রয়োজনীয় হেডার/ফুটার বাদ দেওয়ার জন্য)
      const mainContentHtml = $('main').html() || $('body').html();
      
      // ৩. HTML-কে ক্লিন Markdown-এ রূপান্তর করা
      const markdownContent = turndownService.turndown(mainContentHtml);

      // ৪. স্ট্যান্ডার্ড llms.txt ফরম্যাট তৈরি করা
      const llmsTxtContent = `# ${title}\n\n> ${description}\n\n## Info\n- URL: ${url}\n\n## Core Content\n${markdownContent.substring(0, 2000)}`;

      // ৫. ফাইলটি ইউজারের কারেন্ট ফোল্ডারে সেভ করা
      fs.writeFileSync(path.join(process.cwd(), 'llms.txt'), llmsTxtContent);
      console.log(`✅ Successfully generated llms.txt!`);

      // ৬. ইউজার যদি অ্যাডভান্সড ফ্ল্যাগ (-a) ব্যবহার করে
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