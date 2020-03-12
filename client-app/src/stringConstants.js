import financeIcon from './icons/svg/financeIcon.svg';
import researchIcon from './icons/svg/researchIcon.svg';
import universityAdvancementIcon from './icons/svg/universityAdvancementIcon.svg';
import academicIcon from './icons/svg/academicIcon.svg';
import masterDataIcon from './icons/svg/masterDataIcon.svg';
import humanResourcesIcon from './icons/svg/humanResourcesIcon.svg';
import servicesIcon from './icons/svg/servicesIcon.svg';

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
    result: '/result/',
    login: '/login',
    bookmarks: '/bookmarks',
};

export const SEARCH_TERMS = 'SEARCH_TERMS';

export const SUBJECT_AREA_ICONS = {
    Academic: academicIcon,
    'Research Administration': researchIcon,
    'University Advancement': universityAdvancementIcon,
    'Financial Resources': financeIcon,
    'Human Resources': humanResourcesIcon,
    'Services & Resources': servicesIcon,
};

export const METADATA_TABS = {
    technicalInfo: 'Technical Information',
    securityInfo: 'Security Information',
    sqlQueries: 'SQL Queries',
    definitions: 'Definitions',
};

export const SESSION = {
    SESSION_ID: 'sessionId',
    NEW_SESSION: 'newSession',
    EXPIRE_SESSION: 'expireSession',
    CHANNEL_NAME: 'uw_analytics_bc',
};
