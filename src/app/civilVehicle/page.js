import Layout from "../../components/Layout";
import CivilVehicleList from "../../components/List/CivilVehicleList";

export default function CivilVehiclesPage() {
    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 p-6">
                <CivilVehicleList />
            </div>
        </Layout>
    );
}
