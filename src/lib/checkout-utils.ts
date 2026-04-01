export const handlePaymentSimulation = async (): Promise<void> => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};

export const createOrderSimulation = async (): Promise<string> => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 800);
  });

  return `ord-${Date.now()}`;
};
