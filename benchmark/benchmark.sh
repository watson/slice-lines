#!/usr/bin/env sh

npm i nanobench

if [ ! -f big.txt ]; then
  curl https://norvig.com/big.txt > big.txt
fi

node benchmark.js
