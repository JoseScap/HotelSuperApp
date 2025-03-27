import { FC } from "react"
import { BottomHomeTabScreenProps } from "@/navigators/BottomNavigator"
import { Icon } from "@/components"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { translate } from "@/i18n"
import {
  StyledView,
  StyledText,
  StyledTouchableOpacity,
  StyledScrollView,
} from "@/components/StyledComponents"

interface ExpenseItem {
  id: string
  title: string
  amount: number
  date: string
  category: string
  icon: string
  iconSet: "MaterialIcons" | "FontAwesome5" | "MaterialCommunityIcons"
}

const DUMMY_EXPENSES: ExpenseItem[] = [
  {
    id: "1",
    title: "Servicio a la habitación - Cena",
    amount: 45.5,
    date: "15/04/2023",
    category: "Comida",
    icon: "room-service",
    iconSet: "MaterialIcons",
  },
  {
    id: "2",
    title: "Tratamiento de Spa",
    amount: 120,
    date: "14/04/2023",
    category: "Bienestar",
    icon: "spa",
    iconSet: "MaterialIcons",
  },
  {
    id: "3",
    title: "Mini Bar",
    amount: 32.75,
    date: "13/04/2023",
    category: "Comida",
    icon: "liquor",
    iconSet: "MaterialIcons",
  },
]

export const PaymentsScreen: FC<BottomHomeTabScreenProps<"Payments">> = function PaymentsScreen() {
  const insets = useSafeAreaInsets()

  // Calculate total expenses
  const totalExpenses = DUMMY_EXPENSES.reduce((sum, item) => sum + item.amount, 0)

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <StyledView className="flex-1 bg-primary">
      {/* Header */}
      <StyledView style={{ paddingTop: insets.top + 10 }} className="px-5 pt-5 pb-6">
        <StyledText className="text-white text-xl font-bold mb-1">
          {translate("paymentsScreen:header:title")}
        </StyledText>
        <StyledText className="text-white/80 text-sm">
          {translate("paymentsScreen:header:subtitle")}
        </StyledText>
      </StyledView>

      {/* Content */}
      <StyledScrollView showsVerticalScrollIndicator={true} className="p-4 bg-white rounded-t-3xl">
        <StyledView className="flex-row items-center mb-6">
          <Icon
            icon="account-balance-wallet"
            iconSet="MaterialIcons"
            isVectorIcon
            size={28}
            color="#000000"
            containerClassName="mr-3"
          />
          <StyledText className="text-2xl font-bold">
            {translate("paymentsScreen:account:title")}
          </StyledText>
        </StyledView>

        {/* Account Summary */}
        <StyledView className="bg-white p-4 rounded-lg shadow mb-6">
          <StyledText className="text-lg font-semibold mb-2">
            {translate("paymentsScreen:account:summary")}
          </StyledText>
          <StyledView className="flex-row justify-between items-center mb-2">
            <StyledText className="text-gray-600">
              {translate("paymentsScreen:account:totalBalance")}
            </StyledText>
            <StyledText className="text-xl font-bold">${totalExpenses.toFixed(2)}</StyledText>
          </StyledView>
          <StyledView className="flex-row justify-between items-center">
            <StyledText className="text-gray-600">
              {translate("paymentsScreen:account:paymentStatus")}
            </StyledText>
            <StyledView className="flex-row items-center">
              <StyledView className="w-3 h-3 rounded-full bg-green-500 mr-2" />
              <StyledText className="text-green-600">
                {translate("paymentsScreen:account:paid")}
              </StyledText>
            </StyledView>
          </StyledView>
        </StyledView>

        {/* Payment Methods */}
        <StyledView className="mb-6">
          <StyledText className="text-lg font-semibold mb-4">
            {translate("paymentsScreen:paymentMethods:title")}
          </StyledText>
          <StyledView className="bg-white p-4 rounded-lg shadow mb-3 flex-row justify-between items-center">
            <StyledView className="flex-row items-center">
              <Icon
                icon="credit-card"
                iconSet="MaterialIcons"
                isVectorIcon
                size={24}
                color="#10B981"
                containerClassName="mr-3"
              />
              <StyledText>
                {translate("paymentsScreen:paymentMethods:cardEnding", { number: "4242" })}
              </StyledText>
            </StyledView>
            <StyledText className="text-primary font-semibold">
              {translate("paymentsScreen:paymentMethods:default")}
            </StyledText>
          </StyledView>
          <StyledTouchableOpacity className="flex-row items-center justify-center p-3 border border-dashed border-gray-300 rounded-lg">
            <Icon
              icon="add-circle-outline"
              iconSet="MaterialIcons"
              isVectorIcon
              size={20}
              color="#6B7280"
              containerClassName="mr-2"
            />
            <StyledText className="text-gray-500">
              {translate("paymentsScreen:paymentMethods:addNew")}
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        {/* Recent Expenses */}
        <StyledView>
          <StyledView className="flex-row items-center mb-4">
            <Icon
              icon="receipt-long"
              iconSet="MaterialIcons"
              isVectorIcon
              size={24}
              color="#000000"
              containerClassName="mr-2"
            />
            <StyledText className="text-lg font-semibold">
              {translate("paymentsScreen:recentExpenses:title")}
            </StyledText>
          </StyledView>

          {DUMMY_EXPENSES.map((expense) => (
            <StyledView key={expense.id} className="bg-white p-4 rounded-lg shadow mb-3">
              <StyledView className="flex-row items-center justify-between mb-1">
                <StyledView className="flex-row items-center">
                  <StyledView className="h-8 w-8 rounded-full bg-primary/10 items-center justify-center mr-3">
                    <Icon
                      icon={expense.icon}
                      iconSet={expense.iconSet}
                      isVectorIcon
                      size={16}
                      color="#10B981"
                    />
                  </StyledView>
                  <StyledText className="font-semibold">{expense.title}</StyledText>
                </StyledView>
                <StyledText className="font-bold">${expense.amount.toFixed(2)}</StyledText>
              </StyledView>
              <StyledView className="flex-row justify-between items-center ml-11">
                <StyledText className="text-xs text-gray-500">{expense.date}</StyledText>
                <StyledView className="px-2 py-1 bg-gray-100 rounded">
                  <StyledText className="text-xs">{expense.category}</StyledText>
                </StyledView>
              </StyledView>
            </StyledView>
          ))}
        </StyledView>
      </StyledScrollView>
    </StyledView>
  )
}
