---
title: 'Writing A Unix Shell in Haskell - 1'
categories:
  - Blog
  - Guide
  - Tutorial
  - Projects
image: /assets/images/twitter_header_photo_2.png
tags:
  - haskell
  - unix
  - linux
  - functional
---

In my [previous post](https://alexanderjdupree.github.io/blog/guide/tutorial/projects/Writing-A-Unix-Shell-In-Haskell-0/) I gave some background and talked about project goals. It's not required, but I'd check it out if you haven't.

### Getting Started

Before we can start writing code, we will need to setup the project structure and name our shell. Being the creative genius that I am (I'm not) I decided to name my unix shell **Ash** for **A**lex-**SH**ell. To build the project itself, i'm going to use [stack](https://docs.haskellstack.org/en/stable/README/). _Stack_ is a cross-platform utility for building Haskell projects that is very user-friendly. Stack takes care of a lot build tasks, like downloading dependencies, behind the scenes. To get stack, run:

```bash
curl -sSL https://get.haskellstack.org/ | sh
```

Or, if you're on Arch or Manjaro you can just use pacman:

```bash
sudo pacman -S stack
```

### Creating the Project

Next we will run stack to build the basic project structure.

```bash
stack new ash
```

The new command will create the following files and directories

```bash
.
├── LICENSE
├── Setup.hs
├── app
│   └── Main.hs
├── ash.cabal
├── src
│   └── Lib.hs
├── stack.yaml
├── package.yaml
└── test
    └── Spec.hs
```

### Configuring the Project

This structure will work just for most projects. However, I moved some files around like so:

```
.
├── LICENSE
├── Setup.hs
├── Ash
│   └── Core
│   └── Main.hs
├── Ash.cabal
├── stack.yaml
├── package.yaml
└── test
    └── Spec.hs
```

And in the `package.yaml` file, I changed the `source-dirs:` field to `Ash/`. Whenever you make changes to your project structure, or need to add dependencies, you will need to update the `package.yaml` file to reflect those changes.

Because I removed the `Lib.hs` file, we will need to modify `Main.hs` before we can build and run the project. In `Main.hs` remove the `import` statements and change the main function to:

```haskell
main :: IO ()
main = putStrLn "Hello World!"
```

### Putting it All Together

Now we can check and make sure everything is working. Run:

```bash
stack setup
stack build
```

This may take awhile if its the first time you're running stack. Stack will download and install any requisite dependencies for your project, including GHC (The Glasgow Haskell Compiler). Once the build stage is finished we can run:

```
stack exec Ash-exe
```

And we should see `"Hello World!"` printed to the console! The last thing we should do is initialize the project with `git` or some other form of version control.

### Conclusion

That takes care of setting up the project, in my next post we will start to implement the basic lifetime and interpreter loop for Ash. If you have questions or comments, please feel free to leave them in the comment section below. Also, all the code for _Ash_ can be found in my GitHub repo [here](https://docs.haskellstack.org/en/stable/README/).
