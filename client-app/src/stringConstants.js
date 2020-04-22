import financeIcon from './icons/svg/financeIcon.svg';
import researchIcon from './icons/svg/researchIcon.svg';
import universityAdvancementIcon from './icons/svg/universityAdvancementIcon.svg';
import academicIcon from './icons/svg/academicIcon.svg';
import humanResourcesIcon from './icons/svg/humanResourcesIcon.svg';
import servicesIcon from './icons/svg/servicesIcon.svg';

export const API = {
    URL: 'https://api.katekaseth.me/',
    LOGIN: 'sessions',
    SIGN_OUT: 'sessions/',
    FILTER: 'filter',
    SEARCH: 'search',
    SEARCH_BOOKMARK: 'search/bookmarks',
    DOCUMENTS: 'documents',
    BOOKMARK: 'bookmarks',
    PING: 'ping',
    CREATE_ACCOUNT: 'users',
};

export const PAGES = {
    home: '/',
    search: '/search',
    result: '/result',
    login: '/login',
    bookmarks: '/bookmarks',
    account: '/account',
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
    USERNAME: 'username',
    NEW_SESSION: 'newSession',
    EXPIRE_SESSION: 'expireSession',
    CHANNEL_NAME: 'uw_analytics_bc',
    SESSION_EXPIRED_MESSAGE: 'Error: Sesion expired, you need to log in again.',
};
