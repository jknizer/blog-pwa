import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-icon/iron-icon.js';
import './shared-styles.js';
import './blog-icons.js';
import './blog-network-warning.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style include="shared-styles">
      :host {
        display: block;
        padding: 40px 20px;
        text-align: center;
      }

      #main {
        margin: auto;
        max-width: 400px;
      }

      iron-icon {
        display: inline-block;
        width: 150px;
        height: 150px;
      }

      [hidden] {
        display: none !important;
      }
    </style>

    <!-- So, since we don't load everything -->
    <div id="main" hidden\$="[[offline]]">
      <div>
        <iron-icon icon="error"></iron-icon>
        <h1>Sorry, I couldn't find that page.</h1>
      </div>
      <a href="/">Go to the home page</a>
    </div>

    <!-- Always fall to the network warning -->
    <blog-network-warning hidden\$="[[!offline]]" offline="[[offline]]" on-try-reconnect="_tryReload"></blog-network-warning>
`,

  is: 'blog-missing',

  // Why in the world would we do this? Because in the event of an offline 
  // navigation, there is a chance the 404 is a failsafe; that the page is 
  // there but not in our SW cache (as we're using some pass through 
  // caching when needed). 
  // 
  // However, because importHref() will cause a cache of the fail, we end up
  // in hard spot; subsquent loads won't work. Note, this is being resolved
  // via https://github.com/Polymer/polymer/pull/4209 so this likely can
  // be resolved later.
  // 
  // This is the hard hit with a hammer; reload at the current route.
  _tryReload: function() {
    window.location.reload();
  }
});
