CREATE TABLE driver (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    onboard_date timestamp NOT NULL,
    total_jobs smallint NOT NULL,
    success_rate decimal NULL,
    acceptance_rate decimal NULL,
    cancellation_rate decimal NULL,
    ontime_rate decimal NULL,
    late_delivery_coun smallint NULL,
    average_order_cost decimal NULL,
    order_rejection_count smallint NULL,
    orders_per_week smallint NULL,
    response_time_to_offer_seconds int NULL,
);
