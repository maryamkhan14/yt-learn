//https://github.com/orgs/react-hook-form/discussions/8020
import { type SyntheticEvent } from "react";

function onPromise<T>(promise: (event: SyntheticEvent) => Promise<T>) {
  return (event: SyntheticEvent) => {
    if (promise) {
      promise(event).catch((error) => {
        console.log("Unexpected error", error);
      });
    }
  };
}
export default onPromise;