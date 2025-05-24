import LoaderRecords from "@components/feedback/LoaderRecords";
import ProductDetailsModal from "@components/feedback/Modals/ProductDetailsModal";
import useOrders from "@hooks/useOrders";
import { Table } from "react-bootstrap";
import { Helmet } from "react-helmet";

const Orders = () => {

    const {
        pathname,
        loading,
        error,
        showModal,
        handleCloseModal,
        handleShowProduct,
        orderInfo,
        orders,
    } = useOrders();

    return (
        <div>
            <Helmet>
                <title>{pathname.slice(1)}</title>
            </Helmet>

            <ProductDetailsModal show={showModal} handleCloseModal={handleCloseModal} productsInfo={orderInfo}/>

            <LoaderRecords loading={loading} error={error} type="order">
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>Items</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((el) => 
                            <tr key={el.id}>
                                <td>#{el.id}</td>
                                <td>
                                    {el.items.length} items(s)
                                    <span 
                                        style={{paddingInline: '8px',textDecoration:'underLine', cursor:'pointer'}}
                                        onClick={() => handleShowProduct(el.id)}
                                    >
                                        Product Details
                                    </span>
                                </td>
                                <td>{el.subtotal.toFixed(2)}</td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </LoaderRecords>

        </div>
    )
}

export default Orders