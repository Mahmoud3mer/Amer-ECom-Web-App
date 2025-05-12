import { Spinner } from "react-bootstrap";

interface LoadingInterface{
    loading: string;
    error: string | null;
    children:  React.ReactNode;
}

const LoaderRecords = ({ loading, error, children}: LoadingInterface) => {
    return (
        <>
            {
                loading === 'pending' ?
                    <div className='h-full d-flex justify-content-center align-items-center'>
                        <Spinner animation="border" variant="success" />
                    </div> :
                    // products?.map((p) =>
                    //     <Col key={p.id} xs={12} md={4} lg={3} className="mb-5 mt-2">
                    //         <Product title={p.title} imgSrc={p.img} price={p.price} />
                    //     </Col>
                    // )
                    children
            }
        </>
    )
}

export default LoaderRecords