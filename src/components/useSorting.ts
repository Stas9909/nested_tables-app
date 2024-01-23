import { useState } from 'react'

type SortDirection = 'ascending' | 'descending'

type SortedConfig<T> = {
	key: keyof T
	direction: SortDirection
}

const useSorting = <T>(initialConfig: SortedConfig<T>) => {
	const [sortConfig, setSortConfig] = useState<SortedConfig<T>>(initialConfig)

	const handleSort = (key: keyof T) => {
		if (sortConfig.key === key && sortConfig.direction === 'ascending') {
			setSortConfig(prev => ({ ...prev, direction: 'descending' }))
		} else {
			setSortConfig({ key, direction: 'ascending' })
		}
	}

	const sortedItems = (items: T[]): T[] => {
		const sortableItems = [...items]
		sortableItems.sort((a, b) => {
			let valueA = a[sortConfig.key] as string | number | Date
			let valueB = b[sortConfig.key] as string | number | Date
			// let valueA = a[sortConfig.key];
			// let valueB = b[sortConfig.key];
			if (sortConfig.key === 'creationDate' || sortConfig.key === 'date') {
				valueA = new Date(valueA)
				valueB = new Date(valueB)
			}
			if (sortConfig.key === 'email') {
				const regex = /(\D*)(\d*)/ // Разбиваем строку на текст и цифры
				const matchA = (valueA as string).match(regex)
				const matchB = (valueB as string).match(regex)

				if (matchA && matchB) {
					const [textA, numberA] = matchA.slice(1)
					const [textB, numberB] = matchB.slice(1)

					if (textA.localeCompare(textB) !== 0) {
						// Если текст различен, сортируем по тексту
						return sortConfig.direction === 'ascending' ? textA.localeCompare(textB) : textB.localeCompare(textA)
					}

					// Если текст одинаковый, сортируем по числам
					return sortConfig.direction === 'ascending'
						? parseInt(numberA) - parseInt(numberB)
						: parseInt(numberB) - parseInt(numberA)
				}
			}
			if (typeof valueA === 'string' && typeof valueB === 'string') {
				// Пробуем сравнить как числа, если возможно
				const numberA = parseFloat(valueA)
				const numberB = parseFloat(valueB)

				if (!isNaN(numberA) && !isNaN(numberB)) {
					return sortConfig.direction === 'ascending' ? numberA - numberB : numberB - numberA
				}

				return sortConfig.direction === 'ascending' ? (valueA > valueB ? 1 : -1) : valueA < valueB ? 1 : -1
			} else if (typeof valueA === 'number' && typeof valueB === 'number') {
				return sortConfig.direction === 'ascending' ? valueA - valueB : valueB - valueA
			} else if (valueA instanceof Date && valueB instanceof Date) {
				return sortConfig.direction === 'ascending'
					? valueA.getTime() - valueB.getTime()
					: valueB.getTime() - valueA.getTime()
			}

			return 0;
		})
		return sortableItems
	}
	return { handleSort, sortedItems }
}

export default useSorting
