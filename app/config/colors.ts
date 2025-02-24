export interface ColorOption {
  label: string
  value: string
  isLight?: boolean
}

export const colorOptions = {
  primary: [
    { label: "Sky Blue", value: "#0EA5E9", isLight: true },
    { label: "Royal Blue", value: "#2563EB", isLight: true },
    { label: "Purple", value: "#9333EA", isLight: true },
    { label: "Rose", value: "#E11D48", isLight: true },
    { label: "Orange", value: "#F97316", isLight: true },
  ],
  secondary: [
    { label: "Amber", value: "#F59E0B", isLight: true },
    { label: "Emerald", value: "#10B981", isLight: true },
    { label: "Violet", value: "#8B5CF6", isLight: true },
    { label: "Pink", value: "#EC4899", isLight: true },
    { label: "Teal", value: "#14B8A6", isLight: true },
  ],
  text: [
    { label: "Slate", value: "#0F172A", isLight: false },
    { label: "Gray", value: "#1F2937", isLight: false },
    { label: "Zinc", value: "#18181B", isLight: false },
    { label: "Light Gray", value: "#94A3B8", isLight: true },
    { label: "Neutral", value: "#64748B", isLight: true },
  ],
  background: [
    { label: "White", value: "#FFFFFF", isLight: true },
    { label: "Slate", value: "#F8FAFC", isLight: true },
    { label: "Gray", value: "#F3F4F6", isLight: true },
    { label: "Cool Gray", value: "#F1F5F9", isLight: true },
    { label: "Blue Gray", value: "#F1F5F9", isLight: true },
  ],
}
