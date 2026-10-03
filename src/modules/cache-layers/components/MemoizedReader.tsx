import { loadMemoizedRun } from "../server/layerCounters";

type MemoizedReaderProps = {
  label: string;
};

export async function MemoizedReader({ label }: MemoizedReaderProps) {
  const { run } = await loadMemoizedRun();

  return (
    <span>
      {label} saw run #{run}{" "}
    </span>
  );
}
