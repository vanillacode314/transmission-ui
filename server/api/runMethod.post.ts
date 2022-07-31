export default defineEventHandler(async (event) => {
  const { host, port, method, args } = await useBody(event);
  const AUTH_HEADER = event.req.headers["authorization"] as string;
  const X_HEADER = event.req.headers["x-transmission-session-id"] as string;
  const res = await fetch(`http://${host}:${port}/transmission/rpc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: AUTH_HEADER,
      "X-Transmission-Session-Id": X_HEADER,
    },
    body: JSON.stringify({
      method,
      arguments: args,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    const { arguments: args, result } = data;
    if (result === "success") {
      return args;
    }
  }
});
