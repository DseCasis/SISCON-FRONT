import React from "react";
import Layout from "../../components/Layout";

const backgroundImage = {
    backgroundImage: `url('/images/bg.jpg')`, // ✅ Ruta correcta sin 'public/'
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    color: 'white',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};


const Home = () => {
    return (
        <Layout>
            <div className="h-screen w-screen bg-contain bg-center flex flex-col items-center"
                 style={{ backgroundImage: "url('/images/bg.jpg')" }}>
                hola
            </div>
        </Layout>
    );
};

export default Home;
