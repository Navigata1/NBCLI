# Build the NBCLI standalone monolith, then ship it in a tiny runtime image.
FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable
COPY . .
RUN pnpm install --frozen-lockfile \
  && pnpm build \
  && pnpm --filter @nsb/cli build:standalone

FROM node:22-alpine AS runtime
LABEL org.opencontainers.image.title="nbcli" \
      org.opencontainers.image.description="NorthStar Bootstrap CLI — governed autonomy for AI-native dev" \
      org.opencontainers.image.source="https://github.com/Navigata1/NBCLI" \
      org.opencontainers.image.licenses="MIT"
COPY --from=build /app/packages/cli/dist/nsb-standalone.js /usr/local/lib/nsb.js
RUN printf '#!/bin/sh\nexec node /usr/local/lib/nsb.js "$@"\n' > /usr/local/bin/nsb \
  && chmod +x /usr/local/bin/nsb
WORKDIR /work
ENTRYPOINT ["nsb"]
CMD ["--help"]
