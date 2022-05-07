import fs from "fs";
import path from "path";
import { BOILERPLATE_PATH } from "../constants/path.constant.js";

export function appendService(targetPath: string, serviceType: string) {
  if (serviceType === "ClusterIP") {
    fs.appendFileSync(
      targetPath,
      "\n" +
        fs.readFileSync(
          path.resolve(BOILERPLATE_PATH, "./services/cluster-ip.yaml"),
        ),
    );
  } else if (serviceType === "NodePort") {
    fs.appendFileSync(
      targetPath,
      "\n" +
        fs.readFileSync(
          path.resolve(BOILERPLATE_PATH, "./services/node-port.yaml"),
        ),
    );
  }
}
