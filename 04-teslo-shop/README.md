## Getting Started

First, run the development server:

```bash
# install dependencies
yarn

# start database
docker-compose up -d

# run prisma migrations
yarn prisma migrate dev

# execute seed
yarn seed

# run dev mode
yarn dev
```
