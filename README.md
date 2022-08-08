# hstools-vscode README

hstools-vscode provides an LSP client for Haskell.

It uses a backing database to archieve good performance with limited resources. It requires the project to be compiled with the hstools plugin.

## Features

In this very early build the working functionality are:

 - Jump to definition
 - List references
 - Hover (with full name and type)

There is also a "clean the DB" command to reset the database if something goes wrong.

## Requirements

 - Install the hstools and hstools-lsp Haskell packages.
 - A running postgreSQL database.
 - Build your tools with the hstools plugin.


## Extension Settings

* `hstools.postgresqlConnectionString`: The postgreSQL connection string used to access the database. With default settings it should be set to `postgresql://saver:saver@127.0.0.1:5432/repo`

## Known Issues

This is a very early build with a lot of limitations and issues.

## Release Notes

Users appreciate release notes as you update your extension.

### 0.0.1

Initial, very early MVP release.
