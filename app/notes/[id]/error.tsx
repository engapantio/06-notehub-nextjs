// app/notes/[id]/error.tsx

'use client';

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error }: Props) => {
  return (
    <div>
      <p>Could not fetch note details. {error.message}</p>
    </div>
  );
};

export default Error;
