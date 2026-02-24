export async function sendTelemetry() {
    const SITE_TOKEN =
        import.meta.env.PUBLIC_SITE_TOKEN ||
        "WNJpCHC8G2latUPt3mY3OLgvpcIEOvrvGpBU2eDgZzZMcdYyAqCGQi0E2uZsfalG";

    try {
        await fetch("https://api.protowebstudio.com/api/ingest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Site-Token": SITE_TOKEN,
                "X-Timestamp": Math.floor(Date.now() / 1000).toString(),
            },
            body: JSON.stringify({
                event_id: crypto.randomUUID(),
                event_type: "page_load",
                url: window.location.href,
                response_time_ms: Math.round(performance.now()),
                status_code: 200,
            }),
        });
    } catch (error) {
        console.error("Telemetry error:", error);
    }
}