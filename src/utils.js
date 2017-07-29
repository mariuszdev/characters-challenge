import {random} from 'lodash';

const wait = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export const tryRequestUntilSuccess = (makeRequest, waitSeconds = 0, attempt = 0) => {
  if (attempt > 0) console.log(`Next try in ${waitSeconds} seconds...`);

  return wait(waitSeconds)
    .then(makeRequest)
    .catch((data) => {
      if (data.response === undefined) {
        // network error
        return tryRequestUntilSuccess(makeRequest, random(Math.pow(2, attempt) - 1), attempt + 1);
      }

      return Promise.reject(data);
    });
};
