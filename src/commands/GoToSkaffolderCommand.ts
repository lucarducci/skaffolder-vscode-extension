import { SkaffolderNode } from "../models/SkaffolderNode";
import * as SkaffolderCli from "skaffolder-cli";
import * as vscode from "vscode";
const opn = require("opn");

export class GoToSkaffolderCommand {
  static async command(context: SkaffolderNode) {
    let projectId = SkaffolderCli.getProject();

    if (!projectId) {
      // Ask for export
      vscode.window
        .showQuickPick(
          [
            { label: "Ok, export the openapi.yaml file to Skaffolder", value: 1 },
            { label: "Cancel", value: 0 }
          ],
          {
            placeHolder: "To access your Skaffolder web dashboard you should export the project"
          }
        )
        .then(response => {
          if (response && response.value === 1) {
            vscode.commands.executeCommand<vscode.Location[]>("skaffolder.export");
          }
        });
    } else {
      // Open browser
      let url = `${SkaffolderCli.getEnv()}/#!/projects/${projectId}/models`;
      opn(url, {
        wait: false
      });
    }
  }
}
