export default defineEventHandler(async (event) => {
  const AUTH_HEADER = event.req.headers["authorization"] as string;
  const { host, port } = useQuery(event);
  const res = await fetch(`http://${host}:${port}/transmission/rpc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: AUTH_HEADER,
    },
  });
  const id = res.headers.get("x-transmission-session-id");
  return {
    id,
  };
});
