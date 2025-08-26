export const sanitizeChunk = (chunk) => {
  let sanitizedChunk = chunk;

  if (sanitizedChunk.startsWith(",")) sanitizedChunk = sanitizedChunk.slice(1);

  if (sanitizedChunk.endsWith(","))
    sanitizedChunk = sanitizedChunk.slice(0, -1);

  return sanitizedChunk;
};

export const parseChuck = (chunk) => {
  if (chunk === "[" || chunk === "]") return null;
  const sanitizedChunk = sanitizeChunk(chunk);
  try {
    const json = JSON.parse(sanitizedChunk);
    return json;
  } catch (err) {
    console.error("Not a valid data", sanitizedChunk);
    return null;
  }
};
