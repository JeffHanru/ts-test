import { httpGet } from "./mock-http-interface";

// TODO define this type properly
type TValidResponse = {
  "Arnie Quote": string;
};

type TInvalidResponse = {
  Failure: string;
};

type TResult = TValidResponse | TInvalidResponse;

const successStatusCode = 200;

export const getArnieQuotes = async (urls: string[]): Promise<TResult[]> => {
  // TODO: Implement this function.

  // Use promise.all to handle all the request together and return the reuslt as one promise 
  const result = Promise.all(urls.map((url) => httpGet(url))).then((res) =>
    res.map((response) => {
      const bodyResponse = JSON.parse(response.body);
      if (response.status === successStatusCode)
        return { "Arnie Quote": bodyResponse.message as string };
      if (response.status !== successStatusCode)
        return { FAILURE: bodyResponse.message as string };
    })
  );

  return result as Promise<TResult[]>;
};
