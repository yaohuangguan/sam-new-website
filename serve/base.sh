#!/bin/bash
# step1 打基础镜像
images_name="yr-canlendar"

docker build -t $images_name:base -f ./serve/Dockerfile .