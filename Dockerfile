FROM liuechong/rustup

ENV ROCKET_ADDRESS=0.0.0.0

ENV ROCKET_PORT=8080

ADD . /app

WORKDIR /app

RUN rustup default nightly

RUN cargo build --release

CMD ["cargo", "run"]