import React, { useState } from 'react';
import { useAppSelector } from "../../app/hooks";
import { selectAuth, LoginStatus } from "../Login/authslice";

export function Note() {
  const [timer, setTimer] = useState(0);
  const auth = useAppSelector(selectAuth);

  if (auth.status !== LoginStatus.LOGGED_IN) return null;
  const {
    apiToken,
    user: { id: userId, note: existingNote },
  } = auth;

  const createTimer = (body: { id: string; note: string }, waitTime: number) =>
    setTimeout(async () => {
      await fetch(
        `https://60b793ec17d1dc0017b8a6bc.mockapi.io/users/${ userId }`,
        {
          method: "PUT",
          headers: { "content-type": "application/json", "Authorization": apiToken },
          body: JSON.stringify(body),
        }
      );
    }, waitTime);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (timer === 0) {
      const timerId = createTimer({ id: userId, note: event.target.value}, 2000)
      setTimer(timerId as unknown as number);
    } else{
      clearTimeout(timer);
      const timerId = createTimer({ id: userId, note: event.target.value}, 2000)
      setTimer(timerId as unknown as number);
    }
  };

  return (
    <div>
      <input type="text" onChange={handleOnChange} defaultValue={existingNote}/>
    </div>
  );
}
