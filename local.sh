#!/bin/bash

cd api_backend && npm start &
cd app_frontend && npm start &

echo "Working"
