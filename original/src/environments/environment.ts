// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseURL:'localhost:3000',

  form: 'https://apitemplate.getbiz.app/api/template-getbiz/form-controller/simple-form',
  address_form: 'https://apitemplate.getbiz.app/api/template-getbiz/form-controller/address-form',
  stepper_form: 'https://apitemplate.getbiz.app/api/template-getbiz/form-controller/stepper-form',
  audit_trail: 'https://apitemplate.getbiz.app/api/template-getbiz/form-controller/audit-trail',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
