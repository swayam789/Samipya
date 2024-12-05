import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SellerData = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            setError("Invalid or missing ID.");
            setLoading(false);
            return;
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
        try {
            const response = await fetch(`${API_URL}/user/api/${id}`);
            if (!response.ok) throw new Error("Failed to fetch data");
            const UserData = await response.json();
            setData(UserData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Seller Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default SellerData;
