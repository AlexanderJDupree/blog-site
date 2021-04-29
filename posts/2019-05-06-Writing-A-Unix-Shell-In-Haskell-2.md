---
title: "Writing A Unix Shell in Haskell - 2"
categories:
    - Blog 
    - Guide
    - Tutorial
    - Projects
tags:
    - haskell
    - unix
    - linux
    - functional
---

In my [previous post](https://alexanderjdupree.github.io/blog/guide/tutorial/projects/Writing-A-Unix-Shell-In-Haskell-1/) I set up the project structure for [Ash](https://github.com/AlexanderJDupree/Ash) using the Haskell tool [Stack](https://docs.haskellstack.org/en/stable/README/). This section of the tutorial will setup the basic lifetime and interpreter loop of the Ash unix shell. 

## Shell Lifetime

From start to finish, the basic lifetime of a shell can be summarized in three steps.

1. Initialize. Setup the environment by reading any configuration files.
2. Interpret. Runs the read, parse, execute loop for the shell. 
3. Exit. Perform teardown by freeing any resources, flushing buffer, closing threads, etc.

These steps are very general, and can be expressed easily in our main function. For now, we won't worry about fully implementing each stage, but instead start building the basic scaffolding or skeleton for Ash.

```haskell
-- | 
-- Module   :  Ash.Main

module Main where

import           Core.Initializer
import           Core.Interpreter
import           Core.Terminator

main :: IO a
main = do
    initializeAsh
    runInterpreter
    exitAsh 0

```

There are a few things to notice here. First, I've included imports for the `Initializer`, `Interpreter`, and `Terminator`, which will export the `initializeAsh`, `runInterpreter`, and `exitAsh` functions respectively. Right now our code won't compile because those files and functions do not exist. So we will need to create each file in the `Core` directory and start adding basic implementation details. Also, I changed the type signature of main to `main :: IO a`. This is needed to match the type of the `exitAsh` function, which we will see later.

## Initializer

For now the initializer will simply write a "not yet implemented" string to the console like so:

```haskell
-- | 
-- Module   :  Ash.Core.Initializer

module Core.Initializer
    (initializeAsh
    ) where

initializeAsh :: IO ()
initializeAsh = putStrLn "Initializer not yet implemented"

```

And that's it for the initializer for now.

## Terminator

The terminator will be fairly bare bones as well. For now we simply want to communicate to the operating system the exit code for Ash. To do this we will use the `exitWith :: ExitCode -> IO a` function in the `System.Exit` library like so:

```haskell
-- | 
-- Module   :  Ash.Core.Terminator

module Core.Terminator
    (exitAsh
    ) where

import           System.Exit

exitAsh :: Int -> IO a
exitAsh exitCode = case exitCode of
    0 -> exitSuccess
    _ -> (exitWith . ExitFailure) exitCode
```

As you can see, since the last action in main was `exitAsh 0` we will always communicate `exitSuccess` to the OS. Also, this is the reason for main havin the type `IO a`. Eventually `exitAsh` will be sequenced with the value returned from the interpreter. 

## Interpreter

The interpreter is the heart of our shell, however its strucure is also very simple. The interpreter will simply run a three stage loop until the user exits. 

1. Read input from `stdin`
2. Parse input into a command table
3. Execute the tokenized command. 

Because the interpreter will be dealing with unicode strings a lot I will be using the `Data.Text` module instead of builtin Haskell Strings.

### Data.Text vs. String

As a quick aside, builtin strings in Haskell are no different from a list of `chars`, which means that they are a linked list (slower and not space efficient). Whereas, the `Data.Text` module is, from the package description:

> An efficient packed, immutable Unicode text type (both strict and lazy), with a powerful loop fusion optimization framework.
>
>The Text type represents Unicode character strings, in a time and space-efficient manner. This package provides text processing capabilities that are optimized for performance critical use, both in terms of large data quantities and high speed.

However, to use the `Data.Text` module we will first need to include it in our build dependencies. Just add `- text` to the `dependencies` field in `package.yaml`

## Back to the Interpreter

First, lets just write a prompt to the screen, read a line of input, and print the input back to the screen.

```haskell
{-# LANGUAGE OverloadedStrings #-}
-- | 
-- Module   :  Ash.Core.Interpreter

import qualified Data.Text      as T
import qualified Data.Text.IO   as I

prompt :: T.Text
prompt = "$ "

writePrompt :: T.Text -> IO ()
writePrompt = I.putStr

runInterpreter :: IO ()
runInterpreter = do
    writePrompt prompt
    command <- I.getLine
    I.putStrLn command
```

*Note*: The OverloadedStrings pragma at the top of the file enables us to use string literals interchangeably as `Text` data types. Also, since we are using `Data.Text` we must also use the `Data.Text.IO` module as well to prevent needless conversion from builtin strings to `Text`.

## Running Ash For The First Time.

Great, now that we have our skeleton setup lets build and run Ash for the first time. We should expect that Ash will print our `"$ "` prompt, read in a line of input, print that line back to the screen and exit. However, we would be wrong. If we run `stack build` and `stack exec Ash` what you'll actually see is:

```bash
Initializer not yet implemented
```
Where's our prompt? If we mash a few keys and press Enter, however, we will see our prompt, and our mashed input again. This is because Haskell is lazy and the default buffering is working against us. By default, buffering is set to `LineBuffering` which only writes to `stdout` when a newline character is encoutered or if the buffer is full. So what's actually happening in our program is that the prompt is only being written to the `stdout` buffer until we press the Enter key, which sends back a newline character and flushes the buffer. This obviously isn't the desired behavior for our interactive shell, so we will need to flush the buffer our selves when we write the prompt. To do this add the following import:

```haskell
import System.IO (hFlush, stdout)
```

And change the `writePrompt` function to this:

```haskell  
writePrompt :: T.Text -> IO ()
writePrompt prompt = I.putStr prompt >> hFlush stdout
```

Now Ash will be interactive, printing the prompt and receiving the input on the same line. For example, if we run Ash and type "Hello World" we will get:

```bash
Initializer not yet implemented
$ Hello World
Hello World
```

## Wrapping Up

We have identified and seperated the lifetime and responsibilities of the shell into different modules, and got a basic skeleton of a program running. In the next post I will be diving further into the interpreter loop and implement a basic parser and executor module. All code for this series can be found in the official *Ash* repository [here](https://docs.haskellstack.org/en/stable/README/). If you have any questions, comments, or suggestions, please feel free to leave them in the comment section below. 


