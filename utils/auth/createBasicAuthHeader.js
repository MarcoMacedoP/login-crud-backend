function createBasicAuthHeader(user, password) {
  const authHeader = `${user}:${password}`;
  const buffer = Buffer.from(authHeader);
  const authHeaderBase64 = buffer.toString("base64");
  return `Basic ${authHeaderBase64}==`;
}
module.exports = createBasicAuthHeader;
