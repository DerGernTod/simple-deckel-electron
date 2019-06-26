// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'js/vendor.js': /^(?!app)/,
      'js/app.js': /^app/
    }
  },
  stylesheets: {joinTo: 'app.css'}
};

exports.plugins = {
  babel: {
    presets: [
      ['env',
        {
          targets: {
            "chrome": 71
          }
        }
      ],
      'stage-3',
      'react'
    ]
  },
  replacement: {
    replacements: [{
      files: [/electron\.js$/],
      match: {find: /(?!_)\b(require)(?!_|d)/gm, replace: 'MY_REQUIRE'}
    }]
  }
};
