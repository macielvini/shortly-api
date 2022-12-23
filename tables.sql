CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(55) NOT NULL,
  email VARCHAR(55) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
);

CREATE TABLE urls (
  id integer NOT NULL DEFAULT nextval('urls_id_seq' :: regclass),
  owner_id integer REFERENCES "users"("id") NOT NULL,
  shortened_url text UNIQUE NOT NULL,
  original_url text VARCHAR(255) NOT NULL,
  visitors integer DEFAULT 0,
);

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  token text NOT NULL,
  user_id integer REFERENCES "users"("id") NOT NULL,
  expiry_timestamp timestamp without time zone NOT NULL,
);