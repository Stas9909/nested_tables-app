import React, { useEffect } from 'react'
import useStore from '../../store/store'
import ReactPaginate from 'react-paginate'
import classes from './AccountsPage.module.css'
import { useNavigate } from 'react-router-dom'
import useSorting from '../../components/useSorting'
import { Account } from '../../store/store'


const AccountsPage: React.FC = () => {
	const setAccounts = useStore(state => state.setAccounts)
	const accounts = useStore(state => state.accounts)
	const selectAccount = useStore(state => state.selectAccount)

	const currentPage = useStore(state => state.currentPage)
	const itemsPerPage = useStore(state => state.itemsPerPage)
	const setPage = useStore(state => state.setPage)

	const setFilterByYear = useStore(state => state.setFilterByYear)
	const filterByYear = useStore(state => state.filterByYear)

	const navigate = useNavigate()

	const { handleSort, sortedItems } = useSorting<Account>({
		key: 'accountId',
		direction: 'ascending'
	})

	useEffect(() => {
		const fetchData = async () => {
			await setAccounts()
		}

		fetchData()
	}, [setAccounts])

	const handleYearFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const year = parseInt(event.target.value)
		setFilterByYear && setFilterByYear(isNaN(year) ? null : year)
	}

	if (setPage === undefined || itemsPerPage === undefined) {
		return null
	}

	const handleSelectAccount = (accountId: string) => {
		selectAccount(accountId)
		navigate(`/profile/${accountId}`)
	}

	const handlePageClick = (data: { selected: number }) => {
		setPage(data.selected)
	}

	const filteredAccounts = sortedItems(accounts || []).filter(account =>
		filterByYear ? new Date(account.creationDate).getFullYear() === filterByYear : true
	)

  const currentAccounts = filteredAccounts.slice(
		currentPage * itemsPerPage,
		(currentPage + 1) * itemsPerPage
	)

	return (
		<div className={classes.accountWrapper}>
			<div className={classes.tableContainer}>
				<h2>AccountsPage</h2>

				<label>Filter by year:</label>
				<select value={filterByYear || ''} onChange={handleYearFilterChange}>
					<option value="">All years</option>
					<option value="2023">2023</option>
					<option value="2024">2024</option>
				</select>

				<table className={classes.accountsTable}>
					<thead>
						<tr>
							<th onClick={() => handleSort('accountId')}>Account ID</th>
							<th onClick={() => handleSort('email')}>Email</th>
							<th onClick={() => handleSort('authToken')}>authToken</th>
							<th onClick={() => handleSort('creationDate')}>Creation Date</th>
						</tr>
					</thead>
					<tbody>
						{currentAccounts.map(account => (
							<tr key={account.accountId} onClick={() => handleSelectAccount(account.accountId)}>
								<td>{account.accountId}</td>
								<td>{account.email}</td>
								<td>{account.authToken}</td>
								<td>{account.creationDate}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<ReactPaginate
				breakLabel="..."
				nextLabel="next >"
				onPageChange={handlePageClick}
				// pageRangeDisplayed={3}
				pageCount={Math.ceil(accounts.length / itemsPerPage)}
				previousLabel="< previous"
				forcePage={currentPage}
				activeClassName={classes.active}
			/>
		</div>
	)
}

export default AccountsPage
