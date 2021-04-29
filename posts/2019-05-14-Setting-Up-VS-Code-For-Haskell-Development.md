---
title: "Setting Up VS Code For Haskell Development"
categories:
    - Blog 
    - Guide
    - Tutorial
    - Editor
tags:
    - haskell
    - linux
    - vscode
---

Today I will be going over which Visual Studio Code extensions I use for Haskell development. Generally, I use Vim and its associated plugins for all my  development need. However, I decided to switch things up and give VS code a try. So far, I am enjoying the accessibility, feature set, and customizability of VS Code and thought I would share how I have set it up for Haskell development. 

The key, quality of life, features I require from my editor when writing code are:

* Syntax highlighting
* Compilation errors and warnings
* Type definitions on hover
* Goto definitions
* Autocomplete
* Formatting

There were a few plugins that offered most, if not all, of these features. The notable plugins are:

* [Haskell Language Server](https://marketplace.visualstudio.com/items?itemName=alanz.vscode-hie-server)
* [Haskelly](https://marketplace.visualstudio.com/items?itemName=UCL.haskelly)
* [Haskero](https://marketplace.visualstudio.com/items?itemName=Vans.haskero)

I opted to use the *Haskero* plugin because it provided the features I desired, as well as an easy installation process. I did use the *Haskell Language Server* plugin as well, and enjoyed it. However, the Haskell Language Server requires a few more dependencies, namely the *Haskell IDE Engine* which is a little more involved when it comes to installation. If you do want to use the HIE, I'd recommend you check out this [tutorial](https://medium.com/@dogwith1eye/setting-up-haskell-in-vs-code-on-macos-d2cc1ce9f60a). 

### Installing Haskero

Installing Haskero is easy! Just go the extensions viewer (Ctrl-Shift-x) and search for *Haskero*, then click install! Haskero does rely on Stack, which you should have installed if you're working with Haskell. But, if you don't have Stack, check them out [here](https://docs.haskellstack.org/en/stable/install_and_upgrade/); or just run this command to install: 

```bash
curl -sSL https://get.haskellstack.org/ | sh
```

Haskero utilizes *intero* which you can build into your Stack project by running:

```bash
stack build intero
```
### Formatter

Haskero doesn't come with a built-in formatter, so if we want to use one we will have to install it also. I will be using [brittany](https://github.com/lspitzner/brittany#installation) as my formatter. But I recommend also checking out [stylish-haskell](https://github.com/jaspervdj/stylish-haskell) and [hindent](https://github.com/chrisdone/hindent) as well. 

To get *brittany* first you will need to install the source code. If you're on Arch or Manjaro linux you and have there is an *AUR* package you can install easily. Using [aura](https://github.com/aurapm/aura/blob/master/aura/README.md) you can run:

```bash
aura -A brittany
```

If you don't have access to the *AUR* check out the install instructions for brittany [here](https://github.com/lspitzner/brittany#installation).

Once brittany is installed on your system you'll also need to enable the VS code extension. Navigate to the extensions viewer (Ctrl-Shift-x) again, search for *brittany* and click install! Now you can format your files by using the **Format Document** command (Ctrl-Shift-I). If you want to format on save, open User Preferences (⌘ , or Ctrl ,), then add: `"editor.formatOnSave": true`.

### Write Some Code!

Now you that you have VS Code setup for Haskell development, it's time to dive in and write some code! I'm still a novice Haskeller myself, and would love to hear what projects everyone is working on. Also, if you have any recommended VS Code extensions I would love to hear about them in the comments section below!
