DROP TABLE IF EXISTS events CASCADE;

CREATE TABLE events (
  id SERIAL PRIMARY KEY NOT NULL,
  description VARCHAR(255),
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  event_name VARCHAR(255) NOT NULL,
  event_start VARCHAR(255) NOT NULL,
  event_end VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  active BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);