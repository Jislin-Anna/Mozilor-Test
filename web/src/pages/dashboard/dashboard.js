import React, { useEffect } from 'react'
import { useState } from 'react'
import { AppBar, Box, Button, Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from '@mui/material';
import AccountMenu from './accountmenu';
import { useNavigate } from "react-router-dom";
import Pagination, { usePagination } from '../../components/pagination';
import { getAllProducts, addAllProducts } from '../../service/product';
import { useStore } from '../../store/systemcontext';

const AppHeaderStyle = {
    // backgroundColor: 'primary.dark',
    backgroundColor: '#92b611',
    borderBottom: 1,
    borderColor: 'divider',
    boxShadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.02)',
    padding: "20px"
}

const header = [
    { key: "product_name", title: "Product Name", width: "30%", align: "right" },
    { key: "price", title: "Price", width: "30%", align: "right" },
    { key: "sku", title: "SKU", width: "30%", align: "right" },
    { key: "description", title: "Description", width: "30%", align: "right" }
]
const Dashboard = () => {

    const navigate = useNavigate()
    const { user } = useStore()
    const [profile, setProfile] = useState({
        displayName: user?.username || ""
    });
    const [products, setProducts] = useState([])
    const { totalCount, setTotalCount, pageNumber, setPageNumber } = usePagination({})
    const [loading, setLoading] = useState(false)
    const { dispatch } = useStore()

    const getProducts = async (size = 10, pageNumber = 1) => {
        try {
            setLoading(true)
            const resp = await getAllProducts(pageNumber, size)
            setProducts(resp?.data?.data)
            setTotalCount(resp?.data?.total)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }

    }

    const handleFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            try {
                const formData = new FormData();
                formData.append('file', e.target.files[0]);
                setLoading(true)
                await addAllProducts(formData)
                getProducts(10, 1)
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
    };

    const onLogout = async () => {
        sessionStorage.clear()
        dispatch({
            type: "ADD_USER",
            payload: {}
        })
        dispatch({
            type: "IS_LOGGED_IN",
            payload: false
        })
        navigate("/login")
    }

    useEffect(() => {
        getProducts(10, pageNumber)
    }, [pageNumber])

    return (
        <Box>
            <AppBar position="fixed" elevation={0} sx={AppHeaderStyle}>
                <Box marginLeft="auto">
                    <Box display="flex" alignItems="center">
                        {!!profile && <AccountMenu profile={profile} onLogout={onLogout} />}
                    </Box>
                </Box>
            </AppBar>
            <Box mt={15}>
                <Box display="flex" justifyContent="flex-end" marginRight={14}>
                    <Button onClick={handleFileChange}>
                        <input type="file" id="fileInput" onChange={handleFileChange} accept=".csv" style={{ display: "none" }} />
                        <label for="fileInput">Import Products</label></Button>
                </Box>

                <TableContainer sx={{ marginX: "5%", marginY: "2%", width: '90%' }}>
                    <Table sx={{ tableLayout: "fixed", border: "1px solid green" }}>
                        <TableHead>
                            <TableRow >
                                {header?.map(row => {
                                    return <TableCell key={row?.id} sx={{ fontWeight: 800, borderBottom: "1px solid green" }}>{row?.title}</TableCell>
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!loading && products?.length === 0 ? <TableCell colSpan={4}>No Products</TableCell> :

                                products?.map(row => {
                                    return <TableRow key={row?.product_name}>
                                        <TableCell sx={{ borderBottom: "none" }}>{row?.product_name}</TableCell>
                                        <TableCell sx={{ borderBottom: "none" }}>{row?.price}</TableCell>
                                        <TableCell sx={{ borderBottom: "none" }}>{row?.sku}</TableCell>
                                        <TableCell sx={{ borderBottom: "none" }}>{row?.description}</TableCell>
                                    </TableRow>
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {totalCount > 10 && <Pagination count={Math.ceil(totalCount / 10)} page={pageNumber}
                    onChange={(e, page) => setPageNumber(page)} />}
            </Box>
        </Box>
    )
}

export default Dashboard