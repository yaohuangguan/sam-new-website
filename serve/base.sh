#!/bin/bash
# step1 打基础镜像
images_name="bat-assets"

docker build -t $images_name:base -f ./serve/base.Dockerfile .