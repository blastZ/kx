#! /usr/bin/env node

import { program } from 'commander';
import { createChart } from './commands/create-chart.cmd.js';

program
  .command('create')
  .description('Create kubernetes application')
  .argument('<name>', 'name of application')
  .action(createChart);

program.parse();
