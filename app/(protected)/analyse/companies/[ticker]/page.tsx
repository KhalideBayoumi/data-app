interface CompanyPageProps {
    params: { ticker: string };
}

const companyPage = ({ params }: CompanyPageProps) => {
    return ( 
        <div>
            <h1>Company Details</h1>
            <p>Ticker: {params.ticker}</p>
        </div>
     );
}
 
export default companyPage;