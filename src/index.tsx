import 'babel-polyfill';
import { enableES5 } from 'immer';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js/stable';
import 'core-js/es/symbol';
import 'regenerator-runtime/runtime';
import './styles/fonts.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './Root';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import config from '@config';

enableES5();

Sentry.init({
  dsn: 'https://',
  release: `['] ${config.RUN_ENV}`,
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

ReactDOM.render(<Root />, document.getElementById('root'));
