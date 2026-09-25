# Starting the StemLab web service

> **Kieran Simkin** · https://kieransimkin.co.uk/ · My Songs: https://kieransimkin.co.uk/my-songs/ · Arcadians: https://kieransimkin.co.uk/arcadians/ · Source: https://github.com/kieransimkin/stemlab


## Windows

Double-click `start-web.cmd`, or run:

```powershell
.\start-web.cmd
```

The script waits for `/healthz`, prints the URL, and opens the browser. Options
are passed to the PowerShell implementation:

```powershell
.\start-web.cmd -Port 8080 -Profile practical
.\start-web.cmd -Docker
.\start-web.cmd -Docker -Device cpu
.\start-web.cmd -NoBrowser
```

## Linux

```bash
chmod +x ./start-web.sh
./start-web.sh
```

Useful variants:

```bash
./start-web.sh --port 8080 --profile practical
./start-web.sh --docker
./start-web.sh --docker --device cpu
./start-web.sh --no-browser
```

Both local launchers use `http://127.0.0.1:<port>/` as the browser URL, wait
until the server health check succeeds, and keep the service attached to the
terminal so Ctrl+C stops it.

## Docker Compose

The Compose file exposes a GPU-backed `web` service on host port 8000 by
default:

```bash
docker compose up --build web
```

CPU-only:

```bash
docker compose --profile cpu up --build web-cpu
```

Change the public port with `STEMLAB_WEB_PORT`, for example:

```bash
STEMLAB_WEB_PORT=8080 docker compose up --build web
```

Results are persisted to `./results` by default. Set
`STEMLAB_RESULTS_HOST_DIR` to choose another host directory.

The container prints the host-facing browser URL at startup and exposes a
Docker health check against `/healthz`. The host starter scripts can run the
same Compose services with `-Docker` / `--docker` and open the browser
automatically.
