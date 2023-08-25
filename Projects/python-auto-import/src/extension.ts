import * as vscode from 'vscode';
import * as child_process from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(async (event) => {
		vscode.window.showInformationMessage(`iBrain Auto Import Running..`);
        const document = event.document;
        const text = document.getText();

        const importRegex = /^import\s+([a-zA-Z0-9_]+)\s*$/gm;
        let match;

        while ((match = importRegex.exec(text)) !== null) {
            const packageName = match[1];
            try {
                require(packageName);
            } catch (err) {
                // Package is not installed
                vscode.window.showInformationMessage(`Installing ${packageName}...`);
                child_process.exec(`pip install ${packageName}`, (error, stdout, stderr) => {
                    if (error) {
                        vscode.window.showErrorMessage(`Failed to install ${packageName}: ${stderr}`);
                    } else {
                        vscode.window.showInformationMessage(`Successfully installed ${packageName}`);
                    }
                });
            }
        }
    }));
}

export function deactivate() {}
