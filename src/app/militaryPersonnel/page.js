import Layout from "../../components/Layout";
import MilitaryPersonnelList from "../../components/List/MilitaryPersonnelList";

export default function MilitaryPersonnelPage() {
    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 p-6">
                <MilitaryPersonnelList />
            </div>
        </Layout>
    );
}
