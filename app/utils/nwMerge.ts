type ClassValue = string | null | undefined | boolean | { [key: string]: boolean }

/**
 * Utility function to merge NativeWind classes
 * @example
 * // Basic usage
 * nwMerge('p-4', 'bg-blue-500')
 *
 * // With conditions
 * nwMerge('p-4', isActive && 'bg-blue-500', !isActive && 'bg-gray-500')
 *
 * // With object syntax
 * nwMerge('p-4', { 'bg-blue-500': isActive, 'bg-gray-500': !isActive })
 */
export function nwMerge(...inputs: ClassValue[]): string {
  return inputs
    .flat()
    .filter(Boolean)
    .map((input) => {
      if (typeof input === "string") return input
      if (typeof input === "object") {
        return Object.entries(input)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key)
          .join(" ")
      }
      return ""
    })
    .join(" ")
    .trim()
}
