import { View, TouchableOpacity } from "react-native"
import { styled } from "nativewind"
import { Icon } from "./Icon"
import { nwMerge } from "@/utils/nwMerge"

const StyledView = styled(View)
const StyledTouchableOpacity = styled(TouchableOpacity)

interface ColorPickerProps {
  /**
   * The currently selected color
   */
  selectedColor?: string
  /**
   * Callback when a color is selected
   */
  onSelectColor?: (color: string) => void
  /**
   * Optional style overrides for the container
   */
  className?: string
}

const COLORS = [
  "#0EA5E9", // sky-500
  "#14B8A6", // teal-500
  "#10B981", // emerald-500
  "#F59E0B", // amber-500
  "#EF4444", // red-500
  "#8B5CF6", // violet-500
]

export function ColorPicker({ selectedColor, onSelectColor, className }: ColorPickerProps) {
  return (
    <StyledView className={nwMerge("flex-row gap-2", className)}>
      {COLORS.map((color) => {
        const isSelected = color === selectedColor

        return (
          <StyledTouchableOpacity
            key={color}
            className={nwMerge(
              "w-8 h-8 rounded-full items-center justify-center",
              isSelected ? "border-2 border-neutral-900" : "",
            )}
            style={{ backgroundColor: color }}
            onPress={() => onSelectColor?.(color)}
          >
            {isSelected && <Icon icon="BsCheck" size="md" color="white" />}
          </StyledTouchableOpacity>
        )
      })}
    </StyledView>
  )
}
