import { configure, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
// import { confim_new_password } from './rules/index';

import { i18n } from '../i18n';

const config: any = {
  defaultMessage: (field: any, values: any) => {
    values._field_ = i18n.t(`fields.${field}`);
    return i18n.t(`validation.${values._rule_}`, values);
  },
};

const configValidate = () => {
  for (const rule of Object.keys(rules)) {
    extend(rule, (rules as any)[rule]);
  }
};

configValidate();
configure(config);

// extend('confim_new_password', confim_new_password);
