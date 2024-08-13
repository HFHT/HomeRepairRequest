import { FallbackProps } from "react-error-boundary";

export function TopLevelError(props: FallbackProps) {
  const {error, resetErrorBoundary} = props
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}
