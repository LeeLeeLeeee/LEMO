import React from 'react';

import SVGGithubIcon from './svgs/github-svgrepo-com.svg';
import SVGEmailIcon from './svgs/mail-svgrepo-com.svg';
import SVGHeartIcon from './svgs/heart-svgrepo-com.svg';
import SVGPhoneIcon from './svgs/phone-svgrepo-com.svg';
import SVGMoonIcon from './svgs/moon-svgrepo-com.svg';
import SVGSunIcon from './svgs/sun-svgrepo-com.svg';
import SVGSaveIcon from './svgs/save-svgrepo-com.svg';

export const GithubIcon = React.memo((): JSX.Element => <SVGGithubIcon />);
export const EmailIcon = React.memo((): JSX.Element => <SVGEmailIcon />);
export const HeartIcon = React.memo((): JSX.Element => <SVGHeartIcon />);
export const PhoneIcon = React.memo((): JSX.Element => <SVGPhoneIcon />);
export const MoonIcon = React.memo((): JSX.Element => <SVGMoonIcon />);
export const SunIcon = React.memo((): JSX.Element => <SVGSunIcon />);
export const SaveIcon = React.memo((): JSX.Element => <SVGSaveIcon />);
