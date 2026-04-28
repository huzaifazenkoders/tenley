import type { User } from "@supabase/supabase-js";
import { create } from "zustand";
import type {
  CompanyInfo,
  MeResponse,
  ProfileInfo,
} from "@/features/settings/services/settingsService";

const getCompanyFromMe = (me: MeResponse | null): CompanyInfo | null =>
  me?.company ?? me?.company_profile ?? me?.company_information ?? null;

const getProfileFromMe = (me: MeResponse | null): ProfileInfo | null =>
  me?.profile ?? me?.profile_information ?? null;

interface UserState {
  user: User | null;
  me: MeResponse | null;
  company: CompanyInfo | null;
  profile: ProfileInfo | null;
  isLoading: boolean;
  isMeLoading: boolean;
  setUser: (user: User | null) => void;
  setMe: (me: MeResponse | null) => void;
  setLoading: (loading: boolean) => void;
  setMeLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  me: null,
  company: null,
  profile: null,
  isLoading: true,
  isMeLoading: true,
  setUser: (user) =>
    set((state) => ({
      user,
      isLoading: false,
      isMeLoading: user ? !state.me : false,
      ...(user
        ? {}
        : {
            me: null,
            company: null,
            profile: null,
          }),
    })),
  setMe: (me) =>
    set({
      me,
      company: getCompanyFromMe(me),
      profile: getProfileFromMe(me),
      isMeLoading: false,
    }),
  setLoading: (isLoading) => set({ isLoading }),
  setMeLoading: (isMeLoading) => set({ isMeLoading }),
}));
