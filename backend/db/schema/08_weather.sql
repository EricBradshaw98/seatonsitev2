DROP TABLE IF EXISTS weather CASCADE;

CREATE TABLE weather (
    id SERIAL PRIMARY KEY,
    timestamp VARCHAR,
    code VARCHAR,
    temperature NUMERIC,
    wind_speed NUMERIC,
    wind_direction VARCHAR,
    wind_gust VARCHAR,
    precipitation_probability NUMERIC,
    uv_index NUMERIC
);
