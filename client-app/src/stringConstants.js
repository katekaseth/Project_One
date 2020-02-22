export const PAGES = {
    home: '/',
    search: '/search',
    result: '/result',
    login: '/login',
};

export const FILTER_OPTIONS = {
    SUBJECT_AREA: {
        groupLabel: 'Subject Area',
        filters: {
            academic: 'Academic',
            research: 'Research',
            universityAdvancement: 'University Advancement',
            financialResources: 'Financial Resources',
            humanResources: 'Human Resources',
            masterData: 'Master Data',
        }
    },
    TOOL_TYPE: {
        groupLabel: 'Tool Type',
        filters: {
            reports: 'Reports',
            visualizations: 'Visualizations',
            cubes: 'Cubes',
        }
    },
    SUPPORT_GROUP: {
        groupLabel: 'Support Group',
        filters: {
            palceholder: 'Placeholder'
        }
    },
    DATABASE: {
        groupLabel: 'Database',
        filters: {
            palceholder: 'Placeholder'
        }
    },
}

export const METADATA_TABS = {
    technicalInfo: 'Technical Info',
    securityInfo: 'Security Info',
    sqlQueries: 'SQL Queries',
    definitions: 'Defintitions',
}