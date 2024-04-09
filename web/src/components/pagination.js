import { Pagination as MuiPagination, PagonationProps } from '@mui/material';
import { useState } from 'react';

export default function Pagination(props) {
    const { page, count, onChange, ...others } = props;

    return (
        <MuiPagination
            count={count}
            page={page}
            onChange={onChange}
            showFirstButton
            showLastButton
            sx={{ display: "flex", paddingX: 3, paddingY: 2, '.MuiPagination-ul': { marginLeft: 'auto' } }}
            siblingCount={1}
            boundaryCount={2}
            {...others} />
    )
}

export function usePagination({ count = 0, page = 1, size = 10 }) {
    const [totalCount, setTotalCount] = useState(count)
    const [pageNumber, setPageNumber] = useState(page)
    const [rowsPerPage, setRowsPerPage] = useState(size)

    return {
        totalCount, setTotalCount, pageNumber, setPageNumber, rowsPerPage, setRowsPerPage
    }
}