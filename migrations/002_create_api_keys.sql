CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS api_keys (
                                        id UUID PRIMARY KEY,
                                        key UUID NOT NULL UNIQUE,

                                        description TEXT,
                                        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    revoked_at TIMESTAMPTZ
    );
