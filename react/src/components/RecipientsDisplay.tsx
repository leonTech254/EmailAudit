import React, { useState, useEffect } from "react";

interface RecipientProps {
    recipients: string[]
}

const RecipientsDisplay: React.FC<RecipientProps> = ({ recipients }) => {
    const [containerWidth, setContainerWidth] = useState<number | null>(null);
    const [visibleRecipients, setVisibleRecipients] = useState<string[]>([]);
    const [hiddenRecipients, setHiddenRecipients] = useState<string[]>([]);

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

    useEffect(() => {
        if (containerWidth !== null) {
            let totalWidth = 0;
            const newVisibleRecipients: string[] = [];
            const newHiddenRecipients: string[] = [];

            recipients.forEach(recipient => {
                const span = document.createElement("span");
                span.innerText = recipient;
                document.body.appendChild(span);
                const spanWidth = span.offsetWidth;
                totalWidth += spanWidth;
                if (totalWidth <= containerWidth) {
                    newVisibleRecipients.push(recipient);
                } else {
                    newHiddenRecipients.push(recipient);
                }
                document.body.removeChild(span);
            });

            setVisibleRecipients(newVisibleRecipients);
            setHiddenRecipients(newHiddenRecipients);
        }
    }, [containerWidth, recipients]);

    return (
        <div id="RecepientDisplayData" className="truncated-recipients">
            {visibleRecipients.map((recipient, index) => (
                <span key={index}>{recipient}</span>
            ))}
            {hiddenRecipients.length > 0 && (
                <div className="remainigEmail">{` +${hiddenRecipients.length}`}</div>
            )}
        </div>
    );
}

export default RecipientsDisplay;
