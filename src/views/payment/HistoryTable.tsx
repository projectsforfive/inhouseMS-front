'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import type { DateRange } from '@mui/x-date-pickers-pro/models'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'
// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getPaginationRowModel,
    getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Type Imports
import type { PaymentType } from '@/types/paymentTypes'

// Component Imports
import PaymentRequestsDrawer from './PaymentRequestsDrawer'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// income and expense
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/redux/index'
import { deletePaymentFromAPI } from '@/redux/slices/payment.slice'

declare module '@tanstack/table-core' {
    interface FilterFns {
        fuzzy: FilterFn<unknown>
    }
    interface FilterMeta {
        itemRank: RankingInfo
    }
}

type UsersTypeWithAction = PaymentType

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
        itemRank
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
}

const DebouncedInput = ({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
    // States
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return <TextField {...props} value={value} onChange={e => setValue(e.target.value)} size='small' />
}


// Column Definitions
const columnHelper = createColumnHelper<UsersTypeWithAction>()

const HistoryListTable = ({ tableData }: { tableData?: PaymentType[] }) => {

    const dispatch = useDispatch<any>()
    const { totalAmount } = useSelector((state: RootState) => state.payment)

    // States
    const [openPaymentRequestDrawer, setOpenPaymentRequestDrawer] = useState(false)
    const [rowSelection, setRowSelection] = useState({})
    const [editData, setEditData] = useState({})
    const [filteredData, setFilteredData] = useState(tableData)
    const [globalFilter, setGlobalFilter] = useState('')

    // Date Range Picker
    const [value, setValue] = useState<DateRange<Dayjs>>(() => [
        dayjs('2021-12-25'),
        dayjs('2022-01-25'),
    ]);

    const deletePayment = async (id: number) => {
        await dispatch(deletePaymentFromAPI(id))
    }
    const updatePayment = async (updatedPayment: any) => {
        setEditData(updatedPayment)
        setOpenPaymentRequestDrawer(true)
    }

    const columns = useMemo<ColumnDef<UsersTypeWithAction, any>[]>(
        () => [
            columnHelper.accessor('date', {
                header: 'Date',
                cell: ({ row }) => (

                    <div className='flex items-center gap-4'>
                        <div className='flex flex-col'>
                            <Typography className='font-medium' color='text.primary'>
                                {row.original.date}
                            </Typography>
                            <Typography variant='body2'>{row.original.date}</Typography>
                        </div>
                    </div>
                )
            }),
            columnHelper.accessor('method', {
                header: 'Method',
                cell: ({ row }) => <Typography>{row.original.method}</Typography>
            }),
            columnHelper.accessor('address', {
                header: 'Address',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>

                        <Typography className='capitalize' color='text.primary'>
                            {row.original.address}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('amount', {
                header: 'Amount ( $ )',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>

                        <Typography className='capitalize' color='text.primary'>
                            {row.original.amount}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('country', {
                header: 'Country',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>

                        <Typography className='capitalize' color='text.primary'>
                            {row.original.country}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('client', {
                header: 'Client',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>

                        <Typography className='capitalize' color='text.primary'>
                            {row.original.client}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('status', {
                header: 'Status',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>

                        <Typography className='capitalize' color='text.primary'>
                            {/* {row.original.status} */}
                            {row.original.status === 'Pending' ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" /><rect width="2" height="7" x="11" y="6" fill="currentColor" rx="1"><animateTransform attributeName="transform" dur="9s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></rect><rect width="2" height="9" x="11" y="11" fill="currentColor" rx="1"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></rect></svg> : row.original.status === 'Success' ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="currentColor" fillRule="evenodd" clipRule="evenodd"><path d="M15.62 3.596L7.815 12.81l-.728-.033L4 8.382l.754-.53l2.744 3.907L14.917 3z" /><path d="m7.234 8.774l4.386-5.178L10.917 3l-4.23 4.994zm-1.55.403l.548.78l-.547-.78zm-1.617 1.91l.547.78l-.799.943l-.728-.033L0 8.382l.754-.53l2.744 3.907l.57-.672z" /></g></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 5L5 19M5 5l14 14" color="currentColor" /></svg>}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('action', {
                header: 'Action',
                cell: ({ row }) => (

                    <div className='flex items-center'>
                        <IconButton disabled={!row.original.action} onClick={() => { if (row.original.id) deletePayment(row.original.id) }}>
                            <i className='ri-delete-bin-7-line text-textSecondary' />
                        </IconButton>
                        <IconButton disabled={!row.original.action} onClick={() => { if (row.original.id) updatePayment(tableData?.find(product => product.id === row.original.id)) }}>
                            <i className='ri-edit-box-line text-textSecondary' />
                        </IconButton>
                    </div>
                ),
                enableSorting: false
            }),
            columnHelper.accessor('description', {
                header: 'Description',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>

                        <Typography className='capitalize' color='text.primary'>
                            {row.original.description}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('io', {
                header: 'I/O',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>

                        <Typography className='capitalize' color='text.primary'>
                            {row.original.io}
                        </Typography>
                    </div>
                )
            }),

        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [tableData, filteredData]
    )

    const table = useReactTable({
        data: filteredData as PaymentType[],
        columns,
        filterFns: {
            fuzzy: fuzzyFilter
        },
        state: {
            rowSelection,
            globalFilter
        },
        initialState: {
            pagination: {
                pageSize: 10
            }
        },
        enableRowSelection: false, //enable row selection for all rows
        globalFilterFn: fuzzyFilter,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues()
    })


    return (
        <>
            <Card>
                <CardHeader title='Payment History' />
                <Divider />
                <div className='flex justify-between p-5 gap-4 flex-col items-start sm:flex-row sm:items-center'>
                    <div
                        color='secondary'
                        className='max-sm:is-full flex items-center gap-x-1 gap-4'
                    >
                        <i className='ri-money-dollar-circle-line text-xl' />
                        Total (In/Out) : ${totalAmount.income} / ${totalAmount.expense}
                    </div>
                    <div className='flex items-center gap-x-4 gap-4 flex-col max-sm:is-full sm:flex-row'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={['SingleInputDateRangeField']}
                            >
                                <SingleInputDateRangeField
                                    label="Select Date Range"
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <DebouncedInput
                            value={globalFilter ?? ''}
                            onChange={value => setGlobalFilter(String(value))}
                            placeholder='Search ...'
                            className='max-sm:is-full '
                        />
                        <Button variant='contained' onClick={() => setOpenPaymentRequestDrawer(!openPaymentRequestDrawer)} className='max-sm:is-full'>
                            REQUEST
                        </Button>
                    </div>
                </div>
                <div className='overflow-x-auto'>
                    <table className={tableStyles.table}>
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id}>
                                            {header.isPlaceholder ? null : (
                                                <>
                                                    <div
                                                        className={classnames({
                                                            'flex items-center': header.column.getIsSorted(),
                                                            'cursor-pointer select-none': header.column.getCanSort()
                                                        })}
                                                        onClick={header.column.getToggleSortingHandler()}
                                                    >
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                        {{
                                                            asc: <i className='ri-arrow-up-s-line text-xl' />,
                                                            desc: <i className='ri-arrow-down-s-line text-xl' />
                                                        }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                                                    </div>
                                                </>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        {table.getFilteredRowModel().rows.length === 0 ? (
                            <tbody>
                                <tr>
                                    <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                                        No data available
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                            <tbody>
                                {table
                                    .getRowModel()
                                    .rows.slice(0, table.getState().pagination.pageSize)
                                    .map(row => {
                                        return (
                                            <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                                                {row.getVisibleCells().map(cell => (
                                                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                                                ))}
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        )}
                    </table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component='div'
                    className='border-bs'
                    count={table.getFilteredRowModel().rows.length}
                    rowsPerPage={table.getState().pagination.pageSize}
                    page={table.getState().pagination.pageIndex}
                    SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' }
                    }}
                    onPageChange={(_, page) => {
                        table.setPageIndex(page)
                    }}
                    onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
                />
            </Card>
            <PaymentRequestsDrawer
                open={openPaymentRequestDrawer}
                handleClose={() => { setOpenPaymentRequestDrawer(!openPaymentRequestDrawer); setEditData({}) }}
                paymentData={Object.keys(editData).length > 0 ? editData : undefined}
            />
        </>
    )
}

export default HistoryListTable
