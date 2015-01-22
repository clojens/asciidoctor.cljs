#!/usr/bin/env sh

# convenience
echo () { printf %s\\n "$*" ; }
bad () { printf "$(tput setaf 1)✗$(tput sgr0)"; }
ok () { printf "$(tput setaf 2)✓$(tput sgr0)"; }
p () { printf %s\\n "$*" ;}

# takes rest arguments assuming first to be the plugin name
function depend()
{
    # safer method over array splicing whitespace paths
    shift
    while test ${#} -gt 0
    do
        app="${1:?Require a name for application to search}"
        eval "$app=\$(command -v $app)"
        eval "p \"$(ok) \${$app:?$(bad) Could not find ${1}...}\""
        shift
    done
}

depend Asciidoctor npm lein

# we are certain both npm and leiningen are present due to short circuit
# variables a la :? and we now also have their path in the named variables
# hence printf $npm will print the location and mere use of $npm will exec

# first make sure config gets set so we can do automated init package.json
$npm config set init.license MIT
$npm config set init.version "0.1.0"
$npm init -y



