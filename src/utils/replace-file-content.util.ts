import fs from "fs";

export function replaceFileContent(options: {
  filePath: string;
  replaceMap: {
    [key: string]: string;
  };
}) {
  const { filePath, replaceMap } = options;

  const fileStr = fs.readFileSync(filePath).toString();

  let result = fileStr;
  Object.keys(replaceMap).map((key) => {
    const reg = new RegExp(key, "g");
    result = result.replace(reg, replaceMap[key]);
  });

  return result;
}
