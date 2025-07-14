import React from 'react'

const Pagination = ({table}) => {
    return (
        <>
            <div className="pagination">
                <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} >{'<<'}</button>
                <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>{'<'}</button>
                <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>{'>'}</button>
                <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>{'>>'}</button>

                <span>
                    Page{' '}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </strong>
                </span>

                <select value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value))
                    }}>

                    {[20, 40, 80, 100, 150].map(size => (
                        <option key={size} value={size}>
                            Show {size}
                        </option>

                    ))}
                </select>
            </div>
        </>
    )
}

export default Pagination