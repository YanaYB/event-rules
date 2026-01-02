CREATE TABLE IF NOT EXISTS summary (
                                       event_id UUID PRIMARY KEY,
                                       summary_md TEXT NOT NULL,

                                       created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
                                       updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

CREATE INDEX IF NOT EXISTS summary_created_at_idx
    ON summary (created_at);
