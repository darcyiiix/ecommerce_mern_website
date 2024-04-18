import React from 'react';

const Collapse = ({ question, answer }) => {
    return (
        <details className="collapse border-2 mb-6">
            <summary className="collapse-title text-xl font-medium">{question}</summary>
            <div className="collapse-content">
                <p>{answer}</p>
            </div>
        </details>
    );
};

export default Collapse;
