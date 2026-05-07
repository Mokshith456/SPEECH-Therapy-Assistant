import { useEffect, useState } from "react";
import axios from "../../services/api";

export default function PatientList() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get("/patients");
                setPatients(res.data);
            } catch (err) {
                setError(err.response?.data?.error || "Failed to load patients");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const cardStyle = {
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        padding: "1.25rem",
        marginBottom: "1rem",
    };

    const labelStyle = {
        fontSize: "12px",
        fontWeight: "600",
        color: "#64748b",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
    };

    const valueStyle = {
        fontSize: "15px",
        color: "#1e293b",
        marginTop: "2px",
    };

    return (
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h2 style={{
                fontSize: "22px",
                color: "#1e293b",
                marginBottom: "1.25rem",
                fontWeight: "600",
            }}>
                Registered Patients ({patients.length})
            </h2>

            {loading && <p style={{ color: "#64748b" }}>Loading...</p>}
            {error && <p style={{ color: "#dc2626" }}>{error}</p>}
            {!loading && !error && patients.length === 0 && (
                <p style={{ color: "#64748b" }}>No patients registered yet.</p>
            )}

            {patients.map((p) => (
                <div key={p.id} style={cardStyle}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                        gap: "0.85rem",
                    }}>
                        <div>
                            <div style={labelStyle}>Username</div>
                            <div style={valueStyle}>{p.username}</div>
                        </div>
                        <div>
                            <div style={labelStyle}>Email</div>
                            <div style={valueStyle}>{p.email}</div>
                        </div>
                        <div>
                            <div style={labelStyle}>Age</div>
                            <div style={valueStyle}>{p.age || "—"}</div>
                        </div>
                        <div>
                            <div style={labelStyle}>Severity</div>
                            <div style={valueStyle}>{p.severity || "—"}</div>
                        </div>
                        <div>
                            <div style={labelStyle}>Disorder Type</div>
                            <div style={valueStyle}>{p.disorder_type || "—"}</div>
                        </div>
                        <div>
                            <div style={labelStyle}>Goals</div>
                            <div style={valueStyle}>{p.goals || "—"}</div>
                        </div>
                    </div>
                    {p.history && (
                        <div style={{ marginTop: "0.85rem" }}>
                            <div style={labelStyle}>History</div>
                            <div style={valueStyle}>{p.history}</div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
