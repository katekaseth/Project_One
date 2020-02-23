import financeIcon  from './icons/svg/financeIcon.svg';
import researchIcon from './icons/svg/researchIcon.svg';
import universityAdvancementIcon from './icons/svg/universityAdvancementIcon.svg';
import academicIcon from './icons/svg/academicIcon.svg';
import masterDataIcon from './icons/svg/masterDataIcon.svg';
import humanResourcesIcon from './icons/svg/humanResourcesIcon.svg';

export const PAGES = {
    home: '/',
    search: '/search',
    result: '/result',
    login: '/login',
};

export const SEARCH_TERMS = 'SEARCH_TERMS';

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
        },
        icons: {
            academic: academicIcon,
            research: researchIcon,
            universityAdvancement: universityAdvancementIcon,
            financialResources: financeIcon,
            humanResources: humanResourcesIcon,
            masterData: masterDataIcon,
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