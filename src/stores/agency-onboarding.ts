import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AgencyOnboardingState {
  step: 1 | 2 | 3 | 4;
  appId: string | null;
  appName: string | null;
  username: string | null;
}

interface AgencyOnboardingActions {
  completeStep1: (appId: string, appName: string) => void;
  goToStep2: () => void;
  goToStep3: () => void;
  completeStep3: (username: string) => void;
  setStep: (step: 1 | 2 | 3 | 4) => void;
  reset: () => void;
}

const initialState: AgencyOnboardingState = {
  step: 1,
  appId: null,
  appName: null,
  username: null,
};

export const useAgencyOnboardingStore = create<AgencyOnboardingState & AgencyOnboardingActions>()(
  persist(
    (set) => ({
      ...initialState,
      completeStep1: (appId, appName) => set({ appId, appName, step: 2 }),
      goToStep2: () => set({ step: 2 }),
      goToStep3: () => set({ step: 3 }),
      completeStep3: (username) => set({ username, step: 4 }),
      setStep: (step) => set({ step }),
      reset: () => set(initialState),
    }),
    {
      name: "agency-onboarding-v1",
    }
  )
);
