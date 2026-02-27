export async function sendTelemetry() {
    const SITE_TOKEN =
        import.meta.env.PUBLIC_SITE_TOKEN ||
        "WNJpCHC8G2latUPt3mY3OLgvpcIEOvrvGpBU2eDgZzZMcdYyAqCGQi0E2uZsfalG";

    try {
        await fetch("https://api.protowebstudio.com/api/ingest", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-Site-Token": SITE_TOKEN,
                "X-Timestamp": Math.floor(Date.now() / 1000).toString(),
            },
            body: JSON.stringify({
                severity: "Low",
                event_timestamp: new Date().toISOString(),
                message: "page_load - " + window.location.href,
              }),
        });
    } catch (error) {
        console.error("Telemetry error:", error);
    }
}