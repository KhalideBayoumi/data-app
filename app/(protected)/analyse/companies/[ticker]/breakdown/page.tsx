import EconomicAssets from "@/app/(protected)/_components/charts/economic-assets";
import EconomicCashFlow from "@/app/(protected)/_components/charts/economic-cash-flow";
import EconomicEnterpriseValue from "@/app/(protected)/_components/charts/economic-enterprise-value";

const BreakdownPage = () => {
    return (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <EconomicCashFlow />    
            <EconomicAssets />
            <EconomicEnterpriseValue />
          </div>
        </div>
      );
}
 
export default BreakdownPage;