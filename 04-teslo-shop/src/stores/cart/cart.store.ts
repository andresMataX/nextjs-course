import { CartProduct } from '@/interfaces'
import { StateCreator, create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  cart: CartProduct[]
}

interface Actions {
  getTotalItems: () => number
  getSummaryInformation: () => {
    subTotal: number
    tax: number
    total: number
    itemsInCart: number
  }
  addProductToCart: (product: CartProduct) => void
  updateProductQuantity: (product: CartProduct, quantity: number) => void
  removeProduct: (product: CartProduct) => void
  clear: () => void
}

type CartStore = State & Actions

const storeApi: StateCreator<CartStore> = (set, get) => ({
  cart: [],

  getTotalItems: () => {
    const { cart } = get()

    return cart.reduce((total, item) => total + item.quantity, 0)
  },

  getSummaryInformation: () => {
    const { cart } = get()

    const subTotal = cart.reduce(
      (subTotal, item) => item.quantity * item.price + subTotal,
      0
    )
    const tax = subTotal * 0.15
    const total = subTotal + tax
    const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0)

    return {
      subTotal,
      tax,
      total,
      itemsInCart,
    }
  },

  addProductToCart: (product) => {
    const { cart } = get()

    const productInCart = cart.some(
      (item) => item.id === product.id && item.size === product.size
    )

    if (!productInCart) {
      set({
        cart: [...cart, product],
      })

      return
    }

    const updatedCartProducts = cart.map((item) => {
      if (item.id === product.id && product.size === item.size) {
        return {
          ...item,
          quantity: item.quantity + product.quantity,
        }
      }

      return item
    })

    set({ cart: updatedCartProducts })
  },

  updateProductQuantity: (product, quantity) => {
    const { cart } = get()

    const updatedCartProducts = cart.map((item) => {
      if (item.id === product.id && product.size === item.size) {
        return {
          ...item,
          quantity,
        }
      }

      return item
    })

    set({ cart: updatedCartProducts })
  },

  removeProduct: (product) => {
    const { cart } = get()

    const updatedCartProducts = cart.filter(
      (item) => !(item.id === product.id && product.size === item.size)
    )

    set({ cart: updatedCartProducts })
  },

  clear: () => {
    set({ cart: [] })
  },
})

export const useCartStore = create<CartStore>()(
  persist(storeApi, { name: 'cart-store' })
)
