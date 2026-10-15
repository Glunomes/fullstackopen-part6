import { create } from "zustand";

export const useStatisticsStore = create(set => ({
  counterGood: 0,
  counterNeutral: 0,
  counterBad: 0,

  actions: {
    goodIncrement: () => set(state => ({counterGood: state.counterGood + 1})),
    badIncrement: () => set(state => ({counterBad: state.counterBad + 1})),
    neutralIncrement: () => set(state => ({counterNeutral: state.counterNeutral + 1})),
  }
}))

export const useCounterControls = () => useStatisticsStore(state => state.actions)