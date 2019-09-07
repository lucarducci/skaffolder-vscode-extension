import * as vscode from "vscode";
import { DataService } from "../services/DataService";
import { SkaffolderObject } from "../models/SkaffolderObject";
import { SkaffolderNode } from "../models/SkaffolderNode";

export class TreeProviderSkaffolder
  implements vscode.TreeDataProvider<SkaffolderNode> {
  private skObject: SkaffolderObject;

  constructor(data: vscode.ExtensionContext, private type: string) {
    console.log("init provider api");
    let dataDervice = new DataService();
    this.skObject = dataDervice.getSkObject();
  }

  getTreeItem(
    element: SkaffolderNode
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(
    element?: SkaffolderNode | undefined
  ): vscode.ProviderResult<SkaffolderNode[]> {
    if (element) {
      return element.children;
    } else {
      let tree: SkaffolderNode = this.createTree();
      return tree.children;
    }
  }

  private createTree(): SkaffolderNode {
    let tree: SkaffolderNode;

    tree = new SkaffolderNode(this.skObject, this.type, []);
    return tree;
  }
}