import { useScrollToTop } from "@react-navigation/native"
import { StatusBar, StatusBarProps, StatusBarStyle } from "expo-status-bar"
import { ReactNode, useRef, useState } from "react"
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  LayoutChangeEvent,
  Platform,
  ScrollView,
  ScrollViewProps,
  View,
} from "react-native"
import { ExtendedEdge, useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import { styled } from "nativewind"
import { nwMerge } from "@/utils/nwMerge"

const StyledView = styled(View)
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)
const StyledKeyboardAwareScrollView = styled(KeyboardAwareScrollView)

export const DEFAULT_BOTTOM_OFFSET = 50

interface BaseScreenProps {
  /**
   * Children components.
   */
  children?: ReactNode
  /**
   * Style for the outer content container useful for padding & margin.
   */
  className?: string
  /**
   * Style for the inner content container useful for padding & margin.
   */
  contentClassName?: string
  /**
   * Override the default edges for the safe area.
   */
  safeAreaEdges?: ExtendedEdge[]
  /**
   * Background color class from Tailwind (e.g. "bg-background-primary")
   */
  backgroundClassName?: string
  /**
   * Status bar setting. Defaults to dark.
   */
  statusBarStyle?: StatusBarStyle
  /**
   * By how much should we offset the keyboard? Defaults to 0.
   */
  keyboardOffset?: number
  /**
   * By how much we scroll up when the keyboard is shown. Defaults to 50.
   */
  keyboardBottomOffset?: number
  /**
   * Pass any additional props directly to the StatusBar component.
   */
  StatusBarProps?: StatusBarProps
  /**
   * Pass any additional props directly to the KeyboardAvoidingView component.
   */
  KeyboardAvoidingViewProps?: KeyboardAvoidingViewProps
}

interface FixedScreenProps extends BaseScreenProps {
  preset?: "fixed"
}

interface ScrollScreenProps extends BaseScreenProps {
  preset?: "scroll"
  /**
   * Should keyboard persist on screen tap. Defaults to handled.
   * Only applies to scroll preset.
   */
  keyboardShouldPersistTaps?: "handled" | "always" | "never"
  /**
   * Pass any additional props directly to the ScrollView component.
   */
  ScrollViewProps?: ScrollViewProps
}

interface AutoScreenProps extends Omit<ScrollScreenProps, "preset"> {
  preset?: "auto"
  /**
   * Threshold to trigger the automatic disabling/enabling of scroll ability.
   * Defaults to { percent: 0.92 }.
   */
  scrollEnabledToggleThreshold?: { percent?: number; point?: number }
}

export type ScreenProps = ScrollScreenProps | FixedScreenProps | AutoScreenProps

const isIos = Platform.OS === "ios"

type ScreenPreset = "fixed" | "scroll" | "auto"

function isNonScrolling(preset?: ScreenPreset) {
  return !preset || preset === "fixed"
}

function useAutoPreset(props: AutoScreenProps) {
  const { preset, scrollEnabledToggleThreshold } = props
  const { percent = 0.92, point = 0 } = scrollEnabledToggleThreshold || {}

  const scrollViewHeight = useRef<null | number>(null)
  const scrollViewContentHeight = useRef<null | number>(null)
  const [scrollEnabled, setScrollEnabled] = useState(true)

  function updateScrollState() {
    if (scrollViewHeight.current === null || scrollViewContentHeight.current === null) return

    const contentFitsScreen = (function () {
      if (point) {
        return scrollViewContentHeight.current < scrollViewHeight.current - point
      } else {
        return scrollViewContentHeight.current < scrollViewHeight.current * percent
      }
    })()

    if (scrollEnabled && contentFitsScreen) setScrollEnabled(false)
    if (!scrollEnabled && !contentFitsScreen) setScrollEnabled(true)
  }

  function onContentSizeChange(w: number, h: number) {
    scrollViewContentHeight.current = h
    updateScrollState()
  }

  function onLayout(e: LayoutChangeEvent) {
    const { height } = e.nativeEvent.layout
    scrollViewHeight.current = height
    updateScrollState()
  }

  if (preset === "auto") updateScrollState()

  return {
    scrollEnabled: preset === "auto" ? scrollEnabled : true,
    onContentSizeChange,
    onLayout,
  }
}

function ScreenWithoutScrolling(props: ScreenProps) {
  const { className, contentClassName, children, preset } = props
  return (
    <StyledView className={nwMerge("flex-1 h-full w-full", className)}>
      <StyledView
        className={nwMerge(
          "justify-start items-stretch",
          preset === "fixed" && "justify-end",
          contentClassName,
        )}
      >
        {children}
      </StyledView>
    </StyledView>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const {
    children,
    keyboardShouldPersistTaps = "handled",
    keyboardBottomOffset = DEFAULT_BOTTOM_OFFSET,
    contentClassName,
    ScrollViewProps,
    className,
  } = props as ScrollScreenProps

  const ref = useRef<ScrollView>(null)

  const { scrollEnabled, onContentSizeChange, onLayout } = useAutoPreset(props as AutoScreenProps)

  useScrollToTop(ref)

  return (
    <StyledKeyboardAwareScrollView
      bottomOffset={keyboardBottomOffset}
      {...{ keyboardShouldPersistTaps, scrollEnabled, ref }}
      {...ScrollViewProps}
      onLayout={(e) => {
        onLayout(e)
        ScrollViewProps?.onLayout?.(e)
      }}
      onContentSizeChange={(w: number, h: number) => {
        onContentSizeChange(w, h)
        ScrollViewProps?.onContentSizeChange?.(w, h)
      }}
      style={ScrollViewProps?.style}
      className="justify-start items-stretch"
      contentContainerStyle={ScrollViewProps?.contentContainerStyle}
    >
      <StyledView className={nwMerge("flex-1 h-full w-full", className)}>
        <StyledView className={nwMerge("justify-start items-stretch", contentClassName)}>
          {children}
        </StyledView>
      </StyledView>
    </StyledKeyboardAwareScrollView>
  )
}

export function Screen(props: ScreenProps) {
  const {
    backgroundClassName = "bg-background-primary",
    KeyboardAvoidingViewProps,
    keyboardOffset = 0,
    safeAreaEdges,
    StatusBarProps,
    statusBarStyle = "dark",
  } = props

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges)

  return (
    <StyledView
      className={nwMerge("flex-1 h-full w-full", backgroundClassName)}
      style={$containerInsets}
    >
      <StatusBar style={statusBarStyle} {...StatusBarProps} />

      <StyledKeyboardAvoidingView
        className="flex-1"
        behavior={isIos ? "padding" : "height"}
        keyboardVerticalOffset={keyboardOffset}
        {...KeyboardAvoidingViewProps}
      >
        {isNonScrolling(props.preset) ? (
          <ScreenWithoutScrolling {...props} />
        ) : (
          <ScreenWithScrolling {...props} />
        )}
      </StyledKeyboardAvoidingView>
    </StyledView>
  )
}
