/**

  Generate the binary file.

  $ grunt generate-bin

  @author     David Linse <davidlinse@gmail.com>
  @version    0.1.0
  @license    MIT

*/

module.exports = function(grunt) {

    'use strict';

    grunt.registerTask('generate-binary', function () {

        var shebang = grunt.file.read('fixtures/binary-header');

        var footer  = grunt.file.read('fixtures/binary-footer');

        var banner  = grunt.config.get('banner');

        var opts = {
            process: function(content) {
                return shebang + '\n' + banner + content + '\n\n' + footer;
            }
        };

        var src  = grunt.config.process('lib/<%= pkg.name %>.js');
        var dest = grunt.config.process('bin/<%= pkg.name %>');

        grunt.file.copy(src, dest, opts);

        require('fs').chmodSync(dest, '755');
    });

};