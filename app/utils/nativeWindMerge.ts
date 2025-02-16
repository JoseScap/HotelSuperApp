type ClassValue = string | null | undefined | Record<string, boolean> | ClassValue[]

/**
 * Merges multiple NativeWind class names into a single string, handling conditional classes.
 * @param {...ClassValue[]} classes - The class values to merge.
 * @returns {string} The merged class string.
 * @example
 * // Basic usage
 * nwMerge('text-base', 'font-bold') // => 'text-base font-bold'
 *
 * // With conditionals
 * nwMerge('text-base', { 'text-error': hasError, 'text-disabled': isDisabled })
 *
 * // With arrays
 * nwMerge(['text-base', 'font-bold'], 'text-center')
 *
 * // With undefined/null values
 * nwMerge('text-base', condition && 'text-bold', undefined)
 */
export function nwMerge(...classes: ClassValue[]): string {
  const processClassValue = (value: ClassValue): string[] => {
    if (!value) return []
    if (Array.isArray(value)) return value.flatMap(processClassValue)
    if (typeof value === "string") return value.split(" ").filter(Boolean)
    if (typeof value === "object") {
      return Object.entries(value)
        .filter(([_, condition]) => Boolean(condition))
        .map(([className]) => className)
    }
    return []
  }

  return classes.flatMap(processClassValue).filter(Boolean).join(" ").trim()
}

// Alias for backward compatibility
export const nativeWindMerge = nwMerge
