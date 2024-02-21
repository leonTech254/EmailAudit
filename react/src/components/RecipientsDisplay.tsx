import React, { useState, useEffect } from "react";

interface RecipientProps {
    recipients: string[]
}

const RecipientsDisplay: React.FC<RecipientProps> = ({ recipients }) => {
    const [containerWidth, setContainerWidth] = useState<number | null>(null);

    useEffect(() => {
        const updateWidth = () => {
            const recepientCell = document.getElementById("RecepientDisplayData");
            if (recepientCell) {
                setContainerWidth(recepientCell.offsetWidth);
            }
        };

        // Initial width calculation
        updateWidth();

        // Update width on window resize
        window.addEventListener('resize', updateWidth);

        // Cleanup event listener
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    return (
        <div id="RecepientDisplayData" className="truncated-recipients">
            {recipients.map((recipient, index) => (
                <span key={index}>{recipient}</span>
            ))}
            {containerWidth && <p>Container width: {containerWidth}px</p>}
        </div>
    );
}

export default RecipientsDisplay;
