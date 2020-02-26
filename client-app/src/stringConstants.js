import financeIcon  from './icons/svg/financeIcon.svg';
import researchIcon from './icons/svg/researchIcon.svg';
import universityAdvancementIcon from './icons/svg/universityAdvancementIcon.svg';
import academicIcon from './icons/svg/academicIcon.svg';
import masterDataIcon from './icons/svg/masterDataIcon.svg';
import humanResourcesIcon from './icons/svg/humanResourcesIcon.svg';

export const API = {
    URL: 'https://api.katekaseth.me/',
    LOGIN: 'sessions',
    FILTER: 'filter',
    SEARCH: 'search',
};

export const PAGES = {
    home: '/',
    search: '/search',
    result: '/result',
    login: '/login',
};

export const SEARCH_TERMS = 'SEARCH_TERMS';

export const SUBJECT_AREA_ICONS = {
    Academic: academicIcon,
    Research: researchIcon,
    ['University Advancement']: universityAdvancementIcon,
    ['Financial Resources']: financeIcon,
    ['Human Resources']: humanResourcesIcon,
    ['Master Data']: masterDataIcon,
};

export const METADATA_TABS = {
    technicalInfo: 'Technical Info',
    securityInfo: 'Security Info',
    sqlQueries: 'SQL Queries',
    definitions: 'Defintitions',
}