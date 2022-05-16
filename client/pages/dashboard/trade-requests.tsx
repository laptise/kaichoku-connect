import { DashboardLayout } from "../../components/dashboard-layout";
import { requireAuth } from "../../components/use-auth";
import { AuthRequiredPage } from "../../env";

const TradeReuqestDashboard: AuthRequiredPage = ({ payload }) => {
  return (
    <DashboardLayout payload={payload} pageTitle={""} mainId={""} tabIndex={1}>
      dad
    </DashboardLayout>
  );
};
export default TradeReuqestDashboard;
export const getServerSideProps = requireAuth;
