export const dispatch = (ms: number): Promise<void> => {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, ms)
  );
};
