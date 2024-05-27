#!/bin/bash

echo "Starting app in prod"
npx prisma db push
npx prisma db seed

npm run dev