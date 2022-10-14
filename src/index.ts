#! /usr/bin/env node

import { program } from "commander";
import { createChart } from "./commands/create-chart.cmd.js";
import { generateValues } from "./commands/generate-valeus.cmd.js";
import { showVersion } from "./commands/show-version.cmd.js";
import { updateChart } from "./commands/update-chart.cmd.js";

program.option("-v, --version").action(showVersion);

program
  .command("create")
  .description("Create kubernetes application")
  .argument("<name>", "name of application")
  .option("--no-values")
  .action(createChart);

program
  .command("update")
  .description("Update kubernetes application")
  .argument("<name>", "name of application")
  .action(updateChart);

program
  .command("generate")
  .alias("g")
  .description("Generate helm resource")
  .argument("<resource>", `helm resource type, one of ["values"]`)
  .argument("<name>", "name of application")
  .action(generateValues);

program.parse();
