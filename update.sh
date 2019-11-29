#!/bin/bash

git pull origin &&
./build.sh &&
./deploy.sh build 
