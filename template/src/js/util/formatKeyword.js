import React from 'react';

export default function formatKeyword(label, value) {
    if (!value) {
        return label;
    }
    return (<span>
    { label.split(value)
        .reduce((prev, current, i) => {
            if (!i) {
                return [current];
            }
            return prev.concat(<span className="search-result-keyword" key={value + current + Math.random() * 100}>{ value }</span>, current);
        }, [])
    }
  </span>);
};