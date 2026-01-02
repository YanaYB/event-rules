INSERT INTO api_keys (id, key, description)
VALUES (
           gen_random_uuid(),
           gen_random_uuid(),
           'local-dev'
       )
    RETURNING key;

SELECT key, description, created_at
FROM api_keys
ORDER BY created_at DESC
LIMIT 1;
