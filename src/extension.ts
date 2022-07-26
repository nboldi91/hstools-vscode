// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as which from 'which';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "hstools-vscode" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('hstools.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from HsTools Extension!');
	});

	activateServer();

	context.subscriptions.push(disposable);
}

function activateServer() {
	let serverModule = "hstools-lsp"

	var serverExecutable = which.sync(serverModule);

	let serverEnvironment = vscode.workspace.getConfiguration('hstools').serverEnvironment;

	let executableOptions = {
		env: { ...process.env, ...serverEnvironment },
	}

	let lspArgs: string[] = []

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	let serverOptions: ServerOptions = {
		run: { command: serverExecutable, transport: TransportKind.stdio, args: lspArgs, options: executableOptions },
		debug: { command: serverExecutable, transport: TransportKind.stdio, args: lspArgs, options: executableOptions },
	};

	// Options to control the language client
	let clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'haskell' }],
		synchronize: {
			configurationSection: 'hstools'
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'haskell',
		'Haskell',
		serverOptions,
		clientOptions
	);
	client.registerProposedFeatures();
	
	// Start the client. This will also launch the server
	client.start();
}

// this method is called when your extension is deactivated
export function deactivate() {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
