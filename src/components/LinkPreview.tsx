'use client';
import React, { useState, useEffect } from 'react';

type LinkPreviewProps = {
    url: string;
    position: { x: number; y: number };
};

export default function LinkPreview({ url, position }: LinkPreviewProps) {
    const [previewData, setPreviewData] = useState<any>(null);

    useEffect(() => {
        const fetchPreview = async () => {
            try {
                const res = await fetch(`https://api.microlink.io?url=${url}`);
                const json = await res.json();
                setPreviewData(json.data);
            } catch (err) {
                console.error("Failed to fetch preview:", err);
            }
        };
        fetchPreview();
    }, [url]);

    if (!previewData) return null;

    return (
        <div
            className="link-preview-box"
            style={{ top: position.y + 15, left: position.x + 15 }}
        >
            {previewData.image?.url && (
                <img src={previewData.image.url} alt={previewData.title || "preview"} />
            )}
            <h3>{previewData.title}</h3>
            <p>{previewData.description}</p>
        </div>
    );
}
