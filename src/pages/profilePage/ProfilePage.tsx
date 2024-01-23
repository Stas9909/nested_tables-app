import React from 'react'
import useStore from '../../store/store'
import classes from './ProfilePage.module.css'
import { useNavigate } from 'react-router-dom'
import { Profile } from '../../store/store'
import useSorting from '../../components/useSorting'

const ProfilePage: React.FC = () => {
	const selectedAccount = useStore(state => state.selectedAccount)
	const selectProfile = useStore(state => state.selectProfile)
	const setFilterByMarketplace = useStore(state => state.setFilterByMarketplace)
	const filterByMarketplace = useStore(state => state.filterByMarketplace)

	const navigate = useNavigate()

	const profiles = selectedAccount?.profiles

	const { handleSort, sortedItems } = useSorting<Profile>({
		key: 'profileId',
		direction: 'ascending'
	})

	const handleMarketplaceFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const marketplace = event.target.value
		setFilterByMarketplace && setFilterByMarketplace(marketplace)
	}

	const handleSelectProfile = (profileId: string) => {
		selectProfile(profileId)
		navigate(`/profile/${selectedAccount?.accountId}/campaigns/${profileId}`)
	}

	const filteredProfiles = sortedItems(profiles || []).filter(profile => filterByMarketplace ? profile.marketplace === filterByMarketplace : true)

	return (
		<div>
			<h2>ProfilePage</h2>

			<label>Filter by marketplace:</label>
			<select value={filterByMarketplace || ''} onChange={handleMarketplaceFilterChange}>
				<option value="">All marketplaces</option>
				<option value="Amazon">Amazon</option>
				<option value="eBay">eBay</option>
				<option value="Zalando">Zalando</option>
				<option value="Cdiscount">Cdiscount</option>
				<option value="Shopify">Shopify</option>
				<option value="Etsy">Etsy</option>
				<option value="Rakuten">Rakuten</option>
				<option value="MercadoLibre">MercadoLibre</option>
				<option value="Flipkart">Flipkart</option>
				<option value="Coupang">Coupang</option>
				<option value="El Corte Inglés">El Corte Inglés</option>
				<option value="Alibaba">Alibaba</option>
				<option value="Bol.com">Bol.com</option>
				<option value="CDON">CDON</option>
				<option value="Wildberries">Wildberries</option>
				<option value="Taobao">Taobao</option>
				<option value="Takealot">Takealot</option>
				<option value="Jumia">Jumia</option>
				<option value="Lazada">Lazada</option>
				<option value="Shopee">Shopee</option>
				<option value="Tokopedia">Tokopedia</option>
				<option value="Souq">Souq</option>
				<option value="Noon">Noon</option>
				<option value="Trendyol">Trendyol</option>
				<option value="Skroutz">Skroutz</option>
				<option value="Allegro">Allegro</option>
				<option value="Amazon UK">Amazon UK</option>
				<option value="Otto">Otto</option>
			</select>

			{selectedAccount && (
				<table className={classes.accountsTable}>
					<thead>
						<tr>
							<th onClick={() => handleSort('profileId')}>Profile ID</th>
							<th onClick={() => handleSort('country')}>Country</th>
							<th onClick={() => handleSort('marketplace')}>Marketplace</th>
						</tr>
					</thead>
					<tbody>
						{filteredProfiles?.map(profile => (
							<tr key={profile.profileId} onClick={() => handleSelectProfile(profile.profileId)}>
								<td>{profile.profileId}</td>
								<td>{profile.country}</td>
								<td>{profile.marketplace}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}

export default ProfilePage
