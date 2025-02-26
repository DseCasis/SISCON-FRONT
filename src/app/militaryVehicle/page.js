import Layout from "../../components/Layout";
import MilitaryVehicleList from "../../components/List/MilitaryVehicleList";

export default function MilitaryVehiclesPage() {
    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 p-6">
                <MilitaryVehicleList />
            </div>
        </Layout>
    );
}
