FROM rustlang/rust:nightly as builder

WORKDIR /usr/src/app

COPY . .

RUN cargo build --release

EXPOSE 8080

CMD [ "cargo", "run", "--release"]
