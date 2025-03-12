export function commonHeaders() {
  return {
    headers: {
      "Content-Type": "application/json",
    },
  };
}

export function commonHeadersWithToken() {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      headers: {
        "Content-Type": "application/json",
        "x-auth": `${token}`,
      },
    };
  }
}
