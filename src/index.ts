#! /usr/bin/env node

import { program } from "commander";
import { createChart } from "./commands/create-chart.cmd.js";
import { updateChart } from "./commands/update-chart.cmd.js";

program
  .command("create")
  .description("Create kubernetes application")
  .argument("<name>", "name of application")
  .action(createChart);

program
  .command("update")
  .description("Update kubernetes application")
  .argument("<name>", "name of application")
  .action(updateChart);

program.parse();
