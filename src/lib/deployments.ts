import GreeterContract from "@/abis/greeter.json";

let isDev = false;

if (process.env.NODE_ENV !== "development") {
  isDev = true;
}

export const greeterDeployment: {
  [chainId: number]: string;
} = {
  84532: !isDev
    ? "0xF046f3e0a7eB061645d4e5062806767Ed13dca4D"
    : GreeterContract.address,
};
