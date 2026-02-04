export const logDecision = (payload: unknown) => {
  return {
    ok: true,
    receivedAt: new Date().toISOString(),
    payload,
  };
};
