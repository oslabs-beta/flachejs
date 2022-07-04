import create from 'zustand'

const useStore = create((set) => ({
  duration: [],
  setDuration: (arr) => {set((state) => ({ duration: arr }))},
}))

export default useStore;