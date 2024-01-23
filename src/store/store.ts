import { create } from 'zustand'

export interface Campaign {
	campaignId: string;
	clicks: number;
	cost: number;
	date: string;
}

export interface Profile {
	profileId: string;
	country: string;
	marketplace: string;
	campaigns: Campaign[];
}

export interface Account {
	accountId: string;
	email: string;
	authToken: string;
	creationDate: string; 
	profiles: Profile[];
}

interface Store {
	accounts: Account[];
	selectedAccount: Account | null;
	selectedProfile: Profile | null;
	selectedCampaign: Campaign | null;
	isLoading: boolean;
	setAccounts: () => Promise<void>;
	selectAccount: (accountId: string) => void;
	selectProfile: (profileId: string) => void;
	selectCampaign: (campaignId: string) => void;
	
	currentPage: number;
	itemsPerPage: number;
	setPage: (page: number) => void;

  filterByYear?: number | null;
  filterByMarketplace?: string | null;
  filterByCost?: string | null;
  setFilterByYear?: (year: number | null) => void;
  setFilterByMarketplace?: (marketplace: string | null) => void;
  setFilterByCost?: (cost: string | null) => void;
}

const useStore = create<Store>((set) => ({
	accounts: [],
	selectedAccount: null,
	selectedProfile: null,
	selectedCampaign: null,
	isLoading: false,

	currentPage: 0,
	itemsPerPage: 10,
	setPage: (page) => set((state) => ({ ...state, currentPage: page })),

  filterByYear: null,
  filterByMarketplace: null,
  filterByCost: null,
  setFilterByYear: (year) => set({ filterByYear: year }),
  setFilterByMarketplace: (marketplace) => set({ filterByMarketplace: marketplace }),
  setFilterByCost: (cost) => set({ filterByCost: cost }),

	setAccounts: async () => {
		try {
			set({ isLoading: true })
			const response = await fetch('/tables-data.json')
			const data = await response.json()
			set({ accounts: data })
		} catch (error) {
			console.error('Error loading data:', error)
		} finally {
			set({ isLoading: false })
		}
	},
	selectAccount: accountId =>
		set(state => ({
			selectedAccount: state.accounts.find(acc => acc.accountId === accountId) || null,
			selectedProfile: null,
			selectedCampaign: null
		})),
	selectProfile: profileId =>
		set(state => ({
			selectedProfile: state.selectedAccount?.profiles.find(prof => prof.profileId === profileId) || null,
			selectedCampaign: null
		})),
	selectCampaign: campaignId =>
		set(state => ({
			selectedCampaign: state.selectedProfile?.campaigns.find(camp => camp.campaignId === campaignId) || null
		}))
}))

export default useStore
