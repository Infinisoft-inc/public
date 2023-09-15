import { createAuthKeycloakIntegration } from '../index';

const config = {
  realm: 'ibrain-codes',
  'auth-server-url': 'https://keycloak-keycloak.apps.ibrain.eastus.aroapp.io/',
  'ssl-required': 'external',
  resource: 'ibrain-codes',
  'verify-token-audience': true,
  credentials: {
    secret: 'scDgHILTXDjgSNLr8n9IpcpkDnxjMZPs',
  },
  'confidential-port': 0,
  'policy-enforcer': {
    credentials: {},
  },
};

const d = createAuthKeycloakIntegration(config);

const run = async () => {
  await d.signIn('', '');
};

run;
