import React from 'react'
import useStore from '../../store/store'
import classes from './CampaignsPage.module.css'
import useSorting from '../../components/useSorting'
import { Campaign } from '../../store/store'

const CampaignsPage: React.FC = () => {
	const selectedProfile = useStore(state => state.selectedProfile)
	const filterByCost = useStore(state => state.filterByCost)
	const setFilterByCost = useStore(state => state.setFilterByCost)

	const campaigns = selectedProfile?.campaigns

	const { handleSort, sortedItems } = useSorting<Campaign>({
		key: 'campaignId',
		direction: 'ascending'
	})

	const handleCostFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const costFilter = event.target.value
		setFilterByCost && setFilterByCost(costFilter)
	}

	const filteredCampaigns = sortedItems(campaigns || []).filter(campaign => {
		const cost = campaign.cost
		return !filterByCost || (isNaN(cost) ? true : filterByCost === 'moreThan1000' ? cost > 1000 : cost <= 1000)
	})

	return (
		<div>
			<h2>CampaignPage</h2>

			<label>Filter by price:</label>
			<select value={filterByCost || ''} onChange={handleCostFilterChange}>
				<option value="">All prices</option>
				<option value="moreThan1000">more then 1000</option>
				<option value="lessThan1000">less then 1000</option>
			</select>

			{selectedProfile && (
				<table className={classes.accountsTable}>
					<thead>
						<tr>
							<th onClick={() => handleSort('campaignId')}>Campaign ID</th>
							<th onClick={() => handleSort('clicks')}>clicks</th>
							<th onClick={() => handleSort('cost')}>cost</th>
							<th onClick={() => handleSort('date')}>date</th>
						</tr>
					</thead>
					<tbody>
						{filteredCampaigns?.map(campaign => (
							<tr key={campaign.campaignId}>
								<td>{campaign.campaignId}</td>
								<td>{campaign.clicks}</td>
								<td>{campaign.cost}</td>
								<td>{campaign.date}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}

export default CampaignsPage
