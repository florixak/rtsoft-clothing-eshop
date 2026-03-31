export const simulatePaymentProcessing = async (): Promise<void> => {
  return await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};
