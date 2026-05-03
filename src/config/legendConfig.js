export const LEGEND_CONFIG = {
    normal: {
        label: 'Fluxo (normal)',
        color: '#ffffff',
        textColor: '#000000'
    },
    intencao: {
        label: 'Intenção do autor',
        color: '#ff7300ff',
        textColor: '#ff7300ff'
    },
    possivel: {
        label: 'Possibilidades',
        color: '#0f8835ff',
        textColor: '#278342ff'
    },
    explica: {
        label: 'Explicação',
        color: '#006effff',
        textColor: '#006effff'
    },
    importante: {
        label: 'Importante (ação)',
        color: '#ff0000ff',
        textColor: '#ff0000ff'
    }
}

// Helper to get color by type
export const getLegendColor = (type) => {
    return LEGEND_CONFIG[type]?.color || '#ffffff';
}

export const getLegendTextColor = (type) => {
    return LEGEND_CONFIG[type]?.textColor || '#000000';
}

// Helper to get legend items for the UI
export const getLegendItems = () => {
    return Object.entries(LEGEND_CONFIG).map(([id, config]) => ({
        id,
        label: config.label,
        color: config.color
    }));
}
