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
    DOCUMENTS: 'documents',
    BOOKMARK: 'bookmarks',
};

export const PAGES = {
    home: '/',
    search: '/search',
    result: '/result',
    login: '/login',
    bookmarks: '/bookmarks',
};

export const SEARCH_TERMS = 'SEARCH_TERMS';

export const SUBJECT_AREA_ICONS = {
    Academic: academicIcon,
    Research: researchIcon,
    'University Advancement': universityAdvancementIcon,
    'Financial Resources': financeIcon,
    'Human Resources': humanResourcesIcon,
    'Master Data': masterDataIcon,
};

export const METADATA_TABS = {
    technicalInfo: 'Technical Info',
    securityInfo: 'Security Info',
    sqlQueries: 'SQL Queries',
    definitions: 'Defintitions',
}

export const SESSION = {
    SESSION_ID: 'sessionId',
    NEW_SESSION: 'newSession',
    EXPIRE_SESSION: 'expireSession',
    CHANNEL_NAME: 'uw_analytics_bc',
}