import Layout from "../../components/Layout";
import CivilPersonnelList from "../../components/List/CivilPersonnelList";

export default function CivilPersonnelPage() {
    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 p-6">
                <CivilPersonnelList />
            </div>
        </Layout>
    );
}
