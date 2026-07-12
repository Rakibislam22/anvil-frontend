import styles from "./forge-mark.module.css";

export default function ForgeMark({ size = 42 }: { size?: number }) {
  return (
    <svg
      className={styles.mark}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-label="Anvil"
    >
      <path
        d="M8 20V8h12M40 28v12H28M12 28l9 9 16-20"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
