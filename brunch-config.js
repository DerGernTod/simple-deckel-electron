// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'vendor.js': /^(?!app)/,
      'app.js': /^app/
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
    ],
  }
};
