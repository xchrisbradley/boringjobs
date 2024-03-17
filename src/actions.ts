"use server";

export const updateGreeting = async (contract: any, data: FormData) => {
  "use server";
  const value = data.get("value");
  const tx = await contract.write.setGreeting([value]);
  return tx;
};
