<template>
  <div class="container-subrouter">
    <napp-form 
      v-bind:formFields="formFields"
      v-bind:formConfig="formConfig"
      v-on:btnOk="formBtnOk"
    />
  </div>
</template>
<script>
import co from 'co';
import FormMixin from '../components/forms/mixin';
import storeAuth from './store';
import NashAPI from '../plugins/nash-api/';
import { postAuth } from './actions';

// @TODO Remove Defaults
const defaults = {
  apiHost: 'http://18.136.149.71:31447',
  apiKey: '9b628719c7fc2a3bd137472128626ef56cf154fcf8c4ed6f912fdd453a3bb4fc',
  apiSecret: 'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFb2dJQkFBS0NBUUVBekVuZlJlajZaR1hZVVo0dzBxYWh4MWRNOXZoYnpLTG8ybUlmVHZHOFBkd3c2N1hqClNOOUYxTU4wYmJkSno5UGFlWXk5NThHdXJURlVGZ1RPeERZRVhHTlRHNFJkVERXVXN1eHhzZms1ZzBtQmtlejIKK1ROcVU1OXVHMmhFOVlNYnR5UUNwT3d6WnFCSnRkeXRvNlBsL1JWOTlVcGticThESzlJQTF0SlhiUkh4VFdtWQovcWo4aWYrcFVjRFlkY1U2dWtXOTZBYllET3ZGWGNRemlvRm44WFBnbWR1ZUtNOEJ5ejlmNnVSZUNSQllZdWw1Clk3c005V0Y5emVvL3h3QWxVS1l4NGpRWEh6ZHFMNmc5L0dBVFNiYTNkZWwyc2l4L3BmQml5SklzVC90cmdiWFkKMFhMYS9oNU55bXFRMnNpMFVvMU9lQUdkOHkwTDhqbDJncURXWlFJREFRQUJBb0lCQUNmWmdTUXgvaVgzZCtyego0TEkycnZnam4yL05vcHFZYkxPczBFNmwrUUpZSVhMWldDeXU0UUJQNERaR3VxOC90QzVodGVtdmJsTjZlOXlQCnM0V3l3OGNCMlFSVkhaM3dGY0dSUGR4cHNUNWE2RnQremU1dWlSOG15bU91UTBWZy9kY0x2emhNbXZvNTZpYi8KbFIrR3FTWmxPdHpPVmlrQkdxMUJtY2hOMzUvMnRrdGh5MjZzVjV2RDFZU0JPeUtPMlhHREZYbXhWNjZFaFZiWAp1Y0hCM1BnUTJPUDJuMXFYeFF0a2R2bUNVaSsrSnhpMW9rbFloNE1vUTN3Z21reUZIYklPRDZBVzB4NFRpK1U2ClVFRGlqN05XZlB6QWs5c2ZyNGFibVV4SmxEMGYxV3l4UllhUUNQRkRWVGZHQVJIVDJKUjAralhCWlYxeUN3N3cKQnp0ckhVRUNnWUVBL3dXaEVNQndqWWdsMS9HdFB6d2hDWDJ4YlpkVlpRbEdpd3M5bUZuemxoMVBibVVRSmMzNQpsOHB1MUo1RmxraU5VZXN2dytPcXlRVkRFYTNpTU90bWp2VGRZb2Y3U1hXSHYyS0ttWU5abUNHcDVkZzdEclNVCjg1eXpFcTAvN0NoSkVVdzQ0TWlKRWZOVXhuTkNmajVFQnNHcDBFYWthandTcGhlMmhlNVRhcWNDZ1lFQXpSSnYKVXd3VkVGT2s3UlZKd09FQ3ltRit0UHhLa3J5WHNacXN1TXdKTXdnWFNtRlhHU3ZwbTBnUzBkUDJwLzJ6bHRTMQpBTkNXZnZwZ1NyY3R2SktQYzBxUldOZGVpK0h4ZUZLWk5SSE16Qm1DRkRIQlRET3JNdGEydnlDMTRuYkJDaTJxCkdkY2p5YWd0cnlzSmRTTk85bk4xOFZKMERGUkZlMHorSzUvS05CTUNnWUExc2hLNnV6bzNvcTROTE5iRWxMMkUKQ1JJZHVCcUQzcE1hM2JBSGJ4RXB6MXdWSzNSZDhXT1hRVWxhdlVSN295VVdWWVhHSWg2b210SUhXK3hmVG9GVwpvbG9teitqcUM3UWNhUHd6M0lNMTFBaTQyM0Y3NUN2a3ExN05GT3Q3cHZQVGo0LytURnNJQzRzVENkdTdSeEw5CnRUTXpKbHloL2FvVGpMU2l1STZaeXdLQmdGS2NoNDQ4QXN4RjlkMndRcnJacWtjZkNXMGRhV2s5WWhxaEJjMlkKSEdpYmJNNkE4aFpvMHozRHhoa1RPMzBuUGM2WU42WnhZUDhjRytoZGJLWlhvRVJBbU5iaVErczBCUk9FcXNWdgpPMEpKVUZhVVNKdExBVCtFc2EvREhLSnpWb2FrS0s4cU5QZUtzWVNzWUszNG9GbTEzNkJzcCtWRG1ZMzNVVGovCnNQUlRBb0dBTzhSNlgzUHNRYkZnK2FVKzdyampRRmxINHdRcVFHaVB6UWxxbVBQT2lhbDg1YkxGWHRGYk5URkYKbzVqSHVLK2VVbWxmSFBQejltQk9JZ24vRmhUUnJyRS9LajcyMlcrOWdETi9LdU1XdWZpMU5POVZmTHhoOHY5bApBaXhEcEZ0Nlc0eDVlYzFpVDcwVVlMZTlLaXN3U0xVMU5EZFA0dUJMMlQxdklNTUZxTFE9Ci0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tCg==',
};


const formData = {
  formFields: [{
    label: 'API Host',
    category: 'text',
    name: 'apiHost',
    defaultValue: defaults.apiHost,
    rules: {
      noSpecialChars: false,
    },
  }, {
    label: 'API Key',
    category: 'text',
    name: 'apiKey',
    defaultValue: defaults.apiKey,
  }, {
    label: 'API Secret',
    category: 'text',
    name: 'apiSecret',
    defaultValue: defaults.apiSecret,
    rules: {
      noSpecialChars: false,
    },
  }],
  formConfig: {
    'btnOKLabel': 'Login',
  },
  formHooks: {
    btnOk ({ apiKey, apiSecret, apiHost }) {
      // Todo Verify that API keys are correct before saving.
      const connector = NashAPI({ apiKey, apiSecret, host: apiHost });
      storeAuth.dispatch('saveConnector', connector);
      storeAuth.dispatch('saveAuthenticated', true);
      // Fetch SubAccounts
      const that = this;
      co(postAuth({ connector, storeAuth, router: this.$router }))
        .then(() => console.log('done!'))
        .catch((err) => console.log(err));
    },
  },
};

export default FormMixin(formData);
</script>
